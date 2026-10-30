"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface TiltProps {
  children: ReactNode;
  className?: string;
  /** Largest rotation, in degrees. */
  max?: number;
}

/**
 * Tilts its content towards the pointer in 3D, easing back on leave. Only
 * for mouse and pen, and not for visitors who prefer reduced motion.
 */
export function Tilt({ children, className, max = 7 }: TiltProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const canTilt =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!canTilt) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        element.style.transform = `perspective(1100px) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) scale3d(1.01, 1.01, 1)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(frame);
      element.style.transform = "";
    };

    element.addEventListener("pointermove", onMove);
    element.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      element.removeEventListener("pointermove", onMove);
      element.removeEventListener("pointerleave", onLeave);
    };
  }, [max]);

  return (
    <div
      ref={ref}
      className={cn(
        "transition-transform duration-500 ease-smooth [transform-style:preserve-3d]",
        className,
      )}
    >
      {children}
    </div>
  );
}
