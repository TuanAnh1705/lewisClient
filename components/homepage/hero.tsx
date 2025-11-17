"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative w-full h-[600px] md:h-[800px] overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center w-full h-full"
        style={{
          backgroundImage: "url('/assets/hero.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-[#041122]/90" />

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col items-center justify-center text-center text-white px-4">
        
        <h1 className="text-xl sm:text-3xl md:text-6xl font-medium tracking-tight max-w-xs md:max-w-4xl trajan-pro md:leading-16">
          Navigate International Tax with Confidence.
        </h1>

        <h2 className="text-xl sm:text-3xl md:text-6xl font-medium trajan-pro text-[#BC9750] md:leading-16">
          Maximise Your Wealth.
        </h2>

        <p className="arial-nova mt-4 text-xs md:text-lg lg:text-xl max-w-xs md:max-w-xl font-body leading-relaxed">
          Bespoke tax strategies for high-net-worth individuals and entrepreneurs
          in the UK and Europe.
        </p>

        <Link href="/contact">
          <Button
            variant="secondary"
            className="gotham mt-6 bg-[#BC9750] text-white text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 font-button rounded-none hover:bg-[#726857]"
          >
            Book a Strategy Call
          </Button>
        </Link>
      </div>
    </section>
  );
}
