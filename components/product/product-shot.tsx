"use client";

import { Maximize2, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import type { ImageAsset } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ProductShotProps {
  image: ImageAsset;
  /** Rendered widths, for choosing the image size to download. */
  sizes: string;
  /** Load right away: for the screenshot at the top of the page. */
  eager?: boolean;
  className?: string;
}

/**
 * A product screenshot in a soft device-like frame. Selecting it opens the
 * full-size image in a dialog, which closes with Escape, the close button,
 * or a click outside the image.
 */
export function ProductShot({ image, sizes, eager = false, className }: ProductShotProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const ratio = image.width / image.height;

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={`Enlarge screenshot: ${image.alt}`}
        className={cn(
          "group/shot relative block w-full cursor-zoom-in rounded-[1.75rem] border border-line bg-elevated p-1.5 shadow-float transition-[border-color] duration-300 hover:border-line-strong sm:p-2.5",
          className,
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          quality={90}
          loading={eager ? "eager" : undefined}
          fetchPriority={eager ? "high" : undefined}
          className="h-auto w-full rounded-[1.25rem] bg-subtle ring-1 ring-black/[0.04] dark:brightness-[0.92]"
        />
        <span
          aria-hidden
          className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-full border border-line bg-elevated/90 text-fg opacity-0 shadow-card backdrop-blur-sm transition-opacity duration-300 group-hover/shot:opacity-100 group-focus-visible/shot:opacity-100 sm:right-5 sm:top-5"
        >
          <Maximize2 className="size-4" />
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-label={image.alt}
        className="dialog"
        // Wide enough for the full image, but never taller than the screen.
        style={{
          width: `min(80rem, calc(100% - 2rem), calc((100dvh - 4rem) * ${ratio}))`,
          maxHeight: "none",
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="relative p-2 sm:p-3">
          {/* The original file, loaded only when the dialog opens. */}
          <Image
            src={image.src}
            alt=""
            width={image.width}
            height={image.height}
            unoptimized
            className="h-auto w-full rounded-[1.1rem]"
          />
          <form method="dialog">
            <button
              type="submit"
              aria-label="Close"
              className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-line bg-elevated/90 text-fg shadow-card backdrop-blur-sm transition-colors hover:text-accent sm:right-5 sm:top-5"
            >
              <X aria-hidden className="size-4" />
            </button>
          </form>
        </div>
      </dialog>
    </>
  );
}
