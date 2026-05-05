// Re-capture home at 4K only, with a longer wait so the hero video has time
// to decode a non-black frame. Also captures a scrolled view to inspect body
// sections (which is where the new 4xl container widening shows up).
import { chromium } from "playwright";
import { resolve } from "path";

const OUT = resolve("scripts/qa-screens-4k-final");
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 3840, height: 2160 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto("http://localhost:3000/", { waitUntil: "networkidle", timeout: 45000 });
await page.waitForTimeout(2500);
await page.evaluate(() => document.querySelectorAll("video").forEach((v) => v.pause()));
await page.waitForTimeout(300);
await page.screenshot({ path: `${OUT}/home_4k_v2.jpg`, type: "jpeg", quality: 70, fullPage: false });
// Scroll past hero to the first body section
await page.evaluate(() => window.scrollTo(0, window.innerHeight + 200));
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/home_4k_scrolled.jpg`, type: "jpeg", quality: 70, fullPage: false });
// Scroll further to see another body section
await page.evaluate(() => window.scrollTo(0, window.innerHeight * 2.5));
await page.waitForTimeout(800);
await page.screenshot({ path: `${OUT}/home_4k_scrolled2.jpg`, type: "jpeg", quality: 70, fullPage: false });
await page.close();
await ctx.close();
await browser.close();
console.log("done");
