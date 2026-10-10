import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Board, BoardStep } from "@/components/board/Board";
import {
  BuildSquare,
  CultureSquare,
  HeroSquare,
  HomeCaption,
  IntroSquare,
  NotesSquare,
  ProblemSquare,
  ProductSquare,
  StorySquare,
} from "@/components/board/Squares";
import { BrandMark } from "@/components/visuals/BrandMark";
import { brandInk, products } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Walkover — Communication, Automation & AI Software Since 2010",
  absoluteTitle: true,
  description:
    "Walkover builds MSG91, viaSocket, Giddh, GTWY AI, DocStar, 50 Agents and Things of Brand: communication, automation and AI products for businesses worldwide.",
  path: "/",
});

type Square = {
  key: string;
  id?: string;
  color?: string;
  ink?: string;
  render: (n: string) => ReactNode;
};

/**
 * The homepage is a game board. Each section is a numbered square on one
 * continuous track, and the Walkover die rolls along it as you scroll.
 * Product squares are printed in each product's exact brand colour.
 */
export default function HomePage() {
  const squares: Square[] = [
    { key: "intro", id: "who-we-are", render: (n) => <IntroSquare n={n} /> },
    ...products.map((p, i) => ({
      key: p.slug,
      color: p.brand.color,
      ink: brandInk(p.brand),
      render: (n: string) => <ProductSquare product={p} n={n} index={i} />,
    })),
    { key: "build", render: (n) => <BuildSquare n={n} /> },
    { key: "problems", render: (n) => <ProblemSquare n={n} /> },
    { key: "story", render: (n) => <StorySquare n={n} /> },
    { key: "culture", render: (n) => <CultureSquare n={n} /> },
    { key: "notes", render: (n) => <NotesSquare n={n} /> },
  ];

  return (
    <Board>
      <BoardStep side="left" label="Start" markerLast lane={<BrandMark />}>
        <HeroSquare />
      </BoardStep>

      {squares.map((sq, i) => {
        const n = String(i + 1).padStart(2, "0");
        return (
          <BoardStep
            key={sq.key}
            id={sq.id}
            side={i % 2 === 0 ? "right" : "left"}
            label={n}
            color={sq.color}
            ink={sq.ink}
          >
            {sq.render(n)}
          </BoardStep>
        );
      })}

      <BoardStep
        side="center"
        label="Home"
        home={products.map((p) => p.brand.color)}
        lane={<HomeCaption />}
      />
    </Board>
  );
}
