import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found" id="main-content">
      <p className="eyebrow">Archive error · 404</p>
      <h1>We couldn’t find this project.</h1>
      <p>It may have moved somewhere else in the collection.</p>
      <Link href="/">return to the work →</Link>
    </main>
  );
}
