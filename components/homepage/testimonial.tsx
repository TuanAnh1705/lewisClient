'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  title: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'David Chen',
    title: 'Founder of an E-commerce Brand',
    image: '/assets/tes1.png',
    content:
      'As we expanded into the UK, the corporate tax structure was a minefield. Lewis provided a clear, efficient path forward that was critical for our success. He is an essential part of our UK advisory team.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Sarah L.',
    title: 'Managing Director',
    image: '/assets/tes1.png',
    content:
      'The strategic plan Lewis created for my international income was nothing short of brilliant. It combined deep market understanding with practical execution, giving me complete clarity and unwavering confidence in every decision.',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Chen',
    title: 'Founder of an E-commerce Brand',
    image: '/assets/tes1.png',
    content:
      'As we expanded into the UK, the corporate tax structure was a minefield. Lewis provided a clear, efficient path forward that was critical for our success. He is an essential part of our UK advisory team.',
    rating: 5,
  },
];

// Custom hook for screen size
function useScreenSize() {
  const [screenSize, setScreenSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1024,
  });

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({ width: window.innerWidth });
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}

export default function TestimonialsSection() {
  const [selectedId, setSelectedId] = useState(2);
  const { width } = useScreenSize();
  const imageRefs = React.useRef<{ [key: number]: HTMLButtonElement | null }>({});

  // Responsive dimensions
  const getImageDimensions = (isSelected: boolean) => {
    if (width < 768) {
      // Mobile: All images same size
      return { height: 120, width: 180 };
    } else if (width < 1024) {
      // Tablet: Slight variation
      return { height: isSelected ? 180 : 90, width: 240 };
    } else {
      // Desktop: Original behavior
      return { height: isSelected ? 255 : 105, width: 320 };
    }
  };

  // Handle image click - only scroll when user manually clicks
  const handleImageClick = (id: number) => {
    setSelectedId(id);
    // Only scroll to image on mobile when user manually clicks
    if (width < 768 && imageRefs.current[id]) {
      imageRefs.current[id]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  };

  // Auto-rotate testimonials every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedId((prev) => {
        const currentIndex = testimonials.findIndex((t) => t.id === prev);
        const nextIndex = (currentIndex + 1) % testimonials.length;
        return testimonials[nextIndex].id;
      });
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 bg-white/0 md:-mt-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16">
          <h2 className="trajan-pro text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mb-3 md:mb-4">
            What Our Clients Are Saying
          </h2>
          <p className="arial-nova font-medium text-sm sm:text-base md:text-lg text-gray-600 max-w-xs md:max-w-5xl mx-auto px-4">
            We are proud to serve a discerning clientele of entrepreneurs and
            executives who demand excellence. Our 98% client retention rate is a
            testament to the trust they place in our strategic counsel and the
            results we deliver.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-4">
          {/* Images Column - Horizontal on Mobile, Vertical on Desktop */}
          <div className="flex flex-row lg:flex-col gap-3 md:gap-4 justify-start lg:justify-center overflow-x-auto lg:overflow-x-visible w-full lg:w-auto pb-4 lg:pb-0 px-4 lg:px-0
            scrollbar-hide [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            snap-x snap-mandatory lg:snap-none">
            {testimonials.map((testimonial, index) => {
              const dims = getImageDimensions(selectedId === testimonial.id);
              return (
                <motion.button
                  key={testimonial.id}
                  ref={(el) => {
                    imageRefs.current[testimonial.id] = el;
                  }}
                  onClick={() => handleImageClick(testimonial.id)}
                  className="relative overflow-hidden rounded-none focus:outline-none shrink-0 snap-center lg:snap-align-none"
                  animate={{
                    height: dims.height,
                    width: dims.width,
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <motion.div
                    className="relative h-full w-full"
                    animate={{
                      filter:
                        selectedId === testimonial.id
                          ? 'grayscale(0%) brightness(100%)'
                          : 'grayscale(100%) brightness(70%)',
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gray-900"
                      animate={{
                        opacity: selectedId === testimonial.id ? 0 : 0.3,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                </motion.button>
              );
            })}
          </div>

          {/* Content Column */}
          <div className="w-full lg:w-[800px] min-h-[400px] md:min-h-[450px] lg:h-[500px] lg:pl-12 bg-[#F2F0EC] flex items-center justify-start p-6 md:p-8 lg:p-12">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial) =>
                selectedId === testimonial.id ? (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    {/* Quote Icon */}
                    <div className="md:-translate-x-6 md:-translate-y-6 lg:-translate-y-10">
                      <svg
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-52 lg:h-52 text-[#ADADAD]"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                      >
                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                      </svg>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1 -translate-y-4 md:-translate-y-12 lg:-translate-y-16">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 fill-[#BC9750] text-[#BC9750]"
                        />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="arial-nova font-medium text-md sm:text-base md:text-lg lg:text-xl text-[#4D4946] max-w-xs lg:max-w-2xl leading-relaxed mb-4 md:mb-6 lg:mb-8 -translate-y-2 md:-translate-y-8 lg:-translate-y-12">
                      {testimonial.content}
                    </blockquote>

                    {/* Author Info */}
                    <div className="-translate-y-1 md:-translate-y-6 lg:-translate-y-10">
                      <p className="arial-nova font-bold text-base sm:text-lg md:text-lg text-[#041122]">
                        {testimonial.name}
                      </p>
                      <p className="arial-nova text-sm sm:text-base text-[#4D4946] mt-1">
                        {testimonial.title}
                      </p>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}