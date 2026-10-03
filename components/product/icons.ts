import {
  AppWindow,
  FileSpreadsheet,
  History,
  ListFilter,
  Lock,
  OctagonX,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  SunMoon,
  Timer,
  UserMinus,
  type LucideIcon,
} from "lucide-react";
import type { ProductIconKey } from "@/lib/types";

/** Maps product feature icon keys (from data/) to icon components. */
export const productIcons: Record<ProductIconKey, LucideIcon> = {
  scan: ScanSearch,
  unfollow: UserMinus,
  filter: ListFilter,
  shield: ShieldCheck,
  rules: SlidersHorizontal,
  background: AppWindow,
  pacing: Timer,
  history: History,
  csv: FileSpreadsheet,
  lock: Lock,
  theme: SunMoon,
  stop: OctagonX,
};
