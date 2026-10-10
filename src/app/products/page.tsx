import type { Metadata } from "next";
import { families, ProductCount, products } from "@/content";
import type { Family } from "@/content/types";
import { PageHero } from "@/components/sections/PageHero";
import { ProductCard } from "@/components/sections/Cards";
import { ProductUniverse } from "@/components/home/ProductUniverse";
import { universeItems } from "@/components/home/universe-data";
import { JsonLd } from "@/components/ui/JsonLd";
import { pageMeta } from "@/lib/seo";
import { collectionSchema } from "@/lib/schema";
import styles from "../listing.module.css";

export const metadata: Metadata = pageMeta({
  title: "Walkover Products — MSG91, viaSocket, Giddh, GTWY AI & More",
  absoluteTitle: true,
  description:
    "Explore Walkover's products: MSG91 communication APIs, viaSocket AI automation, Giddh accounting, GTWY AI agents, 50 Agents, DocStar docs and Things of Brand.",
  path: "/products",
});

export default function ProductsPage() {
  const order = Object.keys(families) as Family[];
  return (
    <>
      <PageHero
        crumbs={[{ name: "Products", path: "/products" }]}
        eyebrow="Products"
        title={`${ProductCount} products, built to work alone and better together.`}
        lead="Each product solves one hard problem properly. Underneath, they share infrastructure, ideas and in several cases each other."
      />

      {order.map((f) => {
        const list = products.filter((p) => p.family === f);
        if (!list.length) return null;
        return (
          <section key={f} className={`section-tight ${styles.group}`} aria-labelledby={`fam-${f}`}>
            <div className="container">
              <div className={styles.groupHead} data-reveal>
                <h2 id={`fam-${f}`} className="t-h3">
                  {families[f].label}
                </h2>
                <p className="t-muted">{families[f].description}</p>
              </div>
              <div className={styles.grid}>
                {list.map((p, i) => (
                  <ProductCard key={p.slug} product={p} index={i} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

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
