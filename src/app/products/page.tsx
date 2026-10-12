import type { Metadata } from "next";
import { ProductCount, products } from "@/content";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCard } from "@/components/sections/Cards";
import { ProductUniverse } from "@/components/home/ProductUniverse";
import { universeItems } from "@/components/home/universe-data";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import { collectionSchema } from "@/lib/schema";
import styles from "../listing.module.scss";

export const metadata: Metadata = pageMeta({
  title: "Walkover Products — MSG91, Giddh, viaSocket, DocStar & More",
  absoluteTitle: true,
  description:
    "Explore Walkover's products in the order we built them: MSG91 communication APIs, Giddh accounting, viaSocket AI automation, DocStar docs, Things of Brand images, GTWY AI agents, 50 Agents and Embarko hosting.",
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Products", path: "/products" }]}
        eyebrow="Products"
        title={`${ProductCount} products, built to work alone and better together.`}
        lead="Each product solves one hard problem properly. Underneath, they share infrastructure, ideas and in several cases each other."
      />

      <section className={`section-tight ${styles.group}`} aria-labelledby="launch-title">
        <div className="container">
          <div className={styles.groupHead} data-reveal>
            <h2 id="launch-title" className="t-h3">
              In the order we built them
            </h2>
            <p className="t-muted">
              {products[0].name} came first. Each product after it is listed in the order it followed, up to{" "}
              {products[products.length - 1].name}, the newest.
            </p>
          </div>
          <div className={styles.grid}>
            {products.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} launch={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <section className="section surface-dark" aria-labelledby="map-title">
        <div className="container">
          <div className={styles.groupHead} data-reveal>
            <p className="eyebrow">How they connect</p>
            <h2 id="map-title" className="t-h2">
              Every line on this map is a real connection.
            </h2>
          </div>
          <ProductUniverse items={universeItems()} />
        </div>
      </section>


      <JsonLd
        data={collectionSchema(
          "Walkover products",
          "/products",
          products.map((p) => ({ name: p.name, path: `/products/${p.slug}` })),
        )}
      />
    </>
  );
}
