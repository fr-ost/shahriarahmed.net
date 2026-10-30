import { ViewTransition, type ReactNode } from "react";

/**
 * Animates moving between pages: the old page fades out quickly and the new
 * one settles in (see `.page` in styles/globals.css). A template remounts on
 * navigation, so its enter and exit animations fire; the header stays put.
 */
export default function Template({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="page" exit="page" default="none">
      {children}
    </ViewTransition>
  );
}
