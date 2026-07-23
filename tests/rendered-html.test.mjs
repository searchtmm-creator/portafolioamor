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
  assert.match(html, /Welcome to my Work collection/);
  assert.match(html, /Producing something that people remember/);
  assert.match(html, /No Seas Paloma/);
  assert.match(html, /Indispensables/);
  assert.match(html, /Old Spice/);
  assert.match(html, /Old Spice · Film/);
  assert.match(html, /borja\.nicole9704@gmail\.com/);
  assert.match(html, /\+52 555 500 1653/);
  assert.doesNotMatch(html, /archive 01\s*\/\s*16/i);
  assert.doesNotMatch(html, /production \/ people \/ pictures/i);
  assert.match(html, /\/projects\/old-spice-no-seas-paloma\/cover.jpg/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.equal((html.match(/data-testid="polaroid"/g) ?? []).length, 16);
});

test("server-renders a configured project film", async () => {
  const response = await render("/work/kfc-lofried-beats");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /LoFried Beats/);
  assert.match(html, /Fried chicken sounds transformed into LoFi/);
  assert.match(html, /Play video: LoFried Beats/);
  assert.match(html, /click to play/);
  assert.match(html, /\/projects\/kfc-lofried-beats\/still-1.jpg/);
  assert.doesNotMatch(html, /project-navigation|project information|volver/i);
  assert.doesNotMatch(html, /Watch the work|open original link|LF\s*\/\s*01/i);
  assert.match(html, /href="\/#work-board"/);
  assert.doesNotMatch(html, /(?:href|src)="undefined"/);
});
