"use client";

import { VisualEditing } from "@sanity/visual-editing/react";

/**
 * Client-only wrapper for the Visual Editing overlay.
 *
 * @sanity/visual-editing/react's `<VisualEditing />` reads from React Context,
 * so it can't be rendered directly inside a server component. Mounting it
 * through this client wrapper keeps the layout async-safe.
 */
export default function VisualEditingTrigger() {
  return <VisualEditing portal />;
}
