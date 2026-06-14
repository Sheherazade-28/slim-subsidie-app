import { NextResponse } from "next/server";

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

export async function POST(request) {
  const mollieKey = process.env.MOLLIE_API_KEY;
  if (!mollieKey) {
    console.error("Geen MOLLIE_API_KEY gevonden");
    return NextResponse.json({ error: "Betaling niet geconfigureerd." }, { status: 500 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldige request body." }, { status: 400 });
  }

  const { naam, bedrijf, email, telefoon, methode, activiteiten, subsidyEst, profile, answers, investment } = body;

  if (!naam || !email || !methode) {
    return NextResponse.json({ error: "Naam, e-mail en betaalmethode zijn verplicht." }, { status: 400 });
  }

  // Vroegboekerkorting: t/m 10 juli 2026
  const now = new Date();
  const earlyBird = now >= new Date(2026, 4, 5) && now <= new Date(2026, 6, 10);

  const bedragExcl = earlyBird ? 200 : 250;
  const btw = bedragExcl * 0.21;
  const bedragIncl = bedragExcl + btw; // 242.00 of 302.50
  const bedragMollie = bedragIncl.toFixed(2);

  const omschrijving = earlyBird
    ? "SLIM Dieptecheck Early Bird — SLIM Subsidie Advies"
    : "SLIM Dieptecheck — SLIM Subsidie Advies";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.slimsubsidieadvies.nl";

  const methodeMap = { ideal: "ideal", creditcard: "creditcard", bancontact: "bancontact" };

  const mollieBody = {
    amount: { value: bedragMollie, currency: "EUR" },
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
      bedragIncl: bedragMollie,
      profile: profile || {},
      answers: answers || {},
      investment: investment || 0,
    },
  };

  console.log("Mollie create payment voor:", email, "incl. BTW:", bedragMollie);

  try {
    const response = await fetch("https://api.mollie.com/v2/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${mollieKey}`,
      },
      body: JSON.stringify(mollieBody),
    });

    const data = await response.json();
    console.log("Mollie response status:", response.status);

    if (!response.ok) {
      console.error("Mollie fout:", JSON.stringify(data));
      return NextResponse.json(
        { error: data.detail || "Betaling kon niet worden aangemaakt." },
        { status: response.status }
      );
    }

    return NextResponse.json({
      checkoutUrl: data._links.checkout.href,
      paymentId: data.id,
    });
  } catch (error) {
    console.error("create-payment fout:", error);
    return NextResponse.json({ error: "Betaling mislukt.", details: error.message }, { status: 500 });
  }
}
