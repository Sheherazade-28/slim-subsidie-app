import { sendEmail } from "@/lib/resend";
import { SUBSIDIE, PRICING, TIJDVAKKEN_2026 } from "@/data/slim-content";
import {
  antwoordRijen,
  berekenIndicatie,
  getUitsluitingsRedenen,
  NIET_KANSRIJK_REDEN,
} from "@/data/quickscan-vragen";
import { buildQuickscanPdf, quickscanBestandsnaam } from "@/lib/quickscanPdf";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.slimsubsidieadvies.nl";

const tv2 = TIJDVAKKEN_2026.find((t) => t.label === "Tijdvak 2 2026");
const tv2OpenLabel = tv2.open.toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

function uitslagLabel(uitslag) {
  if (uitslag === "kansrijk") return "Kansrijk";
  if (uitslag === "mogelijk-kansrijk") return "Mogelijk kansrijk";
  return "Minder kansrijk";
}

function buildUserEmail({ voornaam, uitslag }) {
  const label = uitslagLabel(uitslag);
  const isKansrijk = uitslag === "kansrijk" || uitslag === "mogelijk-kansrijk";

  const ctaBlok = isKansrijk
    ? `<div style="text-align:center;margin:32px 0;">
        <a href="${SITE_URL}/reserveren"
           style="display:inline-block;background:#1a56db;color:#fff;text-decoration:none;
                  padding:14px 32px;border-radius:8px;font-weight:700;font-size:16px;">
          Reserveer uw aanvraagplaats voor €${PRICING.reserveringsfee} →
        </a>
        <p style="font-size:12px;color:#6b7280;margin-top:10px;">
          Tijdvak 2 opent ${tv2OpenLabel} · Beperkt aantal aanvraagplaatsen
        </p>
      </div>`
    : `<div style="text-align:center;margin:32px 0;">
        <a href="mailto:info@slimsubsidieadvies.nl"
           style="display:inline-block;background:#374151;color:#fff;text-decoration:none;
                  padding:14px 32px;border-radius:8px;font-weight:700;font-size:16px;">
          Neem contact op →
        </a>
      </div>`;

  const volgendStap = uitslag === "kansrijk"
    ? `<p>Op basis van uw antwoorden lijkt uw organisatie geschikt voor SLIM-subsidie — tot €${SUBSIDIE.maxBedrag.toLocaleString("nl-NL")} voor leren en ontwikkelen van medewerkers. Tijdvak 2 opent op ${tv2OpenLabel}.</p>
       <p>Reserveer uw aanvraagplaats en wij nemen contact met u op voor de intake.</p>`
    : uitslag === "mogelijk-kansrijk"
    ? `<p>Op basis van uw antwoorden is uw organisatie mogelijk geschikt voor SLIM-subsidie. Tijdens de intake beoordelen wij de subsidiemogelijkheden verder voor uw specifieke situatie.</p>
       <p>Reserveer uw aanvraagplaats en wij plannen een intakegesprek met u in.</p>`
    : `<p>De SLIM-subsidie is bedoeld voor MKB-ondernemingen met minimaal 2 medewerkers (exclusief directeur-grootaandeelhouder) die actief investeren in leren en ontwikkelen.</p>
       <p>Heeft u vragen over uw situatie? Neem gerust contact met ons op.</p>`;

  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:580px;margin:32px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
    <div style="background:#0c1e3c;padding:28px 32px;">
      <div style="font-family:'Barlow Condensed',sans-serif;font-size:22px;font-weight:900;color:#fff;letter-spacing:1px;">
        <span style="color:#60a5fa;">SLIM</span> SUBSIDIE ADVIES
      </div>
    </div>
    <div style="padding:32px;">
      <p style="font-size:15px;color:#374151;margin-top:0;">Geachte ${voornaam},</p>
      <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:16px 20px;margin:20px 0;">
        <div style="font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:1px;margin-bottom:6px;">Uitslag quickscan</div>
        <div style="font-size:20px;font-weight:800;color:${isKansrijk ? "#1a56db" : "#374151"};">${label}</div>
      </div>
      <div style="font-size:15px;color:#374151;line-height:1.75;">
        ${volgendStap}
        <p>In de bijlage vindt u uw persoonlijke quickscanrapport (PDF) met al uw antwoorden en de onderbouwing van de uitslag.</p>
      </div>
      ${ctaBlok}
      <hr style="border:none;border-top:1px solid #e5e7eb;margin:28px 0;">
      <p style="font-size:13px;color:#6b7280;line-height:1.65;">
        Heeft u vragen? Neem contact op via
        <a href="mailto:info@slimsubsidieadvies.nl" style="color:#1a56db;">info@slimsubsidieadvies.nl</a>.<br>
        <a href="${SITE_URL}/slim-subsidie/aanvragen" style="color:#1a56db;">Lees meer over de aanvraagprocedure →</a>
      </p>
    </div>
    <div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:16px 32px;font-size:11px;color:#9ca3af;">
      SLIM Subsidie Advies — onderdeel van Inscentia BV · KvK 83970614 ·
      <a href="${SITE_URL}/privacy" style="color:#9ca3af;">Privacyverklaring</a>
    </div>
  </div>
</body>
</html>`;
}

function buildOwnerEmail({ naam, bedrijf, email, telefoon, medewerkers, uitslag, rijen, indicatie, referentie }) {
  const tabel = rijen
    .map(([vraag, antwoord]) =>
      `<tr><td style="padding:6px 8px;font-size:12px;color:#6b7280;border-bottom:1px solid #e5e7eb;">${vraag}</td>` +
      `<td style="padding:6px 8px;font-size:12px;font-weight:600;color:#0c1e3c;text-align:right;border-bottom:1px solid #e5e7eb;">${antwoord}</td></tr>`
    )
    .join("");

  const contact = [
    ["Naam", naam],
    ["Organisatie", bedrijf || "—"],
    ["E-mail", `<a href="mailto:${email}" style="color:#1a56db;">${email}</a>`],
    ["Telefoon", telefoon ? `<a href="tel:${String(telefoon).replace(/\s/g, "")}" style="color:#1a56db;">${telefoon}</a>` : "—"],
    ["Medewerkers", medewerkers || "—"],
  ]
    .map(([l, v]) =>
      `<tr><td style="padding:6px 8px;font-size:12px;color:#6b7280;border-bottom:1px solid #e5e7eb;">${l}</td>` +
      `<td style="padding:6px 8px;font-size:12px;font-weight:600;color:#0c1e3c;text-align:right;border-bottom:1px solid #e5e7eb;">${v}</td></tr>`
    )
    .join("");

  const indicatieRegel = indicatie
    ? `<p style="font-size:13px;color:#374151;margin:12px 0 0;">Opgegeven investering: <strong>€${indicatie.investering.toLocaleString("nl-NL")}</strong> · indicatief subsidiebedrag: <strong>tot €${indicatie.subsidie.toLocaleString("nl-NL")}</strong></p>`
    : "";

  return `<!DOCTYPE html>
<html lang="nl">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:580px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:#0c1e3c;padding:20px 28px;color:#fff;font-size:15px;font-weight:700;">
      Nieuwe quickscan — ${uitslagLabel(uitslag)}
    </div>
    <div style="padding:24px 28px;">
      <p style="font-size:13px;color:#6b7280;margin:0 0 4px;">Referentie ${referentie}</p>
      ${indicatieRegel}
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 0;">
        <tr><td colspan="2" style="padding:4px 8px 6px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;">Contactgegevens</td></tr>
        ${contact}
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:18px 0 0;">
        <tr><td colspan="2" style="padding:4px 8px 6px;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#6b7280;">Antwoorden</td></tr>
        ${tabel}
      </table>
      <p style="font-size:12px;color:#6b7280;margin:20px 0 0;">Het volledige rapport zit als PDF in de bijlage.</p>
    </div>
  </div>
</body>
</html>`;
}

function maakReferentie(datum) {
  const d = `${datum.getFullYear()}${String(datum.getMonth() + 1).padStart(2, "0")}${String(datum.getDate()).padStart(2, "0")}`;
  return `QS-${d}-${datum.getTime().toString(36).slice(-6).toUpperCase()}`;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { voornaam, achternaam, email, telefoon, bedrijf, medewerkers, antwoorden, uitslag } = body;

    if (!voornaam || !email || !uitslag) {
      return Response.json({ error: "Verplichte velden ontbreken" }, { status: 400 });
    }

    const from = process.env.MAIL_FROM || "SLIM Subsidie Advies <noreply@slimsubsidieadvies.nl>";
    const bcc = process.env.MAIL_BCC || null;
    const naam = `${voornaam} ${achternaam}`.trim();

    const datum = new Date();
    const referentie = maakReferentie(datum);
    const scan = antwoorden || {};
    const rijen = antwoordRijen(scan);
    const indicatie = berekenIndicatie(scan);
    const redenen = getUitsluitingsRedenen(scan)
      .map((sleutel) => NIET_KANSRIJK_REDEN[sleutel])
      .filter(Boolean);

    // Rapport als bijlage. Mislukt dit, dan gaat de mail alsnog uit — zonder PDF.
    let attachments;
    try {
      const content = await buildQuickscanPdf({
        naam, bedrijf, email, telefoon, medewerkers,
        datum, referentie, uitslag,
        antwoordRijen: rijen,
        indicatie,
        redenen,
      });
      attachments = [{ filename: quickscanBestandsnaam({ bedrijf, naam, datum }), content }];
    } catch (err) {
      console.error("Quickscan-PDF bouwen mislukt:", err);
    }

    const [klant, eigenaar] = await Promise.allSettled([
      sendEmail({
        from,
        to: [email],
        bcc,
        subject: `Uw SLIM-subsidie quickscan — ${uitslagLabel(uitslag)}`,
        html: buildUserEmail({ voornaam, uitslag }),
        attachments,
      }),
      sendEmail({
        from,
        to: ["info@slimsubsidieadvies.nl"],
        subject: `Nieuwe quickscan — ${naam}${bedrijf ? ` (${bedrijf})` : ""} · ${uitslagLabel(uitslag)}`,
        html: buildOwnerEmail({
          naam, bedrijf, email, telefoon, medewerkers,
          uitslag, rijen, indicatie, referentie,
        }),
        attachments,
      }),
    ]);

    if (klant.status === "rejected") console.error("Quickscan klant-mail fout:", klant.reason);
    if (eigenaar.status === "rejected") console.error("Quickscan eigenaar-mail fout:", eigenaar.reason);

    return Response.json({ ok: klant.status === "fulfilled", referentie });
  } catch (err) {
    console.error("Quickscan API fout:", err);
    return Response.json({ error: "Verzenden mislukt" }, { status: 500 });
  }
}
