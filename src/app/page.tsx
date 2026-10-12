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
import { products } from "@/content";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Walkover — Communication, Automation & AI Software Since 2010",
  absoluteTitle: true,
  description:
    "Walkover builds MSG91, Giddh, viaSocket, DocStar, Things of Brand, GTWY AI, 50 Agents and Embarko: communication, automation and AI products for businesses worldwide.",
  path: "/",
});

type Square = {
  key: string;
  id?: string;
  render: () => ReactNode;
};

/**
 * The homepage is a game board. Each section is a square on one
 * continuous track, and the Walkover die rolls along it as you scroll.
 * Product squares are printed in each product's exact brand colour.
 */
export default function HomePage() {
  const squares: Square[] = [
    { key: "intro", id: "who-we-are", render: () => <IntroSquare /> },
    ...products.map((p, i) => ({
      key: p.slug,
      render: () => <ProductSquare product={p} index={i} />,
    })),
    { key: "build", render: () => <BuildSquare /> },
    { key: "problems", render: () => <ProblemSquare /> },
    { key: "story", render: () => <StorySquare /> },
    { key: "culture", render: () => <CultureSquare /> },
    { key: "notes", render: () => <NotesSquare /> },
  ];

  return (
    <Board>
      <BoardStep side="left" label="Start" markerLast lane={<BrandMark />}>
        <HeroSquare />
      </BoardStep>

      {squares.map((sq, i) => (
        <BoardStep
          key={sq.key}
          id={sq.id}
          side={i % 2 === 0 ? "right" : "left"}
        >
          {sq.render()}
        </BoardStep>
      ))}

      <BoardStep
        side="center"
        label="Home"
        home={products.map((p) => p.brand.color)}
        lane={<HomeCaption />}
      />
    </Board>
  );
}
