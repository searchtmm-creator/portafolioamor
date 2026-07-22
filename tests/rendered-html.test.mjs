import assert from "node:assert/strict";
import test from "node:test";

async function render(path = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the complete work archive", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /The Producer.s Desk/);
  assert.match(html, /Producing ideas people remember/);
  assert.match(html, /KFC Goodometer/);
  assert.match(html, /KFC Streetwear/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.equal((html.match(/data-testid="polaroid"/g) ?? []).length, 16);
});

test("server-renders a configured project film", async () => {
  const response = await render("/work/lofibeats");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Lofibeats/);
  assert.match(html, /Play film: Lofibeats/);
  assert.doesNotMatch(html, /(?:href|src)="undefined"/);
});
