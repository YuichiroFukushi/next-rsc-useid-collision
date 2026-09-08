import type { ReactNode } from "react";
import { Texture } from "./texture";

// Rendered per request, as any route that reads cookies() or headers() is.
// A fully static prerender renders the whole tree in one pass and does not
// reproduce the collision; see README.
export const dynamic = "force-dynamic";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", padding: 24 }}>
        <h1>Root layout (persists across navigations)</h1>
        <Texture kind="lines" />
        <hr />
        {children}
      </body>
    </html>
  );
}
