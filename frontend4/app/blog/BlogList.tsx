"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import FilterChip from "../components/FilterChip";
import { ALL_FILTER, type Filter } from "../../sanity/lib/categories";
import type { CategoryOption, PostCard } from "../../sanity/lib/types";
import { urlFor } from "../../sanity/lib/image";

export default function BlogList({
  posts,
  categories,
}: {
  posts: PostCard[];
  categories: CategoryOption[];
}) {
  const [filter, setFilter] = useState<Filter>(ALL_FILTER);

  const filters = useMemo<Filter[]>(
    () => [ALL_FILTER, ...categories.map((c) => c.title)],
    [categories],
  );

  const visible = useMemo(
    () =>
      filter === ALL_FILTER
        ? posts
        : posts.filter((p) => p.category === filter),
    [filter, posts],
  );

  return (
    <>
      {/* FILTER TABS — bracketed by top + bottom dividers */}
      <div className="border-y border-border">
        <div className="container-page py-5">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((cat) => (
              <FilterChip
                key={cat}
                label={cat}
                active={filter === cat}
                onClick={() => setFilter(cat)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* POST GRID — boxed cards with gaps */}
      <section>
        <div className="container-page py-12">
          {visible.length === 0 ? (
            <div className="py-16 md:py-20 lg:py-24 2xl:py-28 3xl:py-32 text-center">
              <p className="type-body">
                No posts in this category yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visible.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export function BlogCard({ post }: { post: PostCard }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col border border-border bg-background transition-colors hover:border-foreground/40"
    >
      <BlogCoverImage post={post} variant="card" />
      <div className="flex flex-1 flex-col px-6 py-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="type-eyebrow">
            {post.category}
          </span>
          {post.readTime ? (
            <span className="type-eyebrow text-muted">
              {post.readTime}
            </span>
          ) : null}
        </div>
        <h3 className="type-title-sm group-hover:text-brand">
          {post.title}
        </h3>
        <p className="mt-3 flex-1 type-body">
          {post.excerpt}
        </p>
        <span className="mt-6 inline-block type-micro text-foreground underline underline-offset-4 group-hover:text-brand">
          Read article →
        </span>
      </div>
    </Link>
  );
}

function BlogCoverImage({
  post,
  variant,
}: {
  post: PostCard;
  variant: "card" | "standalone";
}) {
  const wrapperClass =
    variant === "card"
      ? "relative aspect-[4/3] w-full overflow-hidden border-b border-border bg-surface"
      : "relative aspect-[4/3] w-full overflow-hidden border border-border bg-surface";

  if (post.coverImage) {
    const src = urlFor(post.coverImage).width(800).fit("max").auto("format").url();
    return (
      <div className={wrapperClass}>
        <Image
          src={src}
          alt={post.coverImage.alt ?? post.title}
          fill
          sizes="(min-width: 768px) 33vw, 100vw"
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div className={wrapperClass}>
      <div className="absolute inset-3 grid place-items-center border border-dashed border-border">
        <span className="type-eyebrow text-muted">
          Image
        </span>
      </div>
    </div>
  );
}

// Simplified card for the Blog detail's "Related Articles" section.
export function SimpleBlogCard({ post }: { post: PostCard }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <BlogCoverImage post={post} variant="standalone" />
      <div className="mt-5 mb-2 flex items-center gap-2">
        <span className="type-eyebrow">
          {post.category}
        </span>
        {post.readTime ? (
          <>
            <span className="text-[11px] text-border" aria-hidden="true">
              ·
            </span>
            <span className="type-eyebrow text-muted">
              {post.readTime}
            </span>
          </>
        ) : null}
      </div>
      <h3 className="type-title-sm group-hover:text-brand">
        {post.title}
      </h3>
    </Link>
  );
}
