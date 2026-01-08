import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { ShilpMitra } from "@/components/features/ShilpMitra";

const playfair = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ShilpSetu | Own a Piece of India's Soul",
  description: "A marketplace for rural artisans.",
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        <AuthProvider>
          <CartProvider>
            {children}
            <ShilpMitra />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
