import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import "./globals.css";
import { Header } from "@/components/homepage/header";
import FooterSection from "@/components/homepage/footer";
import PageLoader from "@/components/pageLoader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LSJ | TAX",
  description: "CHARTERED ACCOUNTANTS AND INTERNATIONAL TAX ADVISORS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="shortcut icon"
          href="/assets/logo.png"
          type="image/png"
          sizes="32x20"
        />
      </head>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased min-h-screen bg-background text-foreground font-body overflow-x-hidden"
        )}
      >
        <PageLoader />

        {/* 2. Nội dung trang nằm song song bên dưới */}
        <Header />
        <main className="relative z-10">
          {children}
        </main>
        <FooterSection />
      </body>
    </html>
  );
}