/**
 * Embedded Sanity Studio at /studio.
 * The catch-all segment lets Studio handle its own internal routing.
 * Studio runtime is split into a Client Component (Studio.tsx) so this server
 * page can export Studio's metadata/viewport.
 */

import Studio from "./Studio";

export const dynamic = "force-static";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  return <Studio />;
}
