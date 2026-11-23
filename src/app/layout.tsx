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
    "Profil SMP Negeri 2 Ambulu di Sabrang, Jember: pembelajaran, guru, fasilitas, prestasi, berita, dan informasi SPMB 2026/2027.",
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
      "Sekolah negeri di Sabrang, Ambulu. 1.106 murid belajar bersama 60 pendidik dan 8 tenaga kependidikan.",
    images: [
      {
        url: "/images/hero-school.jpg",
        width: 1800,
        height: 1179,
        alt: "Gedung dan halaman SMP Negeri 2 Ambulu",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Sekolah negeri di Sabrang, Jember`,
    description:
      "Sekolah negeri di Sabrang, Ambulu. 1.106 murid belajar bersama 60 pendidik dan 8 tenaga kependidikan.",
    images: ["/images/hero-school.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#fcfdf8",
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "School",
  name: site.name,
  alternateName: site.shortName,
  url: siteUrl,
  logo: `${siteUrl}/icon.svg`,
  image: `${siteUrl}/images/hero-school.jpg`,
  description:
    "Sekolah menengah pertama negeri di Sabrang, Ambulu, Jember. Menumbuhkan lulusan yang berprestasi, terampil, mandiri, dan berakhlak mulia.",
  identifier: site.npsn,
  numberOfStudents: 1106,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Jl. Watu Ulo No. 57",
    addressLocality: "Sabrang, Ambulu",
    addressRegion: "Jawa Timur",
    addressCountry: "ID",
  },
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
