import Link from "next/link";

export default function Other() {
  return (
    <main>
      <h2>Other page</h2>
      <p>Hard-load this page, then use the link below (a client-side navigation).</p>
      <Link href="/">Back to /</Link>
    </main>
  );
}
