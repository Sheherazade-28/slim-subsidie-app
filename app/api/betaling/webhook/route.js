import { NextResponse } from "next/server";
import { buildConfirmationEmail } from "@/lib/emailTemplate";
import { buildInvoiceHtml } from "@/lib/invoiceTemplate";

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

export async function OPTIONS() {
  return new NextResponse(null, { status: 200 });
}

export async function POST(request) {
  const mollieKey = process.env.MOLLIE_API_KEY;
  const resendKey = process.env.RESEND_API_KEY;

  if (!mollieKey) {
    console.error("Geen MOLLIE_API_KEY");
    return new NextResponse(null, { status: 200 });
  }

  let body;
  try {
    body = await request.formData();
  } catch {
    try {
      body = await request.json();
    } catch {
      console.error("Kon webhook body niet parsen");
      return new NextResponse(null, { status: 200 });
    }
  }

  const id = body instanceof FormData ? body.get("id") : body?.id;

  if (!id) {
    console.error("Geen payment ID in webhook body");
    return new NextResponse(null, { status: 200 });
  }

  try {
    const mollieRes = await fetch(`https://api.mollie.com/v2/payments/${id}`, {
      headers: { Authorization: `Bearer ${mollieKey}` },
    });

    const payment = await mollieRes.json();
    console.log("Webhook payment status:", payment.status, "id:", id);

    if (payment.status !== "paid") {
      return new NextResponse(null, { status: 200 });
    }

    const meta = payment.metadata || {};
    const { naam, bedrijf, email, activiteiten, subsidyEst, bedragExcl, bedragIncl, profile, answers, investment } = meta;

    if (!email) {
      console.error("Geen e-mail in metadata voor payment:", id);
      return new NextResponse(null, { status: 200 });
    }

    const datum = new Date();
    const factuurNr = `SSA-${datum.getFullYear()}${String(datum.getMonth() + 1).padStart(2, "0")}${String(datum.getDate()).padStart(2, "0")}-${id.slice(-6).toUpperCase()}`;

    const invNum = parseFloat(investment) || 0;
    const isAgri = answers?.agriculture === "yes";
    const actNames = Array.isArray(activiteiten) && activiteiten.length > 0
      ? activiteiten.map(aid => ACT_NAMES[aid] || aid).join(" + ")
      : "Nader te bepalen";
    const bedrijfsnaam = bedrijf || naam;
    const deadline = nextDeadline();

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

    const emailHtml = buildConfirmationEmail({
      naam, bedrijf, email, activiteiten, subsidyEst,
      bedragExcl, bedragIncl, factuurNr, datum, paymentId: id,
      quickscanHtml,
    });

    const factuurHtml = buildInvoiceHtml({
      naam, bedrijf, email, activiteiten,
      bedragExcl, bedragIncl, factuurNr, datum, paymentId: id,
    });

    if (!resendKey) {
      console.error("Geen RESEND_API_KEY — mail niet verstuurd voor:", email);
      return new NextResponse(null, { status: 200 });
    }

    const mailFrom = process.env.MAIL_FROM || "SLIM Subsidie Advies <noreply@slimsubsidieadvies.nl>";
    const mailBcc = process.env.MAIL_BCC;

    const resendHeaders = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${resendKey}`,
    };

    const customerMail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: resendHeaders,
      body: JSON.stringify({
        from: mailFrom,
        to: [email],
        ...(mailBcc && { bcc: [mailBcc] }),
        subject: `Bevestiging betaling SLIM Reservering — ${factuurNr}`,
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

    const ownerMail = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: resendHeaders,
      body: JSON.stringify({
        from: mailFrom,
        to: ["info@slimsubsidieadvies.nl"],
        ...(mailBcc && { bcc: [mailBcc] }),
        subject: `Nieuwe betaling — ${naam}${bedrijf ? ` (${bedrijf})` : ""} · ${factuurNr}`,
        html: emailHtml,
      }),
    });
    if (!ownerMail.ok) {
      console.error("Resend eigenaar-mail fout:", JSON.stringify(await ownerMail.json()));
    } else {
      console.log("✓ Notificatie verstuurd naar info@slimsubsidieadvies.nl");
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Webhook fout:", error);
    return new NextResponse(null, { status: 200 });
  }
}
