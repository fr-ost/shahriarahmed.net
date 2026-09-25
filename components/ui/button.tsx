import { ArrowDown, ArrowRight, ArrowUpRight, Download, Mail } from "lucide-react";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn, isExternalHref } from "@/lib/utils";
import { SmartLink } from "./smart-link";

type Variant = "primary" | "secondary" | "ghost" | "panel" | "panel-outline";
type Size = "sm" | "md" | "lg";
type IconName = "arrow-right" | "arrow-down" | "external" | "download" | "mail" | "none";

const base =
  "group/btn relative inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium select-none " +
  "transition-[background-color,border-color,color,box-shadow,transform] duration-300 ease-smooth active:scale-[0.97] " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "bg-fg text-bg shadow-card hover:bg-fg/85 hover:shadow-float",
  secondary:
    "border border-line-strong bg-elevated/70 text-fg backdrop-blur-sm hover:border-fg/35 hover:bg-elevated",
  ghost: "text-fg hover:text-accent",
  panel: "bg-panel-fg text-panel hover:bg-panel-fg/85",
  "panel-outline":
    "border border-panel-line text-panel-fg hover:border-panel-accent/60 hover:text-panel-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-[0.9375rem] sm:h-[3.25rem] sm:px-7",
};

const ghostSizes: Record<Size, string> = {
  sm: "h-9 text-sm",
  md: "h-11 text-[0.9375rem]",
  lg: "h-12 text-[0.9375rem]",
};

function ButtonIcon({ name }: { name: IconName }) {
  const common = "size-4 transition-transform duration-300 ease-smooth";
  switch (name) {
    case "arrow-right":
      return <ArrowRight aria-hidden className={cn(common, "group-hover/btn:translate-x-0.5")} />;
    case "arrow-down":
      return <ArrowDown aria-hidden className={cn(common, "group-hover/btn:translate-y-0.5")} />;
    case "external":
      return (
        <ArrowUpRight
          aria-hidden
          className={cn(common, "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5")}
        />
      );
    case "download":
      return <Download aria-hidden className={cn(common, "group-hover/btn:translate-y-0.5")} />;
    case "mail":
      return <Mail aria-hidden className={cn(common, "group-hover/btn:-translate-y-px")} />;
    default:
      return null;
  }
}

interface SharedProps {
  variant?: Variant;
  size?: Size;
  /** Trailing icon. External links default to an arrow pointing out. */
  icon?: IconName;
  leadingIcon?: ReactNode;
  className?: string;
  children: ReactNode;
}

function classesFor(variant: Variant, size: Size, className?: string) {
  return cn(
    base,
    variants[variant],
    variant === "ghost" ? ghostSizes[size] : sizes[size],
    className,
  );
}

type ButtonLinkProps = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & { href: string };

export function ButtonLink({
  variant = "primary",
  size = "md",
  icon,
  leadingIcon,
  className,
  children,
  href,
  ...props
}: ButtonLinkProps) {
  const trailing: IconName = icon ?? (isExternalHref(href) ? "external" : "none");

  return (
    <SmartLink href={href} className={classesFor(variant, size, className)} {...props}>
      {leadingIcon}
      <span>{children}</span>
      <ButtonIcon name={trailing} />
    </SmartLink>
  );
}

type ButtonProps = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">;

export function Button({
  variant = "primary",
  size = "md",
  icon = "none",
  leadingIcon,
  className,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={classesFor(variant, size, className)} {...props}>
      {leadingIcon}
      <span>{children}</span>
      <ButtonIcon name={icon} />
    </button>
  );
}
