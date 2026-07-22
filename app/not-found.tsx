import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <p className="eyebrow">archive error · 404</p>
      <h1>This folder is missing.</h1>
      <p>It may have been moved across the desk.</p>
      <Link href="/">return to work →</Link>
    </main>
  );
}
