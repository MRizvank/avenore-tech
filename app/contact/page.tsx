import type { Metadata } from "next";
import ContactPageContent from "@/components/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact Avenore Studio – Start Your Mobile App Project in Kuwait",
  description: "Contact Avenore Studio in Kuwait City to discuss your mobile app project, book a discovery call, or send a project brief. We respond within 24 hours. Serving Kuwait, Dubai, Saudi Arabia, Qatar, and the wider GCC region.",
  alternates: { canonical: "https://avenore.tech/contact" },
  openGraph: {
    title: "Contact Avenore Studio – Kuwait Mobile App Development",
    description: "Start your mobile app project with Kuwait City's leading Flutter engineering studio. GCC-wide delivery.",
    url: "https://avenore.tech/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
