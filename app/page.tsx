import type { Metadata } from "next";
import HomePageContent from "@/components/HomePageContent";

export const metadata: Metadata = {
  title: "Mobile App Development Kuwait – Flutter, iOS & Android Engineers | Avenore Studio",
  description:
    "Kuwait City's #1 mobile app engineering studio. We build Flutter iOS & Android apps, fintech platforms, luxury marketplaces, and backend cloud systems for GCC founders, Dubai startups, and Saudi enterprise teams. 20+ production apps shipped.",
  alternates: {
    canonical: "https://avenore.tech",
  },
  openGraph: {
    title: "Mobile App Development Kuwait – Flutter, iOS & Android Engineers | Avenore Studio",
    description: "Kuwait City's #1 mobile app engineering studio. Flutter, iOS & Android for GCC markets. 20+ production apps shipped.",
    url: "https://avenore.tech",
    type: "website",
  },
};

export default function Home() {
  return <HomePageContent />;
}
