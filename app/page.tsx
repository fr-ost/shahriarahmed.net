import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Publications } from "@/components/sections/publications";
import { Ticker } from "@/components/sections/ticker";
import { Work } from "@/components/sections/work";
import { JsonLd } from "@/components/seo/json-ld";
import { getCvLink } from "@/lib/cv";
import { buildHomeJsonLd } from "@/lib/json-ld";

export default function HomePage() {
  return (
    <>
      <JsonLd data={buildHomeJsonLd()} />
      <Hero cvLink={getCvLink()} />
      <Ticker />
      <About />
      <Work />
      <Publications />
      <Contact />
    </>
  );
}
