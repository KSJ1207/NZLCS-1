"use client";

import { usePathname } from "next/navigation";

export default function HideOnStudio({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/studio")) return null;
  return <>{children}</>;
}
