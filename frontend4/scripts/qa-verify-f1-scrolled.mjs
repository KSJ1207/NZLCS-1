// Capture scrolled views to confirm Phase F1 heading wrappers widened
// on home body sections and a 3199 baseline that should be unchanged.
import { chromium } from "playwright";
import { resolve } from "path";

const OUT = resolve("scripts/qa-screens-4k-final");
const browser = await chromium.launch();

async function shoot(name, w, h, path, scrollTo) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(1500);
  await page.evaluate(() => document.querySelectorAll("video").forEach((v) => v.pause()));
  if (scrollTo) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollTo);
    await page.waitForTimeout(700);
  }
  await page.screenshot({ path: `${OUT}/${name}.jpg`, type: "jpeg", quality: 70, fullPage: false });
  await page.close();
  await ctx.close();
}

// Home body at 4K (after F1) — should show widened ServicesPreview/Values headers
await shoot("home_4k_f1_body", 3840, 2160, "/", 2200);
// Home body at 3199 (must be unchanged from previous 3xl baseline)
await shoot("home_3199_f1_body", 3199, 1800, "/", 1850);
// About at 4K — Values icon-card variant header should be wider
await shoot("about_4k_f1", 3840, 2160, "/about", 0);
await shoot("about_4k_f1_scrolled", 3840, 2160, "/about", 1500);
// Gallery at 4K
await shoot("gallery_4k_f1", 3840, 2160, "/gallery", 0);

await browser.close();
console.log("done");
