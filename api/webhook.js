// api/webhook.js
// Mollie stuurt een POST naar dit endpoint zodra de betalingsstatus wijzigt.
// Controleert de status en stuurt bij "paid" de bevestigingsmail via Resend.
//
// Environment variables:
//   MOLLIE_API_KEY      → zelfde sleutel als in create-payment.js
//   RESEND_API_KEY      → van resend.com (gratis: 3.000 mails/maand)
//   ANTHROPIC_API_KEY   → voor AI-diepteanalyse in de bevestigingsmail

import { buildConfirmationEmail } from "./_emailTemplate.js";
import { buildInvoiceHtml } from "./_invoiceTemplate.js";

const ACT_NAMES = {
  A: "Doorlichting onderneming → Opleidings- of ontwikkelplan",
  B: "Loopbaan- of ontwikkeladviezen voor werknemers",
  C: "Ontwikkelen of invoeren van een L&O-methode",
};

const SCAN_LABELS = [
  { id: "employees", vraag: "Personeel in dienst?", labels: { yes: "Ja", no: "Nee" } },
  { id: "size", vraag: "MKB-status?", labels: { yes: "Ja (mkb)", groot: "Grootbedrijf (landbouw/horeca/recreatie)", no: "Nee" } },
  { id: "netherlands", vraag: "In Nederland gevestigd?", labels: { yes: "Ja", no: "Nee" } },
  { id: "financial", vraag: "Financiële moeilijkheden?", labels: { no: "Nee (financieel gezond)", yes: "Ja" } },
  { id: "started", vraag: "Activiteiten al gestart?", labels: { no: "Nee", yes: "Ja (al gestart)" } },
  { id: "deminimis", vraag: "De-minimisplafond (>€300k)?", labels: { no: "Nee", unsure: "Weet ik niet zeker", yes: "Ja" } },
  { id: "agriculture", vraag: "Landbouwsector?", labels: { no: "Nee", yes: "Ja" } },
];

function nextDeadline() {
  const now = new Date();
  const opts = [
    { label: "Tijdvak 1 2026", open: new Date(2026, 3, 7), close: new Date(2026, 4, 4) },
    { label: "Tijdvak 2 2026", open: new Date(2026, 7, 10), close: new Date(2026, 8, 7) },
    { label: "Tijdvak 1 2027", open: new Date(2027, 3, 6), close: new Date(2027, 4, 4) },
  ];
  return opts.find(d => now < d.close) || opts[opts.length - 1];
}

