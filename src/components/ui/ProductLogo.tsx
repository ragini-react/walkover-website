import Image from "next/image";
import type { Product } from "@/content/types";
import { withBasePath } from "@/lib/base-path";
import styles from "./ProductLogo.module.scss";

/**
 * A product's own logo mark on a small white tile, so every mark reads the
 * same on light, dark and brand-coloured surfaces. Decorative: it always sits
 * beside the product's name. Size it with `--logo-size` on it or a parent (default 1.5em).
 */
export function ProductLogo({ product, className }: { product: Pick<Product, "logo">; className?: string }) {
  return (
    <span className={`${styles.tile} ${className ?? ""}`} aria-hidden="true">
      <Image src={withBasePath(product.logo)} width={64} height={64} alt="" className={styles.img} />
    </span>
  );
}
