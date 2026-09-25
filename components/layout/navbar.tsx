"use client";

import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import Link from "next/link";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type MouseEvent,
} from "react";
import { Mark } from "@/components/icons/mark";
import type { NavItem } from "@/lib/types";
import { cn, pad2 } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";

interface NavbarProps {
  items: NavItem[];
  name: string;
  title: string;
  email: string;
}

const ease = [0.22, 1, 0.36, 1] as const;

function subscribeToScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

/** True once the page has scrolled past the threshold. */
function useScrolled(threshold = 24) {
  return useSyncExternalStore(
    subscribeToScroll,
    () => window.scrollY > threshold,
    () => false,
  );
}

/**
 * The navigation item whose section crosses a thin band just above the
 * middle of the viewport. Sections that are not in the nav clear it.
 */
function useActiveSection(items: NavItem[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const ids = items.map((item) => item.id);
    const visible = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        setActive(ids.find((id) => visible.has(id)) ?? null);
      },
      { rootMargin: "-42% 0px -57% 0px" },
    );

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, [items]);

  return active;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function Navbar({ items, name, title, email }: NavbarProps) {
  const scrolled = useScrolled();
  const active = useActiveSection(items);
  const [open, setOpen] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);

  // Slide the active-section pill under the current link.
  useLayoutEffect(() => {
    const list = listRef.current;
    const indicator = indicatorRef.current;
    if (!list || !indicator) return;

    const update = () => {
      const target = active ? list.querySelector<HTMLElement>(`[data-nav-id="${active}"]`) : null;
      if (!target) {
        indicator.style.opacity = "0";
        return;
      }
      indicator.style.opacity = "1";
      indicator.style.width = `${target.offsetWidth}px`;
      indicator.style.transform = `translateX(${target.offsetLeft}px)`;
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => observer.disconnect();
  }, [active]);

  const closeMenu = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // While the menu is open: lock page scroll, trap focus, close on Escape
  // and when the viewport grows to the desktop layout.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    root.setAttribute("data-menu-open", "");

    const header = headerRef.current;
    const focusables = () =>
      Array.from(
        header?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
      ).filter((element) => element.offsetParent !== null);

    const firstLink = header?.querySelector<HTMLElement>("#mobile-menu a[href]");
    firstLink?.focus({ preventScroll: true });

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        return;
      }
      if (event.key !== "Tab") return;
      const elements = focusables();
      if (elements.length === 0) return;
      const first = elements[0];
      const last = elements[elements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) closeMenu(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      root.removeAttribute("data-menu-open");
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open, closeMenu]);

  // Close the menu first so the page can scroll, then move to the section.
  function goToSection(event: MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    document.documentElement.removeAttribute("data-menu-open");
    setOpen(false);
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
      target.focus({ preventScroll: true });
      history.pushState(null, "", `#${id}`);
    });
  }

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <div
        className={cn(
          "relative z-10 mx-auto transition-[max-width,padding,margin] duration-500 ease-smooth",
          scrolled || open
            ? "mt-2.5 max-w-[68rem] px-2.5 sm:mt-3 sm:px-4"
            : "mt-0 max-w-[76rem] px-0",
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "flex items-center justify-between gap-4 rounded-full border transition-[height,background-color,border-color,box-shadow,padding] duration-500 ease-smooth",
            scrolled || open
              ? "h-14 border-line bg-bg/80 pl-4 pr-2 shadow-card backdrop-blur-xl backdrop-saturate-150 sm:pl-5"
              : "h-20 border-transparent bg-transparent px-[clamp(1rem,4vw,3rem)]",
          )}
        >
          <Link href="/#top" className="group/brand flex items-center gap-2.5 rounded-full text-fg">
            <Mark className="size-7 transition-transform duration-700 ease-smooth group-hover/brand:rotate-[60deg]" />
            <span className="flex flex-col leading-none">
              <span className="text-[0.9375rem] font-semibold tracking-tight">{name}</span>
              <span
                className={cn(
                  "eyebrow overflow-hidden text-[0.625rem] text-faint transition-all duration-500 ease-smooth",
                  scrolled ? "mt-0 max-h-0 opacity-0" : "mt-1.5 max-h-4 opacity-100",
                )}
              >
                {title}
              </span>
            </span>
          </Link>

          <div ref={listRef} className="relative hidden items-center lg:flex">
            <span
              ref={indicatorRef}
              aria-hidden
              className="absolute inset-y-0 left-0 my-auto h-8 rounded-full bg-subtle opacity-0 ring-1 ring-line transition-[transform,width,opacity] duration-500 ease-smooth"
            />
            <ul className="flex items-center">
              {items.map((item) => {
                const isActive = active === item.id;
                return (
                  <li key={item.id} data-nav-id={item.id} className="relative">
                    <Link
                      href={`/#${item.id}`}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 xl:px-4",
                        isActive ? "text-fg" : "text-muted hover:text-fg",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              ref={menuButtonRef}
              type="button"
              className="group/menu relative inline-flex size-10 items-center justify-center rounded-full text-fg transition-colors hover:bg-subtle lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((value) => !value)}
            >
              <span aria-hidden className="relative block h-3 w-[1.125rem]">
                <span className="absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-smooth group-aria-expanded/menu:translate-y-[5.25px] group-aria-expanded/menu:rotate-45" />
                <span className="absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-500 ease-smooth group-aria-expanded/menu:-translate-y-[5.25px] group-aria-expanded/menu:-rotate-45" />
              </span>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open ? (
          <m.div
            key="mobile-menu"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="fixed inset-0 z-0 overflow-y-auto overscroll-contain bg-bg lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease } }}
            transition={{ duration: 0.35, ease }}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-grid mask-fade-b opacity-60"
            />
            <div className="container-page relative flex min-h-full flex-col pb-10 pt-28">
              <nav aria-label="Mobile">
                <ul className="flex flex-col">
                  {items.map((item, index) => (
                    <m.li
                      key={item.id}
                      className="border-b border-line"
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6, transition: { duration: 0.15 } }}
                      transition={{ duration: 0.5, delay: 0.06 + index * 0.045, ease }}
                    >
                      <Link
                        href={`/#${item.id}`}
                        onClick={(event) => goToSection(event, item.id)}
                        aria-current={active === item.id ? "true" : undefined}
                        className="group/link flex items-baseline gap-4 py-4 text-fg"
                      >
                        <span className="eyebrow w-6 text-faint group-aria-[current]/link:text-accent">
                          {pad2(index + 1)}
                        </span>
                        <span className="font-serif text-[2.125rem] leading-none tracking-tight transition-transform duration-500 ease-smooth group-hover/link:translate-x-1">
                          {item.label}
                        </span>
                      </Link>
                    </m.li>
                  ))}
                </ul>
              </nav>

              <m.div
                className="mt-auto pt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                transition={{ duration: 0.6, delay: 0.4, ease }}
              >
                <p className="eyebrow text-faint">Get in touch</p>
                <a
                  href={`mailto:${email}`}
                  className="mt-2 inline-block break-all font-serif text-2xl text-fg underline decoration-line-strong underline-offset-[6px] transition-colors hover:decoration-accent"
                >
                  {email}
                </a>
              </m.div>
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
