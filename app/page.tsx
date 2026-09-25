import { About } from "@/components/sections/about";
import { Achievements } from "@/components/sections/achievements";
import { Contact } from "@/components/sections/contact";
import { CvSection } from "@/components/sections/cv";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { IdentityStrip } from "@/components/sections/identity-strip";
import { Projects } from "@/components/sections/projects";
import { Publications } from "@/components/sections/publications";
import { Research } from "@/components/sections/research";
import { Skills } from "@/components/sections/skills";
import { UniqueLabs } from "@/components/sections/unique-labs";
import { getCvLink } from "@/lib/cv";
import { buildJsonLd, serializeJsonLd } from "@/lib/json-ld";

export default function HomePage() {
  const cvLink = getCvLink();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildJsonLd()) }}
      />
      <Hero cvLink={cvLink} />
      <IdentityStrip />
      <About />
      <Research />
      <UniqueLabs />
      <Projects />
      <Experience />
      <Publications />
      <Achievements />
      <Skills />
      <CvSection cvLink={cvLink} />
      <Contact />
    </>
  );
}
