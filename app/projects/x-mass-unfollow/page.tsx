import type { Metadata } from "next";
import { ProductCta } from "@/components/product/product-cta";
import { ProductHero } from "@/components/product/product-hero";
import {
  FaqList,
  FeatureGrid,
  PrivacyDetails,
  ProductSection,
  SpeedPresets,
  Spotlight,
  Steps,
  WhatsNew,
} from "@/components/product/product-sections";
import { Donations, SupportOptions } from "@/components/product/product-support";
import { KeepExploring } from "@/components/sections/explore";
import { JsonLd } from "@/components/seo/json-ld";
import { pages, site } from "@/data/portfolio";
import { xMassUnfollow as product } from "@/data/x-mass-unfollow";
import { buildPageJsonLd, faqNode, softwareId, softwareNode } from "@/lib/json-ld";
import { pageMetadata } from "@/lib/metadata";

const page = pages.xMassUnfollow;
const parents = [pages.projects];
const policyHref = pages.xMassUnfollowPrivacy.href;

export const metadata: Metadata = pageMetadata(page, { image: product.shareImage });

export default function XMassUnfollowPage() {
  const [reviewAndPick, safePacing, dashboard, privacy] = product.spotlights;
  const software = { "@id": softwareId(page) };

  return (
    <>
      <JsonLd
        data={buildPageJsonLd({
          page,
          parents,
          type: "ItemPage",
          about: software,
          mainEntity: software,
          image: product.hero,
          nodes: [softwareNode(product, page), faqNode(page, product.faqs)],
        })}
      />
      <ProductHero page={page} parents={parents} product={product} tourHref="#how-it-works" />

      <ProductSection
        id="how-it-works"
        eyebrow="How it works"
        title="Scan. Review. Relax."
        description="Three steps — then it works on its own, in the background."
      >
        <Steps steps={product.steps} />
      </ProductSection>

      <ProductSection
        id="features"
        eyebrow="Features"
        title="Everything you need to clean up who you follow"
        description="Every feature is free and unlimited, with no sign-up and no premium tier."
      >
        <FeatureGrid features={product.features} />
      </ProductSection>

      <Spotlight spotlight={reviewAndPick} />
      <Spotlight spotlight={safePacing} reverse>
        <SpeedPresets presets={product.presets} note={product.presetsNote} />
      </Spotlight>
      <Spotlight spotlight={dashboard} />
      <Spotlight spotlight={privacy} reverse>
        <PrivacyDetails
          adsNote={product.adsNote}
          permissions={product.permissions}
          policyHref={policyHref}
        />
      </Spotlight>

      <ProductSection
        id="whats-new"
        layout="split"
        eyebrow={`Version ${product.version}`}
        title="What’s new"
      >
        <WhatsNew items={product.whatsNew} />
      </ProductSection>

      <ProductSection
        id="faq"
        layout="split"
        eyebrow="FAQ"
        title="Questions & answers"
        description={`Common questions about ${product.name}, answered.`}
      >
        <FaqList faqs={product.faqs} support={product.support} />
      </ProductSection>

      <ProductSection
        id="support"
        eyebrow="Support"
        title="Help, feedback & donations"
        description={`${product.name} is free forever, and built and supported by one developer at Unique Labs.`}
      >
        <SupportOptions product={product} pageUrl={`${site.url}${page.href}`} />
        <Donations product={product} />
      </ProductSection>

      <ProductCta product={product} policyHref={policyHref} />
      <KeepExploring current={page.href} />
    </>
  );
}
