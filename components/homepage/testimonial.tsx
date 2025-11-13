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

export default function TestimonialsSection() {
  const [selectedId, setSelectedId] = useState(2);

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
    <section className="py-20 px-4 bg-white/0 md:-mt-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="trajan-pro text-4xl md:text-5xl font-medium text-gray-900 mb-4">
            What Our Clients Are Saying
          </h2>
          <p className="arial-nova font-medium text-lg text-gray-600 max-w-4xl mx-auto">
            We are proud to serve a discerning clientele of entrepreneurs and
            executives who demand excellence. Our 98% client retention rate is a
            testament to the trust they place in our strategic counsel and the
            results we deliver.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-4">
          {/* Images Column */}
          <div className="flex lg:flex-col gap-4 lg:gap-4 justify-center">
            {testimonials.map((testimonial) => (
              <motion.button
                key={testimonial.id}
                onClick={() => setSelectedId(testimonial.id)}
                className="relative overflow-hidden rounded-none focus:outline-none"
                animate={{
                  height: selectedId === testimonial.id ? 255 : 105,
                  width: 320,
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
            ))}
          </div>

          {/* Content Column */}
          <div className="lg:w-[800px] lg:h-[500px] lg:pl-12 bg-[#F2F0EC] flex items-center justify-start">
            <AnimatePresence mode="wait">
              {testimonials.map((testimonial) =>
                selectedId === testimonial.id ? (
                  <motion.div
                    key={testimonial.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    {/* Quote Icon */}
                    <div className="md:-translate-x-6 md:-translate-y-10">
                      <svg
                        className="w-52 h-52 text-[#ADADAD]"
                        fill="currentColor"
                        viewBox="0 0 32 32"
                      >
                        <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2V8zm12 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2V8z" />
                      </svg>
                    </div>

                    {/* Rating Stars */}
                    <div className="flex gap-1 md:-translate-y-16">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-[#BC9750] text-[#BC9750]"
                        />
                      ))}
                    </div>

                    {/* Testimonial Content */}
                    <blockquote className="arial-nova font-medium text-md md:text-xl text-[#4D4946] md:max-w-2xl leading-normal mb-8 md:-translate-y-12">
                      {testimonial.content}
                    </blockquote>

                    {/* Author Info */}
                    <div>
                      <p className="arial-nova font-bold text-lg text-[#041122] md:-translate-y-10">
                        {testimonial.name}, {testimonial.title}
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
