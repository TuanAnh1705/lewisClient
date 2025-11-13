'use client';

import React from 'react';
import Image from 'next/image';

export default function BottomSection() {
  return (
    <section className="relative w-full bg-white py-12 md:py-16 overflow-visible md:-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="trajan-pro text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900">
            Trusted by Discerning Clients Around the World
          </h2>
        </div>

        {/* Logo Row */}
        <div className="flex items-center justify-center flex-wrap gap-12 md:gap-16">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="relative w-20 h-20 flex items-center justify-center">
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
