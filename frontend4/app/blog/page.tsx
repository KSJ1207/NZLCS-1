import type { Metadata } from "next";
import Link from "next/link";
import ScrollToTop from "../components/ScrollToTop";
import BlogList from "./BlogList";
import { sanityFetch } from "../../sanity/lib/fetch";
import {
  allPostsQuery,
  postCategoriesQuery,
} from "../../sanity/lib/queries";
import type { CategoryOption, PostCard } from "../../sanity/lib/types";

export const metadata: Metadata = {
  title: "Blog & Resources — NZLCS",
  description:
    "Technical articles, project case studies, and practical advice from New Zealand's laser cleaning specialists.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, categories] = await Promise.all([
    sanityFetch<PostCard[]>({
      query: allPostsQuery,
      tags: ["post"],
    }),
    sanityFetch<CategoryOption[]>({
      query: postCategoriesQuery,
      tags: ["category"],
    }),
  ]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans">
      <ScrollToTop />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border pt-[120px] md:pt-[160px] lg:pt-[180px] pb-16 md:pb-24 lg:pb-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(to right,var(--brand) 1px,transparent 1px),linear-gradient(to bottom,var(--brand) 1px,transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 55% 70% at 80% 50%,rgba(var(--brand-rgb) / 0.06) 0%,transparent 65%)",
          }}
        />
        <div className="container-page relative z-10">
          <p className="mb-3 type-eyebrow">
            Blog &amp; Resources
          </p>
          <h1 className="type-title-xl">
            Insights, Updates &amp; Industry Know-How
          </h1>
          <p className="mt-6 max-w-2xl type-body">
            Technical articles, project case studies, and practical advice from
            New Zealand&apos;s laser cleaning specialists.
          </p>
        </div>
      </section>

      <BlogList posts={posts} categories={categories} />

      {/* BOTTOM CTA */}
      <section className="border-t border-border">
        <div className="container-page py-16 md:py-20 lg:py-24 2xl:py-28 3xl:py-36 text-center">
          <p className="mb-3 type-eyebrow">
            Ready To Start?
          </p>
          <h2 className="type-title-lg">
            Get a free quote.
          </h2>
          <p className="mx-auto mt-5 max-w-xl type-body">
            Tell us about your site, your surfaces, and your timeline. We&apos;ll
            come back with a clear scope, a fixed price, and a date.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-brand px-10 py-4 type-micro text-on-brand hover:bg-brand-light"
          >
            Request a Quote
          </Link>
        </div>
      </section>
    </div>
  );
}
