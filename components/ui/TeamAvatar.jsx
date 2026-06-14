"use client";

import Image from "next/image";

export default function TeamAvatar({ slug, naam, objectPosition = "center 20%" }) {
  const initials = naam.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{ position: "relative", width: 120, height: 120, margin: "0 auto 12px" }}>
      <Image
        src={`/images/team/${slug}.png`}
        alt={`${naam} — SLIM Subsidieadviseur`}
        width={120}
        height={120}
        style={{ borderRadius: "50%", objectFit: "cover", objectPosition }}
        onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "flex"; }}
      />
      <div
        className="hp-avatar"
        style={{ display: "none", position: "absolute", inset: 0, borderRadius: "50%", alignItems: "center", justifyContent: "center" }}
      >
        {initials}
      </div>
    </div>
  );
}
