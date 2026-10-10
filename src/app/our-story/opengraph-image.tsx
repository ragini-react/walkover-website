import { ogSize, renderOg } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Our Story: from a hosting shop in Indore to MSG91, Giddh and viaSocket";

export default function Image() {
  return renderOg({
    eyebrow: "Our Story · Walkover",
    title: "From a five-person hosting shop in Indore to MSG91, Giddh and viaSocket.",
  });
}
