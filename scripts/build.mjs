import { copyFile, mkdir, readFile, rm } from "node:fs/promises";
import { accessSync, constants } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = resolve(root, "dist");
const requiredFiles = ["index.html", "styles.css", "app.js", ".nojekyll"];
const optionalFiles = ["og.png"];

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const file of requiredFiles) {
  accessSync(resolve(root, file), constants.R_OK);
  await copyFile(resolve(root, file), resolve(dist, file));
}

for (const file of optionalFiles) {
  try {
    accessSync(resolve(root, file), constants.R_OK);
    await copyFile(resolve(root, file), resolve(dist, file));
  } catch {
    console.warn(`Optional asset not present in this checkout: ${file}`);
  }
}

const html = await readFile(resolve(dist, "index.html"), "utf8");
for (const reference of ["./styles.css", "./app.js"]) {
  if (!html.includes(reference)) throw new Error(`Missing required reference: ${reference}`);
}

console.log(`Built ${requiredFiles.length} required static files in ${dist}`);
