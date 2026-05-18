// api/webhook.js
// Mollie stuurt een POST naar dit endpoint zodra de betalingsstatus wijzigt.
// Controleert de status en stuurt bij "paid" de bevestigingsmail via Resend.
//
// Environment variables:
//   MOLLIE_API_KEY  → zelfde sleutel als in create-payment.js
//   RESEND_API_KEY  → van resend.com (gratis: 3.000 mails/maand)
//   MAIL_FROM       → bijv. "SLIM Subsidie Advies <info@slimsubsidieadvies.nl>"
//   MAIL_BCC        → bijv. info@slimsubsidieadvies.nl (kopie naar jezelf)

import { buildConfirmationEmail } from "./_emailTemplate.js";
import { buildInvoiceHtml } from "./_invoiceTemplate.js";

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
      // Nog niet betaald — Mollie stuurt later opnieuw als status wijzigt
      return res.status(200).end();
    }

    // ── Betaling geslaagd ──
    const meta = payment.metadata || {};
    const { naam, bedrijf, email, activiteiten, subsidyEst, earlyBird, bedrag } = meta;

    if (!email) {
      console.error("Geen e-mail in metadata voor payment:", id);
      return res.status(200).end();
    }

    // Factuurnummer: SSA-YYYYMMDD-{laatste 6 van payment ID}
    const datum = new Date();
    const factuurNr = `SSA-${datum.getFullYear()}${String(datum.getMonth() + 1).padStart(2, "0")}${String(datum.getDate()).padStart(2, "0")}-${id.slice(-6).toUpperCase()}`;

    // Bouw e-mail en factuur HTML
    const emailHtml = buildConfirmationEmail({
      naam, bedrijf, email, activiteiten, subsidyEst,
      earlyBird, bedrag, factuurNr, datum, paymentId: id,
    });

    const factuurHtml = buildInvoiceHtml({
      naam, bedrijf, email, activiteiten,
      earlyBird, bedrag, factuurNr, datum, paymentId: id,
    });

    if (!resendKey) {
      console.error("Geen RESEND_API_KEY — mail niet verstuurd voor:", email);
      return res.status(200).end();
    }

    // Verstuur via Resend REST API (geen npm nodig)
    const mailBody = {
      from: process.env.MAIL_FROM || "SLIM Subsidie Advies <info@slimsubsidieadvies.nl>",
      to: [email],
      bcc: process.env.MAIL_BCC ? [process.env.MAIL_BCC] : [],
      subject: `Bevestiging betaling SLIM Dieptecheck — ${factuurNr}`,
      html: emailHtml,
      attachments: [
        {
          filename: `Factuur-${factuurNr}.html`,
          content: Buffer.from(factuurHtml).toString("base64"),
        },
      ],
    };

    const mailRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify(mailBody),
    });

    const mailData = await mailRes.json();

    if (!mailRes.ok) {
      console.error("Resend fout:", JSON.stringify(mailData));
    } else {
      console.log(`✓ Bevestiging verstuurd naar ${email} — ${factuurNr}`);
    }

    return res.status(200).end();
  } catch (error) {
    console.error("Webhook fout:", error);
    // Altijd 200 teruggeven zodat Mollie niet blijft retrying
    return res.status(200).end();
  }
}
