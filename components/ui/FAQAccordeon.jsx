"use client";

import { useState } from "react";

export default function FAQAccordeon({ items }) {
  const [open, setOpen] = useState(null);

  return (
    <div className="hp-faq-list">
      {items.map((item, i) => (
        <div
          key={i}
          className={`hp-faq-item ${open === i ? "open" : ""}`}
          onClick={() => setOpen(open === i ? null : i)}
        >
          <div className="hp-faq-q">
            {item.q}
            <span className="hp-faq-arr">{open === i ? "−" : "+"}</span>
          </div>
          <div className="hp-faq-a">
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
