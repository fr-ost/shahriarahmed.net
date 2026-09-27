import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";
import { isExternalHref } from "@/lib/utils";

type SmartLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

/**
 * Anchor that opens external URLs in a new tab (with safe `rel`) and tells
 * screen-reader users when a link leaves the site. Links to other pages of
 * the site use client-side navigation; in-page and mailto links behave
 * normally.
 */
export function SmartLink({ href, children, ...props }: SmartLinkProps) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }

  const external = isExternalHref(href);

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
    </a>
  );
}
