const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.slimsubsidieadvies.nl";

export default function sitemap() {
  const now = new Date();

  const routes = [
    { url: "/", priority: 1.0, changeFrequency: "weekly" },
    { url: "/scan", priority: 0.9, changeFrequency: "monthly" },
    { url: "/lotingsuitslagen", priority: 0.8, changeFrequency: "monthly" },
    { url: "/whitepaper", priority: 0.8, changeFrequency: "monthly" },
    { url: "/projecten", priority: 0.7, changeFrequency: "monthly" },
    { url: "/slim-subsidie", priority: 0.8, changeFrequency: "monthly" },
    { url: "/slim-subsidie/aanvragen", priority: 0.7, changeFrequency: "monthly" },
    { url: "/slim-subsidie/voorwaarden", priority: 0.7, changeFrequency: "monthly" },
    { url: "/slim-subsidie/sectoren", priority: 0.7, changeFrequency: "monthly" },
    { url: "/slim-subsidie/2026", priority: 0.8, changeFrequency: "weekly" },
    { url: "/slim-subsidie/resultaten", priority: 0.6, changeFrequency: "monthly" },
    { url: "/reserveren", priority: 0.6, changeFrequency: "monthly" },
    { url: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { url: "/av", priority: 0.3, changeFrequency: "yearly" },
  ];

  return routes.map(({ url, priority, changeFrequency }) => ({
    url: `${siteUrl}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
