import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const projectRoot = process.cwd();
const distributionRoot = resolve(projectRoot, "dist");
const workerUrl = pathToFileURL(resolve(distributionRoot, "server/index.js")).href;
const { default: worker } = await import(workerUrl);

const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Unable to render homepage: ${response.status}`);
}

const clientRoot = resolve(distributionRoot, "client");
await mkdir(clientRoot, { recursive: true });
await writeFile(resolve(clientRoot, "index.html"), await response.text());
await writeFile(resolve(clientRoot, ".nojekyll"), "");
