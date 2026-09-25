import type { Metadata } from "next";
import AboutPageContent from "@/components/AboutPageContent";

export const metadata: Metadata = {
  title: "About Avenore Studio – Kuwait's Premier Mobile App Engineering Team",
  description: "Avenore Studio is Kuwait City's leading mobile app engineering firm. Learn about our philosophy, senior engineering team, dual-hub operations, and the products we've shipped for Kuwait, Dubai, Saudi Arabia, and GCC enterprise clients.",
  alternates: { canonical: "https://avenore.tech/about" },
  openGraph: {
    title: "About Avenore Studio – Kuwait Mobile App Engineers",
    description: "Kuwait City's leading mobile app engineering studio. Senior Flutter engineers shipping for GCC markets.",
    url: "https://avenore.tech/about",
    type: "website",
  },
};

export default function AboutPage() {
  return <AboutPageContent />;
}
