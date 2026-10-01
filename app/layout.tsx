import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://portofolio-green-chi.vercel.app"),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    siteName: "Portfolio Arya",
    title: "Arya Agung Triadi | Portfolio",
    description: "Web Development, UI/UX, dan karya kreatif Arya Agung Triadi.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arya Agung Triadi | Portfolio",
    description: "Web Development, UI/UX, dan karya kreatif Arya Agung Triadi.",
    images: ["/opengraph-image"],
  },
  title: "Arya Agung Triadi | Portfolio",
  description: "Portfolio Arya Agung Triadi: Web Development, UI/UX, karya kreatif, proyek, dan pengalaman.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

