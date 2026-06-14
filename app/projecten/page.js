import SlimDatabase from "@/components/sections/SlimDatabase";

export const metadata = {
  title: "SLIM Subsidie Projecten Database — 6.208 Gehonoreerde Projecten",
  description: "Doorzoek alle 6.208 gehonoreerde SLIM-subsidieprojecten van MKB-bedrijven in Nederland (2020–2024). Filter op categorie, provincie en tijdvak.",
  robots: { index: true },
};

export default function ProjectenPage() {
  return <SlimDatabase />;
}
