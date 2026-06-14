// Resend e-mail client — herbruikbare module

const RESEND_BASE = "https://api.resend.com/emails";

function getResendKey() {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY niet geconfigureerd");
  return key;
}

export async function sendEmail({ from, to, subject, html, attachments }) {
  const key = getResendKey();

  const body = { from, to, subject, html };
  if (attachments) body.attachments = attachments;

  const response = await fetch(RESEND_BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(JSON.stringify(err));
  }

  return response.json();
}

export async function sendConfirmationEmail({
  naam,
  bedrijf,
  email,
  emailHtml,
  factuurHtml,
  factuurNr,
}) {
  return sendEmail({
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
  });
}

export async function sendOwnerNotification({ naam, bedrijf, factuurNr, emailHtml }) {
  return sendEmail({
    from: "SLIM Subsidie App <noreply@slimsubsidieadvies.nl>",
    to: ["info@slimsubsidieadvies.nl"],
    subject: `Nieuwe betaling — ${naam}${bedrijf ? ` (${bedrijf})` : ""} · ${factuurNr}`,
    html: emailHtml,
  });
}
