import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Shopkart",
  description: "E-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="flex min-h-full flex-col bg-white"
        data-testim-main-word-scripts-loaded="true"
      >
        <NavBar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
