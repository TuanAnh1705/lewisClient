'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Testimonial {
    name: string;
    role: string;
    quote: string;
    avatar: string;
}

export default function TestimonialSection() {
    const testimonials: Testimonial[] = [
        {
            name: 'Sarah Newman',
            role: 'Managing Director of P&G',
            quote: 'The strategic plan Lewis developed for my international income was nothing short of brilliant. Absolute clarity and confidence.',
            avatar: '/assets/tes1.png'
        },
        {
            name: 'David Chen',
            role: 'CEO of Tech Innovations',
            quote: 'The strategic plan Lewis developed for my international income was nothing short of brilliant. Absolute clarity and confidence.',
            avatar: '/assets/tes2.png'
        },
        {
            name: 'Sarah New Man',
            role: 'CFO of Global Finance',
            quote: 'The strategic plan Lewis developed for my international income was nothing short of brilliant. Absolute clarity and confidence.',
            avatar: '/assets/tes1.png'
        },
        {
            name: 'David Chen',
            role: 'Partner at Investment Firm',
            quote: 'The strategic plan Lewis developed for my international income was nothing short of brilliant. Absolute clarity and confidence.',
            avatar: '/assets/tes2.png'
        }
    ];

    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrevious = () => {
        if (activeIndex > 0) {
            setActiveIndex(activeIndex - 1);
        }
    };

    const handleNext = () => {
        if (activeIndex < testimonials.length - 1) {
            setActiveIndex(activeIndex + 1);
        }
    };

    return (
        <section className="relative py-16 md:py-24">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Wrapper for tabs and card with same width */}
                <div className="max-w-full mx-auto">
                    {/* Tabs Navigation - Google Style */}
                    <div className="flex justify-center items-end mb-0">
                        <div className="flex gap-0 w-full">
                            {testimonials.map((testimonial, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveIndex(index)}
                                    className={`relative flex-1 px-4 md:px-6 py-4 text-sm md:text-xl font-medium transition-all duration-300 ${
                                        activeIndex === index
                                            ? 'text-[#041122] bg-[#F2F0EC]'
                                            : 'text-gray-400 bg-[#E5E3DD]'
                                    }`}
                                >
                                    <span className="trajan-pro">{testimonial.name}</span>
                                    {/* Border Top - thicker for active tab */}
                                    <div
                                        className={`absolute top-0 left-0 right-0 transition-all duration-300 ${
                                            activeIndex === index
                                                ? 'h-0.5 bg-[#041122]'
                                                : 'h-px bg-gray-300'
                                        }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Testimonial Card with Navigation */}
                    <div className="relative bg-[#F2F0EC] px-8 py-16 md:px-16 md:py-20">
                        {/* Left Arrow - Outside the card */}
                        <button
                            onClick={handlePrevious}
                            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 md:-translate-x-20 z-10 transition-opacity duration-300 ${
                                activeIndex === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'
                            }`}
                            aria-label="Previous testimonial"
                        >
                            <ArrowLeft className='w-10 h-10 text-[#726857] hover:text-[#4d4946]'/>
                        </button>

                        {/* Testimonial Content */}
                        <div className="max-w-xl mx-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="text-center space-y-8"
                                >
                                    {/* Quote */}
                                    <blockquote className="text-lg md:text-xl lg:text-2xl text-[#041122] leading-relaxed arial-nova px-4">
                                        &quot;{testimonials[activeIndex].quote}&quot;
                                    </blockquote>

                                    {/* Avatar & Info */}
                                    <div className="flex flex-col items-center space-y-4 pt-8">
                                        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-[#F2F0EC]">
                                            <Image
                                                src={testimonials[activeIndex].avatar}
                                                alt={testimonials[activeIndex].name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-[#4D4946] text-sm md:text-base arial-nova">
                                                {testimonials[activeIndex].name}, {testimonials[activeIndex].role}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right Arrow - Outside the card */}
                        <button
                            onClick={handleNext}
                            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 md:translate-x-20 z-10 transition-opacity duration-300 ${
                                activeIndex === testimonials.length - 1
                                    ? 'opacity-0 pointer-events-none'
                                    : 'opacity-100'
                            }`}
                            aria-label="Next testimonial"
                        >
                            <ArrowRight className='w-10 h-10 text-[#726857] hover:text-[#4d4946]'/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}