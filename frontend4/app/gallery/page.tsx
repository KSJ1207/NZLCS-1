import type { Metadata } from "next";
import Link from "next/link";
import ScrollToTop from "../components/ScrollToTop";
import GalleryList from "./GalleryList";
import { sanityFetch } from "../../sanity/lib/fetch";
import {
  allProjectsQuery,
  projectCategoriesQuery,
} from "../../sanity/lib/queries";
import type {
  CategoryOption,
  ProjectCard,
} from "../../sanity/lib/types";

export const metadata: Metadata = {
  title: "Project Gallery — NZLCS",
  description:
    "Real before-and-after results from laser cleaning projects across New Zealand. Browse by service type or scroll through our recent project work.",
};

export const revalidate = 60;

export default async function GalleryPage() {
  const [projects, categories] = await Promise.all([
    sanityFetch<ProjectCard[]>({
      query: allProjectsQuery,
      tags: ["project"],
    }),
    sanityFetch<CategoryOption[]>({
      query: projectCategoriesQuery,
      tags: ["category"],
    }),
  ]);

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans">
      <ScrollToTop />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border pt-[180px] pb-28">
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
              "radial-gradient(ellipse 55% 70% at 20% 50%,rgba(var(--brand-rgb) / 0.06) 0%,transparent 65%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1280px] px-8">
          <p className="mb-3 type-eyebrow">
            Project Gallery
          </p>
          <h1 className="type-title-xl">
            Before &amp; After — Results Speak for Themselves.
          </h1>
          <p className="mt-6 max-w-2xl type-body">
            Real results from real jobs across New Zealand. Browse by service
            type or scroll through our recent project work.
          </p>
        </div>
      </section>

      <GalleryList projects={projects} categories={categories} />

      {/* BOTTOM CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-8 py-24 text-center">
          <p className="mb-3 type-eyebrow">
            Have a similar project?
          </p>
          <h2 className="type-title-lg">
            Send us a photo of the job.
          </h2>
          <p className="mx-auto mt-5 max-w-xl type-body">
            We&apos;ll assess the surface, scope the work, and respond within
            two business days. No obligation — just a straight answer.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-block bg-brand px-10 py-4 type-micro text-on-brand hover:bg-brand-light"
          >
            Get a Free Quote →
          </Link>
        </div>
      </section>
    </div>
  );
}
