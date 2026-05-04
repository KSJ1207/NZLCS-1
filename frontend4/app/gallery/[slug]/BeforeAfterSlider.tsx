"use client";

import { useCallback, useRef, useState } from "react";

type Props = { before?: string; after?: string };

export default function BeforeAfterSlider({ before, after }: Props) {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    setPos(Math.min(100, Math.max(0, ratio * 100)));
  }, []);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    updateFromClientX(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setPos((p) => Math.max(0, p - 2));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setPos((p) => Math.min(100, p + 2));
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      className="relative aspect-[16/9] w-full select-none touch-none overflow-hidden border border-border bg-surface cursor-ew-resize"
    >
      {/* BEFORE layer — full background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundColor: "var(--surface-rust)",
          backgroundImage: before ? `url(${before})` : undefined,
        }}
      >
        <span className="absolute left-4 top-4 bg-background/70 px-2 py-1 type-micro text-foreground">
          Before
        </span>
      </div>

      {/* AFTER layer — clipped from the left by `pos`% */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      >
        <div
          className="absolute inset-0 bg-surface bg-cover bg-center"
          style={{
            backgroundImage: after ? `url(${after})` : undefined,
          }}
        />
        <span className="absolute right-4 top-4 bg-background/70 px-2 py-1 type-micro text-foreground">
          After
        </span>
      </div>

      {!before && !after && (
        <span className="absolute bottom-4 right-4 bg-background/70 px-2 py-1 type-micro text-muted">
          {"// Photo to be provided"}
        </span>
      )}

      {/* Divider line */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 w-px bg-brand"
        style={{ left: `${pos}%` }}
      />

      {/* Handle */}
      <button
        type="button"
        role="slider"
        aria-label="Before/after image comparison"
        aria-valuenow={Math.round(pos)}
        aria-valuemin={0}
        aria-valuemax={100}
        onKeyDown={onKeyDown}
        className="absolute top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-brand text-on-brand ring-8 ring-brand/15 hover:bg-brand-light focus:outline-none focus-visible:ring-brand/30"
        style={{ left: `${pos}%` }}
      >
        <span aria-hidden="true" className="text-sm font-bold">
          ⇄
        </span>
      </button>
    </div>
  );
}
