import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ScrollToTop from "../../components/ScrollToTop";
import PortableText from "../../components/PortableText";
import { SimpleBlogCard } from "../BlogList";
import { client } from "../../../sanity/lib/client";
import { sanityFetch } from "../../../sanity/lib/fetch";
import {
  postBySlugQuery,
  postSlugsQuery,
  relatedPostsQuery,
} from "../../../sanity/lib/queries";
import type { Post, PostCard } from "../../../sanity/lib/types";
import { urlFor } from "../../../sanity/lib/image";

const MONTHS_FULL = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatLongDate(iso: string): string {
  const [y, m, d] = iso.split("-");
  return `${parseInt(d, 10)} ${MONTHS_FULL[parseInt(m, 10) - 1]} ${y}`;
}

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await client.fetch<string[]>(postSlugsQuery);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/blog/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await sanityFetch<Post | null>({
    query: postBySlugQuery,
    params: { slug },
    tags: [`post:${slug}`],
  });
  if (!post) return { title: "Post not found — NZLCS" };
  return {
    title: `${post.title} — NZLCS`,
    description: post.excerpt,
  };
}

export default async function PostPage(props: PageProps<"/blog/[slug]">) {
  const { slug } = await props.params;

  const [post, related] = await Promise.all([
    sanityFetch<Post | null>({
      query: postBySlugQuery,
      params: { slug },
      tags: [`post:${slug}`, "post"],
    }),
    sanityFetch<PostCard[]>({
      query: relatedPostsQuery,
      params: { slug, limit: 3 },
      tags: ["post"],
    }),
  ]);

  if (!post) notFound();

  const tags = [post.category, ...(post.tags ?? [])];

  return (
    <div className="min-h-screen w-full bg-background text-foreground font-sans">
      <ScrollToTop />

      {/* ARTICLE HERO */}
      <section className="relative overflow-hidden border-b border-border pt-[180px] pb-20">
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
              "radial-gradient(ellipse 55% 70% at 80% 0%,rgba(var(--brand-rgb) / 0.06) 0%,transparent 65%)",
          }}
        />
        <div className="relative z-10 mx-auto max-w-[1280px] px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-center">
            <div>
              <p className="mb-4 type-eyebrow">
                Blog
              </p>
              <h1 className="type-title-xl">
                {post.title}
              </h1>

              <dl className="mt-10 border-y border-border">
                <div className="grid grid-cols-[110px_1fr] items-center border-b border-border py-4">
                  <dt className="type-eyebrow text-muted">
                    Tags
                  </dt>
                  <dd className="flex flex-wrap gap-x-3 gap-y-2">
                    {tags.map((t) => (
                      <span
                        key={t}
                        className="type-eyebrow text-foreground"
                      >
                        [{t}]
                      </span>
                    ))}
                  </dd>
                </div>
                <div className="grid grid-cols-[110px_1fr] items-center border-b border-border py-4">
                  <dt className="type-eyebrow text-muted">
                    Published
                  </dt>
                  <dd className="type-micro text-foreground">
                    {formatLongDate(post.date)}
                  </dd>
                </div>
                {post.author ? (
                  <div className="grid grid-cols-[110px_1fr] items-center border-b border-border py-4">
                    <dt className="type-eyebrow text-muted">
                      Author
                    </dt>
                    <dd className="type-micro text-foreground">
                      {post.author}
                    </dd>
                  </div>
                ) : null}
                {post.readTime ? (
                  <div className="grid grid-cols-[110px_1fr] items-center py-4">
                    <dt className="type-eyebrow text-muted">
                      Read Time
                    </dt>
                    <dd className="type-micro text-foreground">
                      {post.readTime}
                    </dd>
                  </div>
                ) : null}
              </dl>

              <Link
                href="/blog"
                className="mt-8 inline-block type-micro text-brand hover:text-brand-dark"
              >
                ← Back to blog
              </Link>
            </div>

            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-border bg-surface">
              {post.coverImage ? (
                <Image
                  src={urlFor(post.coverImage).width(1200).fit("max").auto("format").url()}
                  alt={post.coverImage.alt ?? post.title}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority
                />
              ) : (
                <span className="absolute right-4 top-4 h-2.5 w-2.5 rounded-full bg-brand" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-8 py-20">
          <article className="mx-auto max-w-[680px]">
            <PortableText value={post.body} variant="default" />
          </article>
        </div>
      </section>

      {/* RELATED ARTICLES */}
      {related.length > 0 && (
        <section className="border-t border-border">
          <div className="mx-auto max-w-[1280px] px-8 pt-24 pb-12">
            <p className="mb-3 type-eyebrow">
              Related Articles
            </p>
            <h2 className="type-title-md">
              Keep reading.
            </h2>
          </div>
          <div className="mx-auto max-w-[1280px] px-8 pb-16">
            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {related.map((r) => (
                <SimpleBlogCard key={r.slug} post={r} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BOTTOM CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-[1280px] px-8 py-24 text-center">
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
