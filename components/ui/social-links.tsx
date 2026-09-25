import { socialIcons } from "@/components/icons";
import type { SocialLink } from "@/lib/types";
import { cn } from "@/lib/utils";
import { SmartLink } from "./smart-link";

interface SocialLinksProps {
  links: SocialLink[];
  className?: string;
  size?: "sm" | "md";
}

/** Compact row of icon-only social links. */
export function SocialLinks({ links, className, size = "md" }: SocialLinksProps) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {links.map((link) => {
        const Icon = socialIcons[link.id];
        return (
          <li key={link.id}>
            <SmartLink
              href={link.href}
              aria-label={
                link.id === "email" ? `Email ${link.handle}` : `${link.label} — ${link.handle}`
              }
              title={link.label}
              className={cn(
                "inline-flex items-center justify-center rounded-full text-muted transition-[color,background-color,transform] duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-subtle hover:text-fg",
                size === "sm" ? "size-9" : "size-10",
              )}
            >
              <Icon size={size === "sm" ? 16 : 18} />
            </SmartLink>
          </li>
        );
      })}
    </ul>
  );
}
