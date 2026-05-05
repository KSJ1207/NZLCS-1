// Verify Phase 4 (4xl typography + header polish) by capturing the boundary
// triplet on home (2560/3199/3200 — first two must be unchanged, third must
// pick up the new tier) and the most heading-sensitive 4K pages.
import { chromium } from "playwright";
import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const OUT = resolve("scripts/qa-screens-4k-final");
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();

const SHOTS = [
  ["home_2560_v2", 2560, 1440, "/"],
  ["home_3199_v2", 3199, 1800, "/"],
  ["home_3200_v2", 3200, 1800, "/"],
  ["home_4k_v3", 3840, 2160, "/"],
  ["services_4k_v2", 3840, 2160, "/services"],
  ["contact_4k_v2", 3840, 2160, "/contact"],
  ["service-slug_4k_v2", 3840, 2160, "/services/rust-oxide-removal"],
];

for (const [name, w, h, path] of SHOTS) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => document.querySelectorAll("video").forEach((v) => v.pause()));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${OUT}/${name}.jpg`, type: "jpeg", quality: 70, fullPage: false });
  await page.close();
  await ctx.close();
}

await browser.close();
console.log("done");
