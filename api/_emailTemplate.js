// api/_emailTemplate.js
// HTML bevestigingsmail — wordt aangeroepen vanuit webhook.js

export function buildConfirmationEmail({
  naam,
  bedrijf,
  email,
  activiteiten = [],
  subsidyEst = 0,
  earlyBird = false,
  bedragExcl = "200.00",   // excl. BTW — was voorheen "bedrag"
  bedragIncl = "242.00",   // incl. BTW (21%)
  factuurNr,
  datum,
  paymentId,
}) {
  const datumStr = new Date(datum).toLocaleDateString("nl-NL", {
    day: "numeric", month: "long", year: "numeric",
  });

  const bedragExclNum = parseFloat(bedragExcl);
  const bedragInclNum = parseFloat(bedragIncl);
  const btw = (bedragInclNum - bedragExclNum).toFixed(2);

  const subsidyFmt = new Intl.NumberFormat("nl-NL", {
    style: "currency", currency: "EUR", maximumFractionDigits: 0,
  }).format(subsidyEst);

  const actList =
    activiteiten.length > 0
      ? activiteiten.map((a) => `<li>${a}</li>`).join("")
      : "<li>Nader te bepalen in overleg met adviseur</li>";

  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Bevestiging SLIM Dieptecheck</title>
</head>
<body style="margin:0;padding:0;background:#f2f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f2f5f9;padding:32px 16px;">
  <tr><td align="center">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

      <!-- Header -->
      <tr>
        <td style="background:#0d2e5a;border-radius:10px 10px 0 0;padding:32px 40px;text-align:center;">
          <div style="font-size:11px;font-weight:700;letter-spacing:3px;color:#2aaae2;text-transform:uppercase;margin-bottom:4px;">SLIM SUBSIDIE ADVIES</div>
          <div style="font-size:24px;font-weight:700;color:#ffffff;margin-bottom:6px;">Betaling bevestigd ✓</div>
          <div style="font-size:14px;color:rgba(255,255,255,0.55);">Uw SLIM Dieptecheck is betaald en actief</div>
        </td>
      </tr>

      <!-- Body -->
      <tr>
        <td style="background:#ffffff;padding:40px;">
          <p style="font-size:16px;color:#1a2a3a;margin:0 0 20px;">Beste ${naam},</p>
          <p style="font-size:14px;color:#5a6e82;line-height:1.7;margin:0 0 24px;">
            Bedankt voor uw betaling. Uw SLIM Dieptecheck is bevestigd${bedrijf ? ` voor <strong style="color:#1a2a3a;">${bedrijf}</strong>` : ""}.
            Eén van onze adviseurs neemt binnen <strong style="color:#0d2e5a;">5 werkdagen</strong> contact met u op.
          </p>

          <!-- Bestelling -->
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f9fc;border-radius:8px;border:1px solid #e8edf3;margin-bottom:28px;">
            <tr><td style="padding:20px 24px;">
              <div style="font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#5a6e82;margin-bottom:14px;">Uw bestelling</div>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr><td style="font-size:13px;color:#5a6e82;padding:5px 0;">Factuurnummer</td><td style="font-size:13px;font-weight:600;color:#0d2e5a;text-align:right;">${factuurNr}</td></tr>
                <tr><td style="font-size:13px;color:#5a6e82;padding:5px 0;">Datum</td><td style="font-size:13px;font-weight:600;color:#0d2e5a;text-align:right;">${datumStr}</td></tr>
                <tr><td style="font-size:13px;color:#5a6e82;padding:5px 0;">Product</td><td style="font-size:13px;font-weight:600;color:#0d2e5a;text-align:right;">SLIM Dieptecheck${earlyBird ? " (Early Bird)" : ""}</td></tr>
                <tr><td colspan="2" style="border-top:1px solid #e8edf3;padding-top:10px;"></td></tr>
                <tr><td style="font-size:13px;color:#5a6e82;padding:4px 0;">Bedrag excl. btw</td><td style="font-size:13px;color:#0d2e5a;text-align:right;">€ ${bedragExclNum.toFixed(2)}</td></tr>
                <tr><td style="font-size:13px;color:#5a6e82;padding:4px 0;">BTW (21%)</td><td style="font-size:13px;color:#0d2e5a;text-align:right;">€ ${btw}</td></tr>
                <tr><td style="font-size:14px;font-weight:700;color:#0d2e5a;padding:8px 0 4px;">Totaal betaald</td><td style="font-size:14px;font-weight:700;color:#0d2e5a;text-align:right;">€ ${bedragInclNum.toFixed(2)}</td></tr>
              </table>
            </td></tr>
          </table>

          <!-- Activiteiten -->
          <div style="margin-bottom:24px;">
            <div style="font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#5a6e82;margin-bottom:10px;">Gekozen activiteit(en)</div>
            <ul style="font-size:14px;color:#5a6e82;line-height:1.8;margin:0;padding-left:20px;">${actList}</ul>
          </div>

          <!-- Subsidie indicatie -->
          ${subsidyEst > 0 ? `
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#e6f5ee;border:1px solid #a8d8bc;border-radius:8px;margin-bottom:28px;">
            <tr><td style="padding:16px 20px;">
              <div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#1a7a4a;margin-bottom:4px;">Indicatief subsidiebedrag</div>
              <div style="font-size:28px;font-weight:700;color:#1a7a4a;">${subsidyFmt}</div>
              <div style="font-size:12px;color:#1a7a4a;margin-top:2px;">60% van uw investering · max. €24.999</div>
            </td></tr>
          </table>` : ""}

          <!-- Volgende stappen -->
          <div style="margin-bottom:28px;">
            <div style="font-size:10px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:#5a6e82;margin-bottom:14px;">Wat gebeurt er nu?</div>
            ${[
              ["1","Terugbelafspraak binnen 5 werkdagen","Uw adviseur neemt contact op om de strategie te bespreken."],
              ["2","Aanvraagvoorbereiding","Wij stellen het activiteitenplan, begroting en documenten op."],
              ["3","Foutloze indiening","Indiening via het RVO e-portaal, inclusief begeleiding screeningstraject."],
              ["4","Succesfee bij toekenning","€ 2.500 excl. btw — alleen bij toekenning. Dieptecheck wordt terugbetaald."],
            ].map(([nr, titel, tekst]) => `
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:12px;">
              <tr>
                <td width="36" valign="top"><div style="width:28px;height:28px;border-radius:50%;background:#0d2e5a;color:#fff;font-size:12px;font-weight:700;text-align:center;line-height:28px;">${nr}</div></td>
                <td valign="top" style="padding-left:12px;">
                  <div style="font-size:14px;font-weight:600;color:#0d2e5a;margin-bottom:2px;">${titel}</div>
                  <div style="font-size:13px;color:#5a6e82;line-height:1.5;">${tekst}</div>
                </td>
              </tr>
            </table>`).join("")}
          </div>

          <p style="font-size:14px;color:#5a6e82;line-height:1.7;margin:0 0 8px;">De factuur vindt u als bijlage bij deze e-mail.</p>
          <p style="font-size:14px;color:#5a6e82;line-height:1.7;margin:0;">Vragen? Mail naar <a href="mailto:info@slimsubsidieadvies.nl" style="color:#1a6bbf;">info@slimsubsidieadvies.nl</a></p>
        </td>
      </tr>

      <!-- Footer -->
      <tr>
        <td style="background:#070d18;border-radius:0 0 10px 10px;padding:24px 40px;text-align:center;">
          <div style="font-size:12px;color:rgba(255,255,255,0.3);line-height:1.6;">
            SLIM Subsidie Advies · www.slimsubsidieadvies.nl<br>
            info@slimsubsidieadvies.nl<br>
            <span style="font-size:11px;">Betalingskenmerk: ${paymentId}</span>
          </div>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}
