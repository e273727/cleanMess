import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/tokens.css";
import "@/styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import SectionDots from "@/components/layout/SectionDots";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CLEANMess — Know What's In Your Mess",
  description:
    "AI-powered food and water quality monitoring for college canteen safety. Real-time sensor alerts, historical trends, instant incident reporting.",
  keywords: ["food safety", "IoT", "canteen monitoring", "college mess", "water quality"],
  openGraph: {
    title: "CLEANMess — Know What's In Your Mess",
    description:
      "AI-powered food and water quality monitoring for college canteen safety.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        <SectionDots />
        <main>{children}</main>
      </body>
    </html>
  );
}
