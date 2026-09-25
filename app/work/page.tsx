import type { Metadata } from "next";
import WorkPageContent from "@/components/WorkPageContent";

export const metadata: Metadata = {
  title: "Mobile App Portfolio – Sequifi, FASH & MCC Dubai Case Studies",
  description: "Production mobile flagships and enterprise platforms built for Kuwait and GCC markets. Case studies: Sequifi commission management fintech, FASH luxury marketplace, MCC Dubai government compliance app. Built with Flutter, deployed across Kuwait, UAE, and Saudi Arabia.",
  alternates: { canonical: "https://avenore.tech/work" },
  openGraph: {
    title: "Mobile App Portfolio – Kuwait & GCC Case Studies | Avenore Studio",
    description: "Production apps for Kuwait, UAE, and Saudi Arabia. Fintech, luxury commerce, and enterprise platforms built with Flutter.",
    url: "https://avenore.tech/work",
    type: "website",
  },
};

export default function WorkPage() {
  return <WorkPageContent />;
}
