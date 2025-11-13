"use client";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-[800px] w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/assets/hero.jpg')", // Thay ảnh phù hợp
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#041122]/90" />

      {/* Content */}
      <div className="hero-content container mx-auto flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-4xl md:text-6xl font-medium tracking-tight max-w-5xl trajan-pro leading-tight mb-0">
          Navigate International Tax with Confidence.
        </h1>
        <h2 className="text-4xl md:text-6xl font-medium mt-0 trajan-pro text-[#BC9750]">
          Maximise Your Wealth.
        </h2>
        <p className="arial-nova mt-6 text-lg max-w-xl font-body">
          Bespoke tax strategies for high-net-worth individuals and entrepreneurs
          in the UK and Europe.
        </p>
        <Button
          variant="secondary"
          className="gotham mt-8 bg-[#BC9750] text-white text-lg px-8 py-6 font-button rounded-none transition-colors hover:bg-[#726857] hover:text-gray-100"
        >
          Book a Strategy Call
        </Button>
      </div>
    </section>
  );
}
