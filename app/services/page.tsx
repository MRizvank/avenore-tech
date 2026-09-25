import type { Metadata } from "next";
import ServicesPageContent from "@/components/ServicesPageContent";

export const metadata: Metadata = {
  title: "Mobile App Development Services Kuwait – Flutter, iOS, Android & Cloud",
  description:
    "Avenore Studio's full-stack mobile engineering services in Kuwait: Flutter cross-platform apps, iOS native, Android native, backend cloud infrastructure, RTL-ready product design, venture MVPs, and SRE retainers for GCC markets including Dubai, Saudi Arabia, and Qatar.",
  alternates: { canonical: "https://avenore.tech/services" },
  openGraph: {
    title: "Mobile App Development Services Kuwait – Flutter, iOS, Android & Cloud | Avenore Studio",
    description: "Full-stack mobile engineering services in Kuwait for GCC markets. Flutter, iOS, Android, backend cloud, RTL design, and venture MVPs.",
    url: "https://avenore.tech/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return <ServicesPageContent />;
}
