import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "GRID SPHERE | AI Weather & Farm Intelligence",
  description: "High-end AI-powered weather stations for precision agriculture. Real-time data, modular sensors, and 5G connectivity.",
  keywords: ["AI Weather Station", "Precision Farming", "Agriculture Intelligence", "Grid Sphere", "AgTech"],
  openGraph: {
    title: "GRID SPHERE | AI Weather Intelligence",
    description: "The future of farming is here. Assembled. Ready. Intelligent.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-spotify-black text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
