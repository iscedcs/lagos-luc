import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Land Biller",
    template: "%s | Land Biller",
  },
  description:
    "A comprehensive digital solution from ISCE Digital Concept for property management and land use charge payment automation.",
  generator: "ISCE Digital Concept",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}
        <Toaster richColors />
      </body>
    </html>
  );
}

import "./globals.css";
import { Toaster } from "sonner";

