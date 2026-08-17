import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const publicRoutes = [
  "/",
  "/laereverk",
  "/lange-linjer",
  "/begreper",
  "/tidslinje",
  "/laerere",
  "/om",
  "/laereverk/02-fra-jegere-til-bysamfunn/2-2-jordbruksrevolusjonen",
];

async function render(pathname) {
  const { default: worker } = await import(`${workerUrl.href}?test=${process.pid}-${Date.now()}-${pathname}`);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the public homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Historie i sammenheng/);
  assert.match(html, /Fakta gir oss punktene/);
  assert.match(html, /Jordbruksrevolusjonen/);
  assert.match(html, /http:\/\/localhost(?::3000)?\/og\.png/);
  assert.equal(existsSync(join(projectRoot, "public", "og.png")), true);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|react-loading-skeleton/);
});

test("renders the reference chapter and its source-backed sections", async () => {
  const response = await render("/laereverk/02-fra-jegere-til-bysamfunn/2-2-jordbruksrevolusjonen");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Jordbruksrevolusjonen/);
  assert.match(html, /Çatalhöyük/);
  assert.match(html, /Göbekli Tepe/);
  assert.match(html, /Interaktive oppgaver/);
  assert.match(html, /Aktiver forkunnskapen/);
  assert.match(html, /Plan for repetisjon/);
  assert.match(html, /Egenvurdering/);
  assert.match(html, /Utdanningsdirektoratet/);
  assert.match(html, /17\. august 2026/);
  assert.match(html, /role="status"/);
  assert.match(html, /Oppsummerings-PDF/);
  assert.doesNotMatch(html, /href="[^"]*kort-fortalt\.pdf"/);
});

test("renders every public information route", async () => {
  for (const pathname of ["/laereverk", "/lange-linjer", "/begreper", "/tidslinje", "/laerere", "/om"]) {
    const response = await render(pathname);
    assert.equal(response.status, 200, pathname);
    const html = await response.text();
    assert.match(html, /Historie i sammenheng/, pathname);
  }
});

test("all internal page links render and every linked public file exists", async () => {
  const hrefs = new Set();
  for (const pathname of publicRoutes) {
    const response = await render(pathname);
    const html = await response.text();
    for (const match of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) hrefs.add(match[1]);
  }

  for (const href of hrefs) {
    if (href.startsWith("#")) continue;
    const url = new URL(href, "http://localhost");
    if (url.origin !== "http://localhost") continue;
    if (/\.(?:pdf|docx?|png|jpe?g|webp|svg)$/i.test(url.pathname)) {
      assert.equal(existsSync(join(projectRoot, "public", url.pathname.slice(1))), true, `Mangler offentlig fil: ${url.pathname}`);
      continue;
    }
    const response = await render(url.pathname);
    assert.equal(response.status, 200, `Brutt intern lenke: ${url.pathname}`);
  }
});
