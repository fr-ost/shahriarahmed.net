import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { CvSection } from "@/components/sections/cv";
import { Explore } from "@/components/sections/explore";
import { Hero } from "@/components/sections/hero";
import { IdentityStrip } from "@/components/sections/identity-strip";
import { Publications } from "@/components/sections/publications";
import { Skills } from "@/components/sections/skills";
import { UniqueLabs } from "@/components/sections/unique-labs";
import { getCvLink } from "@/lib/cv";
import { JsonLd } from "@/components/seo/json-ld";
import { buildHomeJsonLd } from "@/lib/json-ld";

export default function HomePage() {
  const cvLink = getCvLink();

  return (
    <>
      <JsonLd data={buildHomeJsonLd()} />
      <Hero cvLink={cvLink} />
      <IdentityStrip />
      <About />
      <UniqueLabs />
      <Explore />
      <Publications />
      <Skills />
      <CvSection cvLink={cvLink} />
      <Contact />
    </>
  );
}
