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
  assert.match(html, /Welcome to my work collection/);
  assert.match(html, /Producing work people remember/);
  assert.match(html, /No Seas Paloma/);
  assert.match(html, /Indispensables/);
  assert.match(html, /Old Spice/);
  assert.match(html, /Old Spice · Film/);
  assert.match(html, /borja\.nicole9704@gmail\.com/);
  assert.match(html, /\+52 555 500 1653/);
  assert.match(html, /\/favicon-nb\.svg/);
  assert.doesNotMatch(html, /archive 01\s*\/\s*16/i);
  assert.doesNotMatch(html, /production \/ people \/ pictures/i);
  assert.match(
    html,
    /\/projects\/old-spice-no-seas-paloma\/cover-[^"]+\.jpg/,
  );
  assert.match(
    html,
    /\/projects\/ke-personajes-nos-prometimos\/cover-20260724-v2\.jpg/,
  );
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
  assert.equal((html.match(/data-testid="polaroid"/g) ?? []).length, 16);
});

test("server-renders a configured project film", async () => {
  const response = await render("/work/kfc-lofried-beats");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /LoFried Beats/);
  assert.match(html, /turned the sounds of fried chicken into LoFi beats/);
  assert.match(html, /Play video: LoFried Beats/);
  assert.match(html, /click to play/);
  assert.match(
    html,
    /\/projects\/kfc-lofried-beats\/still-2-[^"]+\.jpg/,
  );
  assert.doesNotMatch(html, /project-navigation|project information|volver/i);
  assert.doesNotMatch(html, /Watch the work|open original link|LF\s*\/\s*01/i);
  assert.match(html, /href="\/#work-board"/);
  assert.doesNotMatch(html, /(?:href|src)="undefined"/);
});

for (const [path, title] of [
  ["/work/kfc-nugget-sound-test", "Nugget Sound Test"],
  ["/work/kfc-bring-back-the-flow", "Bring Back The Flow"],
]) {
  test(`server-renders one video player for ${title}`, async () => {
    const response = await render(path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.equal((html.match(/click to play/g) ?? []).length, 1);
    assert.match(html, new RegExp(`Play video: ${title}`));
  });
}

test("server-renders the corrected Milloncity campaign year", async () => {
  const response = await render("/work/atlantic-city-milloncity");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /fully AI-generated commercial of 2025/);
  assert.doesNotMatch(html, /fully AI-generated commercial of 2026/);
});

test("server-renders the complete professional bio", async () => {
  const response = await render("/bio");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Executive Producer and Campaign Coordinator/);
  assert.match(html, /Experience timeline/);
  assert.match(html, /Alkimiads/);
  assert.match(html, /Rebeca Producciones/);
  assert.match(html, /Best Peruvian Production Company/);
  assert.match(html, /D&amp;AD Awards/);
  assert.match(html, /APAP Awards/);
  assert.match(html, /El Ojo Awards/);
  assert.match(html, /El Condor Awards/);
  assert.match(html, /\/bio\/condor-lions-edit-20260724\.png/);
  assert.match(html, /\/bio\/portaretrato-20260724\.jpg/);
  assert.match(html, /\/bio\/gallery-01-20260724\.jpg/);
  assert.match(html, /\/bio\/gallery-06-20260724\.jpg/);
  assert.match(html, /data-gallery-placement="desktop"/);
  assert.match(html, /data-gallery-placement="mobile"/);
  assert.equal(
    (html.match(/data-testid="bio-gallery-image"/g) ?? []).length,
    6,
  );
  assert.doesNotMatch(html, /portrait coming soon/i);
  assert.match(html, /🇲🇽/);
  assert.match(html, /🇵🇪/);
  assert.match(html, /🇪🇨/);
  assert.match(html, /General Producer/);
  assert.match(html, /Freelance/);
  assert.match(html, /borja\.nicole9704@gmail\.com/);
});
