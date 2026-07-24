"use client";

export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <main className="not-found">
      <p className="eyebrow">Production note</p>
      <h1>Something slipped off the desk.</h1>
      <button type="button" onClick={reset}>
        Try again
      </button>
    </main>
  );
}
