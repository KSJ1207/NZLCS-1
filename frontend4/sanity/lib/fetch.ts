import { draftMode } from "next/headers";
import type { QueryParams } from "next-sanity";
import { client } from "./client";
import { readToken } from "../env";

/**
 * Server-only fetch wrapper.
 *
 * - Default: published-only via the CDN, ISR with `revalidate: 60` and route-level tags
 *   so a Sanity webhook can later call `revalidateTag(tag)` for instant updates.
 * - Draft mode: bypass cache, fetch drafts with the read token, enable stega so the
 *   Visual Editing overlay can map text in the rendered page back to its source field.
 *
 * Tags are conventional: 'post' for any post change, `post:<slug>` for a specific one,
 * same for 'project'. Configure your Sanity GROQ-powered webhook to send these.
 */
export async function sanityFetch<T>({
  query,
  params = {},
  tags = [],
  revalidate = 60,
}: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  revalidate?: number;
}): Promise<T> {
  const { isEnabled: isDraft } = await draftMode();

  if (isDraft) {
    if (!readToken) {
      throw new Error(
        "Draft mode is enabled but SANITY_API_READ_TOKEN is not set. Add it to .env.local.",
      );
    }
    return client
      .withConfig({
        token: readToken,
        useCdn: false,
        perspective: "previewDrafts",
        stega: { enabled: true, studioUrl: "/studio" },
      })
      .fetch<T>(query, params, {
        cache: "no-store",
      });
  }

  return client.fetch<T>(query, params, {
    next: { revalidate, tags },
  });
}
