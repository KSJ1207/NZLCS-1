import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * General-purpose draft mode entry point used by Sanity Presentation.
 *
 *   https://<your-host>/api/draft-mode/enable?secret=<SANITY_PREVIEW_SECRET>&path=/about
 *
 * - `path` must be a relative path that starts with "/" — anything else is rejected
 *   to avoid open redirects.
 * - Used by the Presentation tool (sanity.config.ts) to flip draft mode and redirect
 *   the preview iframe to the requested path.
 *
 * The older `/api/draft` route stays in place for back-compat with blog/gallery preview
 * links that already exist in the wild.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const path = searchParams.get("path") ?? "/";

  const expected = process.env.SANITY_PREVIEW_SECRET;
  if (!expected) {
    return new Response("SANITY_PREVIEW_SECRET not configured", { status: 500 });
  }
  if (secret !== expected) {
    return new Response("Invalid token", { status: 401 });
  }
  if (!path.startsWith("/")) {
    return new Response("Path must be a relative URL starting with /", {
      status: 400,
    });
  }

  const draft = await draftMode();
  draft.enable();

  redirect(path);
}
