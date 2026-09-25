/**
 * StructuredData.tsx
 * Injects JSON-LD structured data for Google, AI agents, and screen readers.
 * Supports: Organization, LocalBusiness, SoftwareApplication, WebPage, BreadcrumbList
 */

interface Props {
  type: "home" | "services" | "work" | "about" | "contact";
}

const BASE_URL = "https://avenore.tech";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": `${BASE_URL}/#organization`,
  name: "Avenore Studio",
  alternateName: "Avenore Tech",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  image: `${BASE_URL}/logo.png`,
  description:
    "Premium mobile app engineering studio based in Kuwait City, specializing in Flutter cross-platform apps, iOS, Android, and backend cloud systems for GCC founders and enterprise teams.",
  foundingDate: "2026",
  email: "contact@avenore.tech",
  telephone: "+96567634440",
  priceRange: "$$$$",
  currenciesAccepted: "KWD, AED, SAR, QAR, USD",
  paymentAccepted: "Invoice, Bank Transfer",
  areaServed: [
    { "@type": "Country", name: "Kuwait" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "Saudi Arabia" },
    { "@type": "Country", name: "Qatar" },
    { "@type": "Country", name: "Bahrain" },
    { "@type": "Country", name: "Oman" },
    { "@type": "AdministrativeArea", name: "GCC Region" },
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kuwait City",
    addressCountry: "KW",
    addressRegion: "Al Asimah",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "29.3759",
    longitude: "47.9774",
  },
  sameAs: [
    "https://linkedin.com/company/avenore",
    "https://twitter.com/avenorestudio",
  ],
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "29.3759",
      longitude: "47.9774",
    },
    geoRadius: "5000000",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mobile App Engineering Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Flutter Cross-Platform App Development",
          description:
            "Production-grade iOS and Android apps built with Flutter, delivering 120 FPS performance for GCC markets.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Backend Cloud Infrastructure",
          description:
            "Distributed PostgreSQL, real-time WebSockets, and GCC-compliant zero-downtime cloud architecture.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Venture MVP Development",
          description:
            "Zero-shortcut prototypes shipped in 8–12 weeks to secure institutional seed rounds.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Product Design & UX Engineering",
          description:
            "Tactile micro-animations and RTL-ready mobile interfaces for Arabic and English markets.",
        },
      },
    ],
  },
};

const softwareApplicationSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Avenore Studio – App Engineering",
  applicationCategory: "BusinessApplication",
  operatingSystem: "iOS, Android",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "28",
    bestRating: "5",
    worstRating: "1",
  },
};

const pageSchemas: Record<string, object[]> = {
  home: [
    organizationSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/#webpage`,
      url: BASE_URL,
      name: "Avenore Studio – Premium Mobile App Engineering in Kuwait & GCC",
      description:
        "Kuwait City's leading mobile app engineering studio. We build Flutter iOS & Android apps, backend systems, and digital products for GCC founders and enterprise teams.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: ["h1", "h2", ".hero-description"],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Avenore Studio",
      description: "Premium Mobile App Engineering for GCC Markets",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: ["en", "ar"],
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/work?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
  services: [
    organizationSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/services/#webpage`,
      url: `${BASE_URL}/services`,
      name: "Mobile App Engineering Services – Flutter, iOS, Android & Cloud | Avenore Studio Kuwait",
      description:
        "Full-stack mobile product services in Kuwait: Flutter cross-platform development, iOS native, Android native, backend cloud infrastructure, product design, and venture MVPs for GCC markets.",
      inLanguage: "en",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Services",
            item: `${BASE_URL}/services`,
          },
        ],
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      provider: { "@id": `${BASE_URL}/#organization` },
      name: "Mobile App Development Kuwait",
      description:
        "Expert Flutter, iOS, and Android mobile app development for startups and enterprises in Kuwait, Dubai, Saudi Arabia, and the GCC region.",
      areaServed: [
        { "@type": "Country", name: "Kuwait" },
        { "@type": "Country", name: "United Arab Emirates" },
        { "@type": "Country", name: "Saudi Arabia" },
        { "@type": "Country", name: "Qatar" },
      ],
      serviceType: "Mobile App Development",
    },
  ],
  work: [
    organizationSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/work/#webpage`,
      url: `${BASE_URL}/work`,
      name: "Mobile App Case Studies & Portfolio – Sequifi, FASH, MCC Dubai | Avenore Studio",
      description:
        "Production mobile flagships, digital marketplaces, and enterprise platforms built for GCC markets. Case studies for Sequifi commission management, FASH luxury marketplace, and MCC Dubai.",
      inLanguage: "en",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Work",
            item: `${BASE_URL}/work`,
          },
        ],
      },
    },
  ],
  about: [
    organizationSchema,
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${BASE_URL}/about/#webpage`,
      url: `${BASE_URL}/about`,
      name: "About Avenore Studio – Kuwait's Premier Mobile App Engineering Team",
      description:
        "Learn about Avenore Studio's philosophy, engineering principles, and the senior team behind Kuwait and the GCC's most demanding mobile digital products.",
      inLanguage: "en",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "About",
            item: `${BASE_URL}/about`,
          },
        ],
      },
    },
  ],
  contact: [
    organizationSchema,
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      "@id": `${BASE_URL}/contact/#webpage`,
      url: `${BASE_URL}/contact`,
      name: "Contact Avenore Studio – Start Your Mobile App Project in Kuwait",
      description:
        "Contact Avenore Studio in Kuwait City to discuss your mobile app project, book a discovery call, or send a project brief. Serving GCC, Dubai, Saudi Arabia, and Qatar.",
      inLanguage: "en",
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Contact",
            item: `${BASE_URL}/contact`,
          },
        ],
      },
    },
  ],
};

export default function StructuredData({ type }: Props) {
  const schemas = pageSchemas[type] ?? [organizationSchema];
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}

// Export for use in softwareApplication schema if needed
export { softwareApplicationSchema };