function fmtEur(n) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).end();
  }

  const mollieKey = process.env.MOLLIE_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!mollieKey) {
    console.error("Geen MOLLIE_API_KEY");
    return res.status(200).end(); // 200 zodat Mollie niet blijft retrying
  }

  const { id } = req.body;

  if (!id) {
    console.error("Geen payment ID in webhook body");
    return res.status(200).end();
  }

  try {
    // Haal actuele betalingsstatus op bij Mollie
    const mollieRes = await fetch(`https://api.mollie.com/v2/payments/${id}`, {
      headers: { Authorization: `Bearer ${mollieKey}` },
    });

    const payment = await mollieRes.json();
    console.log("Webhook payment status:", payment.status, "id:", id);

    if (payment.status !== "paid") {
      return res.status(200).end();
    }

    // ── Betaling geslaagd ──
    const meta = payment.metadata || {};
    const { naam, bedrijf, email, activiteiten, subsidyEst, earlyBird, bedragExcl, bedragIncl, profile, answers, investment } = meta;

    if (!email) {
      console.error("Geen e-mail in metadata voor payment:", id);
      return res.status(200).end();
    }

    // Factuurnummer: SSA-YYYYMMDD-{laatste 6 van payment ID}
    const datum = new Date();
    const factuurNr = `SSA-${datum.getFullYear()}${String(datum.getMonth() + 1).padStart(2, "0")}${String(datum.getDate()).padStart(2, "0")}-${id.slice(-6).toUpperCase()}`;

    // ── AI diepteanalyse genereren ──
    const invNum = parseFloat(investment) || 0;
    const isAgri = answers?.agriculture === "yes";
    const actNames = Array.isArray(activiteiten) && activiteiten.length > 0
      ? activiteiten.map(aid => ACT_NAMES[aid] || aid).join(" + ")
      : "Nader te bepalen";
    const bedrijfsnaam = bedrijf || naam;
    const deadline = nextDeadline();

    let analysisText = "";
    const anthropicKey = process.env.ANTHROPIC_API_KEY;
    if (anthropicKey) {
      try {
        const prompt = `Je bent een expert SLIM-subsidieadviseur van SLIM Subsidie Advies. De ondernemer heeft zojuist betaald voor een persoonlijke diepteanalyse. Schrijf een waardevolle, professionele en bemoedigende analyse in het Nederlands (max 380 woorden, geen markdown, gebruik alinea's met witregel, spreek de ondernemer aan met "u"). Begin positief en bevestigend.

Bedrijfsprofiel:
- Bedrijf: ${bedrijfsnaam || "onbekend"}
- Bedrijfsgrootte: ${answers?.size === "groot" ? "Grootbedrijf landbouw/horeca/recreatie" : "MKB"}
- Medewerkers: ${profile?.medewerkers || "onbekend"}
- Rechtsvorm: ${profile?.rechtsvorm || "onbekend"}
- Sector: ${profile?.sector || "onbekend"}
- Provincie: ${profile?.provincie || "onbekend"}
- Landbouwsector: ${isAgri ? "Ja" : "Nee"}
- Investering: ${fmtEur(invNum)}
- Indicatief subsidiebedrag: ${fmtEur(subsidyEst || 0)}
- Gekozen activiteit(en): ${actNames}
- Tijdvak: ${deadline.label} (opening: ${deadline.open.toLocaleDateString("nl-NL")})

Actuele lotingscijfers tijdvak 1 2026 (bron: RVO, 8 mei 2026):
- 3.360 aanvragen ingediend in totaal
- 23 aanvragen afgekeurd VÓÓR de loting (fouten in aanvraag)
- 3.337 aanvragen meegenomen in de notariële loting
- 474 van de 3.337 aanvragen ingeloot (~14%)
- Budget: €11 miljoen

Bespreek in vier alinea's:
1. Positieve opening + kansrijkheid gelet op sector, omvang en activiteitenkeuze
2. Of de gekozen activiteit(en) goed passen — eventueel een betere of aanvullende suggestie
3. Lotingsrisico realistisch geduid met de actuele cijfers
4. Twee concrete tips voor een sterke aanvraag + motiverende afsluiting`;

        const anthropicRes = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model: "claude-haiku-4-5-20251001",
            max_tokens: 1400,
            messages: [{ role: "user", content: prompt }],
          }),
        });
        const anthropicData = await anthropicRes.json();
        analysisText = anthropicData.content?.map(b => b.text || "").join("") || "";
        console.log("✓ AI analyse gegenereerd voor:", email);
      } catch (aiErr) {
        console.error("AI analyse fout:", aiErr);
      }
    }

    // ── Quickscan samenvatting HTML ──
    const profileRows = [
      ["Medewerkers", profile?.medewerkers || "—"],
      ["Rechtsvorm", profile?.rechtsvorm || "—"],
      ["Sector", profile?.sector || "—"],
      ["Provincie", profile?.provincie || "—"],
      ["Investering", invNum > 0 ? `€ ${invNum.toLocaleString("nl-NL")}` : "—"],
    ].map(([l, v]) =>
      `<tr><td style="padding:5px 8px;font-size:12px;color:#5a6e82;border-bottom:1px solid #e8edf3;">${l}</td><td style="padding:5px 8px;font-size:12px;font-weight:600;color:#0d2e5a;text-align:right;border-bottom:1px solid #e8edf3;">${v}</td></tr>`
    ).join("");

    const scanRows = SCAN_LABELS.map(({ id: qid, vraag, labels }) => {
      const val = answers?.[qid];
      const antwoord = labels[val] || val || "—";
      return `<tr><td style="padding:5px 8px;font-size:12px;color:#5a6e82;border-bottom:1px solid #e8edf3;">${vraag}</td><td style="padding:5px 8px;font-size:12px;font-weight:600;color:#0d2e5a;text-align:right;border-bottom:1px solid #e8edf3;">${antwoord}</td></tr>`;
    }).join("");

    const quickscanHtml = answers && Object.keys(answers).length > 0
      ? `<table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;"><thead><tr><td colspan="2" style="padding:4px 8px 6px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5a6e82;">Bedrijfsprofiel</td></tr></thead><tbody>${profileRows}</tbody></table><table width="100%" cellpadding="0" cellspacing="0"><thead><tr><td colspan="2" style="padding:12px 8px 6px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5a6e82;">Quickscan antwoorden</td></tr></thead><tbody>${scanRows}</tbody></table>`
      : "";

    // ── Bouw e-mail en factuur HTML ──
    const emailHtml = buildConfirmationEmail({
      naam, bedrijf, email, activiteiten, subsidyEst,
      earlyBird, bedragExcl, bedragIncl, factuurNr, datum, paymentId: id,
      quickscanHtml, analysisText,
    });

    const factuurHtml = buildInvoiceHtml({
      naam, bedrijf, email, activiteiten,
      earlyBird, bedragExcl, bedragIncl, factuurNr, datum, paymentId: id,
    });

    if (!resendKey) {
      console.error("Geen RESEND_API_KEY — mail niet verstuurd voor:", email);
      return res.status(200).end();
    }

    const resendHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    };

    // 1. Bevestigingsmail naar klant
    const customerMail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: resendHeaders,
      body: JSON.stringify({
        from: "SLIM Subsidie Advies <noreply@slimsubsidieadvies.nl>",
        to: [email],
        subject: `Bevestiging betaling SLIM Dieptecheck — ${factuurNr}`,
        html: emailHtml,
        attachments: [
          {
            filename: `Factuur-${factuurNr}.html`,
            content: Buffer.from(factuurHtml).toString("base64"),
          },
        ],
      }),
    });
    if (!customerMail.ok) {
      console.error("Resend klant-mail fout:", JSON.stringify(await customerMail.json()));
    } else {
      console.log(`✓ Bevestiging verstuurd naar klant: ${email} — ${factuurNr}`);
    }

    // 2. Notificatie naar eigenaar
    const ownerMail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: resendHeaders,
      body: JSON.stringify({
        from: "SLIM Subsidie App <noreply@slimsubsidieadvies.nl>",
        to: ["info@slimsubsidieadvies.nl"],
        subject: `Nieuwe betaling — ${naam}${bedrijf ? ` (${bedrijf})` : ""} · ${factuurNr}`,
        html: `<p>Nieuwe SLIM Dieptecheck betaling ontvangen.</p>
<ul>
  <li><strong>Factuur:</strong> ${factuurNr}</li>
  <li><strong>Naam:</strong> ${naam}</li>
  <li><strong>Bedrijf:</strong> ${bedrijf || "—"}</li>
  <li><strong>E-mail:</strong> ${email}</li>
  <li><strong>Bedrag incl. BTW:</strong> € ${bedragIncl}</li>
  <li><strong>Early bird:</strong> ${earlyBird ? "ja" : "nee"}</li>
  <li><strong>Activiteiten:</strong> ${Array.isArray(activiteiten) ? activiteiten.join(", ") : activiteiten || "—"}</li>
  <li><strong>Medewerkers:</strong> ${profile?.medewerkers || "—"}</li>
  <li><strong>Sector:</strong> ${profile?.sector || "—"}</li>
  <li><strong>Investering:</strong> ${invNum > 0 ? `€ ${invNum.toLocaleString("nl-NL")}` : "—"}</li>
  <li><strong>Payment ID:</strong> ${id}</li>
</ul>`,
      }),
    });
    if (!ownerMail.ok) {
      console.error("Resend eigenaar-mail fout:", JSON.stringify(await ownerMail.json()));
    } else {
      console.log(`✓ Notificatie verstuurd naar info@slimsubsidieadvies.nl`);
    }

    return res.status(200).end();
  } catch (error) {
    console.error("Webhook fout:", error);
    // Altijd 200 teruggeven zodat Mollie niet blijft retrying
    return res.status(200).end();
  }
}
