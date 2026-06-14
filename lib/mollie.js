// Mollie API client — herbruikbare module voor betaalfuncties

const MOLLIE_BASE = "https://api.mollie.com/v2";

function getMollieKey() {
  const key = process.env.MOLLIE_API_KEY;
  if (!key) throw new Error("MOLLIE_API_KEY niet geconfigureerd");
  return key;
}

export async function createPayment({
  naam,
  bedrijf,
  email,
  telefoon,
  methode,
  activiteiten,
  subsidyEst,
  earlyBird,
  bedragExcl,
  bedragIncl,
  profile,
  answers,
  investment,
}) {
  const key = getMollieKey();
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.slimsubsidieadvies.nl";

  const omschrijving = earlyBird
    ? "SLIM Dieptecheck Early Bird — SLIM Subsidie Advies"
    : "SLIM Dieptecheck — SLIM Subsidie Advies";

  const methodeMap = {
    ideal: "ideal",
    creditcard: "creditcard",
    bancontact: "bancontact",
  };

  const body = {
    amount: { value: parseFloat(bedragIncl).toFixed(2), currency: "EUR" },
    description: omschrijving,
    redirectUrl: `${siteUrl}/succes`,
    webhookUrl: `${siteUrl}/api/betaling/webhook`,
    method: methodeMap[methode] || "ideal",
    locale: "nl_NL",
    metadata: {
      naam,
      bedrijf: bedrijf || "",
      email,
      telefoon: telefoon || "",
      activiteiten: activiteiten || [],
      subsidyEst: subsidyEst || 0,
      earlyBird,
      bedragExcl: bedragExcl.toString(),
      bedragIncl: parseFloat(bedragIncl).toFixed(2),
      profile: profile || {},
      answers: answers || {},
      investment: investment || 0,
    },
  };

  const response = await fetch(`${MOLLIE_BASE}/payments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify(body),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Betaling kon niet worden aangemaakt");
  }

  return {
    checkoutUrl: data._links.checkout.href,
    paymentId: data.id,
  };
}

export async function getPayment(paymentId) {
  const key = getMollieKey();

  const response = await fetch(`${MOLLIE_BASE}/payments/${paymentId}`, {
    headers: { Authorization: `Bearer ${key}` },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.detail || "Betaling kon niet worden opgehaald");
  }

  return data;
}
