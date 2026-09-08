import Link from "next/link";
import { Texture } from "./texture";

export default function Home() {
  return (
    <main>
      <h2>Home page</h2>
      <p>The texture below must be dots. Its id must differ from the layout&apos;s.</p>
      <Texture kind="dots" />
      <Link href="/other">Go to /other</Link>
    </main>
  );
}
