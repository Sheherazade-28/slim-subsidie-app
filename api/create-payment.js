// api/create-payment.js
// Maakt een Mollie betaling aan via de Mollie REST API (geen npm package nodig).
// Zelfde structuur als analyze.js.
//
// Environment variables instellen in Vercel dashboard:
//   MOLLIE_API_KEY        → test_xxxx (test) of live_xxxx (productie)
//   NEXT_PUBLIC_SITE_URL  → https://www.slimsubsidieadvies.nl

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const mollieKey = process.env.MOLLIE_API_KEY;
  if (!mollieKey) {
    console.error("Geen MOLLIE_API_KEY gevonden");
    return res.status(500).json({ error: "Betaling niet geconfigureerd." });
  }

  const { naam, bedrijf, email, telefoon, methode, activiteiten, subsidyEst } =
    req.body;

  if (!naam || !email || !methode) {
    return res
      .status(400)
      .json({ error: "Naam, e-mail en betaalmethode zijn verplicht." });
  }

  // Vroegboekerkorting: t/m 10 juli 2026
  const now = new Date();
  const earlyBird =
    now >= new Date(2026, 4, 5) && now <= new Date(2026, 6, 10);
  const bedrag = earlyBird ? "200.00" : "250.00";
  const omschrijving = earlyBird
    ? "SLIM Dieptecheck Early Bird — SLIM Subsidie Advies"
    : "SLIM Dieptecheck — SLIM Subsidie Advies";

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.slimsubsidieadvies.nl";

  // Mollie betaalmethode mapping
  const methodeMap = {
    ideal: "ideal",
    creditcard: "creditcard",
    bancontact: "bancontact",
  };

  const body = {
    amount: { value: bedrag, currency: "EUR" },
    description: omschrijving,
    redirectUrl: `${siteUrl}/?betaling=geslaagd`,
    webhookUrl: `${siteUrl}/api/webhook`,
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
      bedrag,
    },
  };

  console.log("Mollie create payment voor:", email, "bedrag:", bedrag);

  try {
    const response = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mollieKey}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    console.log("Mollie response status:", response.status);

    if (!response.ok) {
      console.error("Mollie fout:", JSON.stringify(data));
      return res.status(response.status).json({
        error: data.detail || "Betaling kon niet worden aangemaakt.",
      });
    }

    // Geef checkout URL terug aan de frontend
    return res.status(200).json({
      checkoutUrl: data._links.checkout.href,
      paymentId: data.id,
    });
  } catch (error) {
    console.error("create-payment fout:", error);
    return res
      .status(500)
      .json({ error: "Betaling mislukt.", details: error.message });
  }
}
