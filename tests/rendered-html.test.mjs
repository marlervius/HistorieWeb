import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { createServer } from "node:net";
import test from "node:test";
import { fileURLToPath } from "node:url";

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

let baseUrl;
let serverProcess;
let serverOutput = "";

async function getFreePort() {
  const server = createServer();
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const { port } = server.address();
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
  return port;
}

async function startProductionServer() {
  const port = await getFreePort();
  const nextCli = join(projectRoot, "node_modules", "next", "dist", "bin", "next");
  serverProcess = spawn(process.execPath, [nextCli, "start", "--hostname", "127.0.0.1", "--port", String(port)], {
    cwd: projectRoot,
    env: { ...process.env, NEXT_TELEMETRY_DISABLED: "1" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  serverProcess.stdout.on("data", (chunk) => { serverOutput += chunk; });
  serverProcess.stderr.on("data", (chunk) => { serverOutput += chunk; });
  baseUrl = `http://127.0.0.1:${port}`;

  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (serverProcess.exitCode !== null) {
      throw new Error(`Next.js-serveren stoppet før den svarte:\n${serverOutput}`);
    }
    try {
      const response = await fetch(baseUrl);
      if (response.status >= 200 && response.status < 500) return;
    } catch {
      // Serveren bruker normalt noen hundre millisekunder på å starte.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Next.js-serveren svarte ikke innen tidsfristen:\n${serverOutput}`);
}

test.before(async () => {
  await startProductionServer();
});

test.after(async () => {
  if (!serverProcess || serverProcess.exitCode !== null) return;
  serverProcess.kill();
  await new Promise((resolve) => serverProcess.once("exit", resolve));
});

async function render(pathname) {
  return fetch(new URL(pathname, baseUrl));
}

test("renders the public homepage", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Historie i sammenheng/);
  assert.match(html, /Fakta gir oss punktene/);
  assert.match(html, /Jordbruksrevolusjonen/);
  assert.match(html, /https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?\/og\.png/);
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
  assert.match(html, /20\. august 2026/);
  assert.match(html, /Kildehenvisning/);
  assert.match(html, /Øv på nytt/);
  assert.match(html, /self-assessment-status/);
  assert.match(html, /role="status"/);
  assert.match(html, /Oppsummerings-PDF/);
  assert.doesNotMatch(html, /href="[^"]*kort-fortalt\.pdf"/);
});

test("renders every public information route", async () => {
  for (const pathname of publicRoutes.slice(1)) {
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
    const url = new URL(href, baseUrl);
    if (url.origin !== baseUrl) continue;
    if (/\.(?:pdf|docx?|png|jpe?g|webp|svg)$/i.test(url.pathname)) {
      assert.equal(existsSync(join(projectRoot, "public", url.pathname.slice(1))), true, `Mangler offentlig fil: ${url.pathname}`);
      continue;
    }
    const response = await render(url.pathname);
    assert.equal(response.status, 200, `Brutt intern lenke: ${url.pathname}`);
  }
});
