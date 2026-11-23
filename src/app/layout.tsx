import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/content";
import { MotionProvider } from "@/components/motion/motion-provider";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const siteUrl = "https://smpn2ambulu.sch.id";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} — Sekolah negeri di Sabrang, Jember`,
    template: `%s — ${site.name}`,
  },
  description:
    "Profil resmi SMP Negeri 2 Ambulu di Sabrang, Jember: visi sekolah, guru, pembelajaran, fasilitas, prestasi, berita, dan informasi SPMB 2026/2027.",
  applicationName: site.name,
  category: "education",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: siteUrl,
    siteName: site.name,
    title: `${site.name} — Sekolah negeri di Sabrang, Jember`,
    description:
      "Profil resmi SMP Negeri 2 Ambulu di Sabrang, Jember: visi sekolah, guru, pembelajaran, fasilitas, prestasi, berita, dan informasi SPMB 2026/2027.",
    images: [
      {
        url: "/logos/og-smpn2ambulu.png",
        width: 1200,
        height: 630,
        alt: "SMP Negeri 2 Ambulu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Sekolah negeri di Sabrang, Jember`,
    description:
      "Profil resmi SMP Negeri 2 Ambulu di Sabrang, Jember: visi sekolah, guru, pembelajaran, fasilitas, prestasi, berita, dan informasi SPMB 2026/2027.",
    images: ["/logos/og-smpn2ambulu.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  icons: {
    icon: "/logos/smpn2ambulu.png",
    apple: "/logos/smpn2ambulu.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfdf8",
  colorScheme: "light",
};

const schoolId = `${siteUrl}/#school`;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "School",
      "@id": schoolId,
      name: site.name,
      alternateName: site.shortName,
      url: siteUrl,
      logo: `${siteUrl}/logos/smpn2ambulu.png`,
      image: `${siteUrl}/logos/og-smpn2ambulu.png`,
      description:
        "Sekolah menengah pertama negeri di Sabrang, Ambulu, Jember. Menumbuhkan lulusan yang berprestasi, terampil, mandiri, dan berakhlak mulia.",
      identifier: site.npsn,
      numberOfStudents: 1106,
      telephone: site.phone,
      address: {
        "@type": "PostalAddress",
        streetAddress: "Jl. Watu Ulo No. 57, Sabrang",
        addressLocality: "Ambulu",
        addressRegion: "Jawa Timur",
        postalCode: site.postalCode,
        addressCountry: "ID",
      },
      areaServed: [
        { "@type": "AdministrativeArea", name: "Kecamatan Ambulu" },
        { "@type": "City", name: "Jember" },
      ],
      hasMap: site.mapsUrl,
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: site.name,
      inLanguage: "id-ID",
      publisher: { "@id": schoolId },
    },
  ],
};

const jsonLdString = JSON.stringify(jsonLd).replace(/</g, "\\u003c");

const introScript = `try{if(sessionStorage.getItem("smpn-intro-seen")==="1"){document.documentElement.classList.add("intro-seen")}}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="bg-cream" suppressHydrationWarning>
      <body
        className={`${jakarta.variable} bg-cream text-ink antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <noscript>
          <style>{`#page-intro{display:none!important}[data-reveal]{opacity:1!important;transform:none!important;clip-path:none!important}`}</style>
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString }}
        />
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
