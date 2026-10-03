import type { ImageAsset, ProductShowcase } from "@/lib/types";

/** Every screenshot of a product, in the order its page shows them. */
export function productScreenshots(product: ProductShowcase): ImageAsset[] {
  return [product.hero, ...product.spotlights.map((spotlight) => spotlight.image)];
}
