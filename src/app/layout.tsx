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
  title: "Freelancer Rate Calculator - Stop Undercharging",
  description: "Calculate your optimal freelance rates with our smart pricing tool. Includes 5 professional proposal templates. $29 one-time payment.",
  keywords: "freelancer rates, pricing calculator, freelance pricing, proposal templates, rate calculator, freelance business",
  authors: [{ name: "Freelancer Rate Calculator" }],
  robots: "index, follow",
  openGraph: {
    title: "Freelancer Rate Calculator - Stop Undercharging",
    description: "Calculate your optimal freelance rates with our smart pricing tool. Stop leaving money on the table.",
    url: "https://freelancerratecalc.com",
    siteName: "Freelancer Rate Calculator",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelancer Rate Calculator - Stop Undercharging", 
    description: "Calculate your optimal freelance rates with our smart pricing tool. Stop leaving money on the table.",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%233B82F6'><path d='M12 4l8 8h-6v8h-4v-8H4l8-8z'/></svg>" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
