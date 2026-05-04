import { draftMode } from "next/headers";

/**
 * Exit draft mode. Used by the Visual Editing toolbar's "Exit preview" button.
 */
export async function GET() {
  const draft = await draftMode();
  draft.disable();
  return new Response("Draft mode disabled", { status: 200 });
}
