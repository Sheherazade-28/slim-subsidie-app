// api/_invoiceTemplate.js
// HTML factuur als e-mailbijlage.
// !! Vul je eigen gegevens in op de 4 gemarkeerde plekken !!

export function buildInvoiceHtml({
  naam,
  bedrijf,
  email,
  activiteiten = [],
  bedragExcl = "49.00",
  bedragIncl = "59.29",
  factuurNr,
  datum,
  paymentId,
}) {
  const datumStr = new Date(datum).toLocaleDateString("nl-NL", {
    day: "numeric", month: "long", year: "numeric",
  });

  const bedragNum = parseFloat(bedragExcl);
  const btw = parseFloat(bedragIncl) - bedragNum;
  const totaal = parseFloat(bedragIncl);

  const fmt = (n) =>
    new Intl.NumberFormat("nl-NL", {
      style: "currency", currency: "EUR", minimumFractionDigits: 2,
    }).format(n);

  const actList = activiteiten.length > 0 ? activiteiten.join(", ") : "Nader te bepalen";

  return `<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8">
<title>Factuur ${factuurNr}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;font-size:13px;color:#1a2a3a;background:#fff;padding:48px;}
  .logo{font-size:22px;font-weight:800;color:#0d2e5a;letter-spacing:1px;}
  .logo-sub{font-size:10px;font-weight:700;letter-spacing:2px;color:#2aaae2;text-transform:uppercase;}
  h1{font-size:28px;font-weight:700;color:#0d2e5a;margin-bottom:4px;}
  table{width:100%;border-collapse:collapse;}
  th{text-align:left;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5a6e82;padding:8px 0;border-bottom:2px solid #0d2e5a;}
  td{padding:10px 0;border-bottom:1px solid #e8edf3;font-size:13px;color:#1a2a3a;vertical-align:top;}
  .total-row td{border-bottom:none;border-top:2px solid #0d2e5a;font-weight:700;font-size:14px;color:#0d2e5a;padding-top:12px;}
  .badge{display:inline-block;background:#e8f4fc;color:#1a6bbf;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:3px 10px;border-radius:20px;}
  .paid-badge{display:inline-block;background:#e6f5ee;color:#1a7a4a;font-size:11px;font-weight:700;padding:5px 14px;border-radius:20px;border:1px solid #a8d8bc;}
  @media print{body{padding:24px;}button{display:none;}}
</style>
</head>
<body>

<div style="text-align:right;margin-bottom:24px;">
  <button onclick="window.print()" style="background:#0d2e5a;color:#fff;border:none;padding:8px 18px;border-radius:6px;font-size:13px;cursor:pointer;">🖨 Afdrukken / Opslaan als PDF</button>
</div>

<!-- Header -->
<table style="margin-bottom:40px;">
  <tr>
    <td style="border:none;padding:0;">
      <div class="logo">SLIM</div>
      <div class="logo-sub">Subsidie Advies</div>
      <div style="margin-top:12px;font-size:12px;color:#5a6e82;line-height:1.8;">
        www.slimsubsidieadvies.nl<br>
        info@slimsubsidieadvies.nl<br>
        KvK: <strong>83970614</strong><br>
        BTW: <strong>NL863053907B01</strong>
      </div>
    </td>
    <td style="border:none;padding:0;text-align:right;vertical-align:top;">
      <h1>FACTUUR</h1>
      <div style="font-size:13px;color:#5a6e82;line-height:1.8;margin-top:8px;">
        Factuurnummer: <strong style="color:#0d2e5a;">${factuurNr}</strong><br>
        Factuurdatum: <strong style="color:#0d2e5a;">${datumStr}</strong><br>
        Status: <span class="paid-badge">✓ Betaald</span>
      </div>
    </td>
  </tr>
</table>

<!-- Klantgegevens -->
<div style="background:#f7f9fc;border-radius:8px;border:1px solid #e8edf3;padding:20px 24px;margin-bottom:36px;">
  <div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#5a6e82;margin-bottom:10px;">Factuur aan</div>
  <div style="font-size:14px;font-weight:600;color:#0d2e5a;">${naam}</div>
  ${bedrijf ? `<div style="font-size:13px;color:#5a6e82;">${bedrijf}</div>` : ""}
  <div style="font-size:13px;color:#5a6e82;">${email}</div>
</div>

<!-- Regels -->
<table style="margin-bottom:8px;">
  <thead>
    <tr>
      <th style="width:55%;">Omschrijving</th>
      <th>Details</th>
      <th style="text-align:right;">Bedrag</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <strong>SLIM Reservering</strong>
        <br><span style="font-size:12px;color:#5a6e82;margin-top:4px;display:block;">Aanvraagbegeleiding en screeningstraject bij RVO</span>
      </td>
      <td style="color:#5a6e82;font-size:12px;">Activiteit(en):<br>${actList}</td>
      <td style="text-align:right;">${fmt(bedragNum)}</td>
    </tr>
  </tbody>
</table>

<!-- Totalen -->
<table style="width:300px;margin-left:auto;margin-bottom:36px;">
  <tr><td style="border:none;padding:6px 0;color:#5a6e82;">Subtotaal</td><td style="border:none;padding:6px 0;text-align:right;">${fmt(bedragNum)}</td></tr>
  <tr><td style="border:none;padding:6px 0;color:#5a6e82;">BTW 21%</td><td style="border:none;padding:6px 0;text-align:right;">${fmt(btw)}</td></tr>
  <tr class="total-row"><td>Totaal</td><td style="text-align:right;">${fmt(totaal)}</td></tr>
</table>

<!-- Betaalstatus -->
<div style="background:#e6f5ee;border:1px solid #a8d8bc;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
  <div style="font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#1a7a4a;margin-bottom:6px;">Betalingsstatus</div>
  <div style="font-size:14px;font-weight:600;color:#1a7a4a;">✓ Volledig betaald via Mollie</div>
  <div style="font-size:12px;color:#1a7a4a;margin-top:4px;">Betalingskenmerk: ${paymentId}</div>
</div>

<!-- No cure no pay -->
<div style="background:#f7f9fc;border-left:3px solid #0d2e5a;padding:14px 18px;margin-bottom:36px;border-radius:0 8px 8px 0;">
  <div style="font-size:12px;color:#5a6e82;line-height:1.7;">
    <strong style="color:#0d2e5a;">No cure, no pay:</strong> Bij toekenning van de SLIM-subsidie is een succesfee verschuldigd.
    De reserveringsfee (${fmt(bedragNum)} excl. btw) wordt hierop in mindering gebracht. Geen subsidietoekenning = geen succesfee.
  </div>
</div>

<!-- Bankgegevens -->
<div style="font-size:12px;color:#5a6e82;line-height:1.8;border-top:1px solid #e8edf3;padding-top:20px;">
  <strong style="color:#0d2e5a;">Bankgegevens SLIM Subsidie Advies</strong><br>
  IBAN: <strong>NL91ABNA0892920394</strong> · BIC: <strong>ABNANL2A</strong><br>
  Ten name van: SLIM Subsidie Advies<br>
  <span style="font-size:11px;color:#9ca3af;">Deze factuur is automatisch gegenereerd en geldig zonder handtekening.</span>
</div>

</body>
</html>`;
}
