"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface Atom {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Radius in CSS pixels. */
  r: number;
  /** Offset for the glow pulse. */
  phase: number;
  /** A larger atom with a pulsing glow. */
  hub: boolean;
}

interface MoleculeFieldProps {
  className?: string;
  /** Multiplier for the number of atoms. */
  density?: number;
}

/** Distance within which atoms bond to the pointer. */
const POINTER_REACH = 180;

/**
 * A living molecular network: atoms drift and bond when they pass close to
 * each other, and bond to the pointer as it moves across. Colours follow the
 * theme (`--molecule-*` in styles/globals.css).
 *
 * It starts once the page is idle, pauses off screen and in background
 * tabs, and draws a single still frame for visitors who prefer reduced
 * motion. Purely decorative.
 */
export function MoleculeField({ className, density = 1 }: MoleculeFieldProps) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const pointer = { x: 0, y: 0, active: false };
    let width = 0;
    let height = 0;
    let atoms: Atom[] = [];
    let colors = { node: "", link: "", glow: "" };
    let frame = 0;
    let inView = true;
    let ready = false;

    const readColors = () => {
      const style = getComputedStyle(canvas);
      const rgb = (name: string) => `rgb(${style.getPropertyValue(name).trim() || "18 163 134"})`;
      colors = {
        node: rgb("--molecule-node"),
        link: rgb("--molecule-link"),
        glow: rgb("--molecule-glow"),
      };
    };

    const spawn = (): Atom => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.08 + Math.random() * 0.2;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: 1 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        hub: Math.random() < 0.14,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.round(Math.min(96, Math.max(24, (width * height) / 15000)) * density);
      atoms = atoms.slice(0, count);
      for (const atom of atoms) {
        atom.x = Math.min(atom.x, width);
        atom.y = Math.min(atom.y, height);
      }
      while (atoms.length < count) atoms.push(spawn());
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const reach = Math.max(90, Math.min(150, width / 8));
      const moving = !reducedMotion.matches;

      if (moving) {
        for (const atom of atoms) {
          atom.x += atom.vx;
          atom.y += atom.vy;
          if (atom.x < -12) atom.x = width + 12;
          else if (atom.x > width + 12) atom.x = -12;
          if (atom.y < -12) atom.y = height + 12;
          else if (atom.y > height + 12) atom.y = -12;
        }
      }

      // Bonds between nearby atoms, fading with distance.
      ctx.lineWidth = 0.8;
      ctx.strokeStyle = colors.link;
      for (let i = 0; i < atoms.length; i++) {
        const a = atoms[i];
        for (let j = i + 1; j < atoms.length; j++) {
          const b = atoms[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > reach) continue;
          ctx.globalAlpha = (1 - distance / reach) * 0.4;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // The pointer acts as one more atom: a soft glow that bonds to its neighbours.
      if (pointer.active && moving) {
        const glow = ctx.createRadialGradient(
          pointer.x,
          pointer.y,
          0,
          pointer.x,
          pointer.y,
          POINTER_REACH,
        );
        glow.addColorStop(0, colors.glow);
        glow.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.12;
        ctx.fillStyle = glow;
        ctx.fillRect(
          pointer.x - POINTER_REACH,
          pointer.y - POINTER_REACH,
          POINTER_REACH * 2,
          POINTER_REACH * 2,
        );

        ctx.lineWidth = 1;
        ctx.strokeStyle = colors.glow;
        for (const atom of atoms) {
          const dx = pointer.x - atom.x;
          const dy = pointer.y - atom.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance > POINTER_REACH) continue;
          ctx.globalAlpha = (1 - distance / POINTER_REACH) * 0.7;
          ctx.beginPath();
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(atom.x, atom.y);
          ctx.stroke();
        }
      }

      // Atoms; hubs pulse with a soft halo.
      for (const atom of atoms) {
        if (atom.hub) {
          const pulse = 0.5 + 0.5 * Math.sin(time * 0.0016 + atom.phase);
          ctx.globalAlpha = 0.1 + pulse * 0.16;
          ctx.fillStyle = colors.glow;
          ctx.beginPath();
          ctx.arc(atom.x, atom.y, atom.r * 5.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 0.95;
          ctx.fillStyle = colors.node;
          ctx.beginPath();
          ctx.arc(atom.x, atom.y, atom.r * 1.7, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.globalAlpha = 0.7;
          ctx.fillStyle = colors.node;
          ctx.beginPath();
          ctx.arc(atom.x, atom.y, atom.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!ready || frame || reducedMotion.matches || !inView || document.hidden) return;
      frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const redraw = () => {
      if (ready && !frame) draw(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      pointer.x = x;
      pointer.y = y;
      pointer.active = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
    };
    const onPointerLeave = () => {
      pointer.active = false;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onMotionChange = () => {
      stop();
      redraw();
      start();
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      redraw();
    });
    const viewObserver = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      if (inView) start();
      else stop();
    });
    const themeObserver = new MutationObserver(() => {
      readColors();
      redraw();
    });

    // Start once the page has settled, so the hero paints first.
    const begin = () => {
      ready = true;
      resize();
      readColors();
      draw(performance.now());
      canvas.dataset.ready = "";
      start();
    };
    // Safari has no requestIdleCallback; a short timeout does the same job.
    const hasIdle = typeof window.requestIdleCallback === "function";
    const idle = hasIdle
      ? window.requestIdleCallback(begin, { timeout: 1500 })
      : setTimeout(begin, 400);

    resizeObserver.observe(canvas);
    viewObserver.observe(canvas);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    document.addEventListener("visibilitychange", onVisibility);
    reducedMotion.addEventListener("change", onMotionChange);
    if (finePointer) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onPointerLeave);
    }

    return () => {
      if (hasIdle) window.cancelIdleCallback(idle as number);
      else clearTimeout(idle);
      stop();
      resizeObserver.disconnect();
      viewObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      reducedMotion.removeEventListener("change", onMotionChange);
      window.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, [density]);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 size-full opacity-0 transition-opacity duration-[1.6s] ease-smooth data-ready:opacity-100",
        className,
      )}
    />
  );
}
