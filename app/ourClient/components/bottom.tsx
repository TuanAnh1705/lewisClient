'use client';

import React from 'react';
import Image from 'next/image';

export default function BottomSection() {
  return (
    <section className="relative w-full bg-white py-12 md:py-16 overflow-visible md:-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="trajan-pro text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight">
            Trusted by Discerning Clients Around the World
          </h2>
        </div>

        {/* Logo Row */}
        <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative">
                <Image
                  src="/assets/gold.png"
                  alt={`Client logo ${i + 1}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
