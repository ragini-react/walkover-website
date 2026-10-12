import { Logo } from "@/components/ui/Logo";
import styles from "./BrandMark.module.scss";

/** The official Walkover die, floating gently. Used as the hero visual. */
export function BrandMark({ size }: { size?: string }) {
  return (
    <div className={styles.mark} style={size ? ({ "--size": size } as React.CSSProperties) : undefined}>
      <Logo variant="mark" className={styles.svg} />
    </div>
  );
}
