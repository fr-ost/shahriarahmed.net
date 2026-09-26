import {
  Blocks,
  BookOpenText,
  BotMessageSquare,
  Building2,
  ChartCandlestick,
  CodeXml,
  FlaskConical,
  Handshake,
  Mail,
  MapPin,
  Megaphone,
  Microscope,
  MousePointerClick,
  Puzzle,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ComponentType } from "react";
import type { IconKey, SocialId } from "@/lib/types";
import {
  FacebookIcon,
  GitHubIcon,
  GoogleScholarIcon,
  InstagramIcon,
  LinkedInIcon,
  OrcidIcon,
  TelegramIcon,
  WhatsAppIcon,
  XIcon,
} from "./brand-icons";

/** Maps content icon keys (from data/portfolio.ts) to icon components. */
export const contentIcons: Record<IconKey, LucideIcon> = {
  microscope: Microscope,
  flask: FlaskConical,
  building: Building2,
  paper: BookOpenText,
  pin: MapPin,
  chart: ChartCandlestick,
  automation: MousePointerClick,
  bot: BotMessageSquare,
  code: CodeXml,
  blocks: Blocks,
  puzzle: Puzzle,
  handshake: Handshake,
  megaphone: Megaphone,
  workflow: Workflow,
};

type IconComponent = ComponentType<{ size?: number; className?: string }>;

function MailIcon({ size = 18, className }: { size?: number; className?: string }) {
  return <Mail size={size} className={className} strokeWidth={1.75} aria-hidden="true" />;
}

export const socialIcons: Record<SocialId, IconComponent> = {
  scholar: GoogleScholarIcon,
  orcid: OrcidIcon,
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  x: XIcon,
  email: MailIcon,
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
};
