// Fresh full 4K pass across every page, both top-of-page and scrolled, so I
// can actually see what's still wrong rather than trusting earlier captures.
import { chromium } from "playwright";
import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const OUT = resolve("scripts/qa-screens-4k-recheck");
if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 3840, height: 2160 }, deviceScaleFactor: 1 });

async function shoot(name, path, scrollY = 0) {
  const page = await ctx.newPage();
  await page.goto("http://localhost:3000" + path, { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(2000);
  await page.evaluate(() => document.querySelectorAll("video").forEach((v) => v.pause()));
  if (scrollY) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(700);
  }
  await page.screenshot({ path: `${OUT}/${name}.jpg`, type: "jpeg", quality: 70, fullPage: false });
  await page.close();
}

// Home: hero + body sections
await shoot("home_top", "/", 0);
await shoot("home_body1", "/", 2400);
await shoot("home_body2", "/", 4800);
await shoot("home_body3", "/", 7200);

// About
await shoot("about_top", "/about", 0);
await shoot("about_body1", "/about", 1500);
await shoot("about_body2", "/about", 3000);

// Services
await shoot("services_top", "/services", 0);
await shoot("services_body", "/services", 1500);

// Service slug
await shoot("service-slug_top", "/services/rust-oxide-removal", 0);
await shoot("service-slug_body", "/services/rust-oxide-removal", 1500);

// Gallery
await shoot("gallery_top", "/gallery", 0);
await shoot("gallery_body", "/gallery", 1500);

// Blog
await shoot("blog_top", "/blog", 0);
await shoot("blog_body", "/blog", 1500);

// Contact
await shoot("contact_top", "/contact", 0);
await shoot("contact_body", "/contact", 1200);

await ctx.close();
await browser.close();
console.log("done");
