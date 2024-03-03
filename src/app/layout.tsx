import type { Metadata } from "next";
import "./globals.css";
import Background from "@/components/Background";
import HorizontalHeader from "@/components/HorizontalHeader";
import { GeistSans } from "geist/font/sans";

import { Toaster } from "@/components/ui/sonner";
import { SearchProvider } from "@/context/SearchContext";

export const metadata: Metadata = {
  title: "HTBX",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <Background>
          <HorizontalHeader />
          <SearchProvider>{children}</SearchProvider>
        </Background>
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  );
}
