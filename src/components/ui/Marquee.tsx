"use client";

interface MarqueeProps {
  items: string[];
  reverse?: boolean;
  separator?: string;
  className?: string;
  itemClassName?: string;
}

export function Marquee({
  items,
  reverse = false,
  separator = "·",
  className = "",
  itemClassName = "",
}: MarqueeProps) {
  const doubled = [...items, ...items];

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <div
        className={`inline-flex gap-8 ${
          reverse ? "marquee-track-reverse" : "marquee-track"
        }`}
      >
        {doubled.map((item, i) => (
          <span key={i} className={`inline-flex items-center gap-8 ${itemClassName}`}>
            <span>{item}</span>
            <span className="text-brand-orange opacity-60">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
