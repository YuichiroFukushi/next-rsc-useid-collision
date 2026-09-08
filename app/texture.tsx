import { useId } from "react";

/**
 * A Server Component (no "use client") that mints an SVG <pattern id> with
 * useId() and prints the id it got, so the collision is visible as text too.
 */
export function Texture({ kind }: { kind: "lines" | "dots" }) {
  const id = useId();
  return (
    <figure style={{ margin: "12px 0" }}>
      <figcaption>
        <code>
          {kind} pattern, id = {id}
        </code>
      </figcaption>
      <svg width="240" height="64" role="img" aria-label={`${kind} texture`}>
        <defs>
          <pattern id={id} width="8" height="8" patternUnits="userSpaceOnUse">
            {kind === "lines" ? (
              <line x1="0" y1="0" x2="0" y2="8" stroke="black" strokeWidth="2" />
            ) : (
              <circle cx="4" cy="4" r="2" fill="black" />
            )}
          </pattern>
        </defs>
        <rect width="240" height="64" fill={`url(#${id})`} />
      </svg>
    </figure>
  );
}
