'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BottomSection() {
    return (
        <section className="relative w-full ">
            {/* Background Image with Overlay */}
            <div className="relative h-[200px] md:h-[300px] overflow-hidden md:mb-10">
                <Image
                    src="/assets/bh.png"
                    alt="Office meeting"
                    fill
                    className="object-cover"
                    priority
                />

                {/* Dark Overlay */}
                <div className="absolute inset-0 bg-[#000000]/20" />

                {/* Marquee Text */}
                <div className="absolute inset-0 flex items-center overflow-hidden">
                    <motion.div
                        className="flex whitespace-nowrap"
                        animate={{
                            x: [0, -1000],
                        }}
                        transition={{
                            x: {
                                repeat: Infinity,
                                repeatType: 'loop',
                                duration: 20,
                                ease: 'linear',
                            },
                        }}
                    >
                        <span className="arial-nova text-4xl md:text-6xl lg:text-7xl font-medium text-white px-8">
                            BECAUSE YOUR FINANCES DESERVE PERSONAL INSIGHT
                        </span>
                        <span className="arial-nova text-4xl md:text-6xl lg:text-7xl font-medium text-white px-8">
                            BECAUSE YOUR FINANCES DESERVE PERSONAL INSIGHT
                        </span>
                        <span className="arial-nova text-4xl md:text-6xl lg:text-7xl font-medium text-white px-8">
                            BECAUSE YOUR FINANCES DESERVE PERSONAL INSIGHT
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Section - Trusted by clients */}
            <div className=" py-12 md:py-16 md:mb-10">
                <div className="max-w-5xl mx-auto px-4">
                    {/* Title */}
                    <div className="text-center mb-12">
                        <h2 className="trajan-pro text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900">
                            Trusted by Discerning Clients
                            Around the World
                        </h2>
                    </div>

                    {/* Logo Carousel */}
                    <div className="relative overflow-hidden">
                        <div
                            className="flex items-center justify-center gap-12 md:gap-16"
                        >
                            {/* Repeat logos multiple times for continuous effect */}
                            <div className="shrink-0 w-20 h-20 relative grayscale transition-all duration-300">
                                <div className="w-full h-full flex items-center justify-center">
                                    <Image
                                        src="/assets/bh1.png"
                                        alt="Office meeting"
                                        fill
                                        className="w-20 h-20 text-gray-400"
                                        priority
                                    />
                                </div>
                            </div>

                            <div className="shrink-0 w-20 h-20 relative grayscale transition-all duration-300">
                                <div className="w-full h-full flex items-center justify-center">
                                    <Image
                                        src="/assets/bh1.png"
                                        alt="Office meeting"
                                        fill
                                        className="w-20 h-20 text-gray-400"
                                        priority
                                    />
                                </div>
                            </div>

                            <div className="shrink-0 w-20 h-20 relative grayscale transition-all duration-300">
                                <div className="w-full h-full flex items-center justify-center">
                                    <Image
                                        src="/assets/bh1.png"
                                        alt="Office meeting"
                                        fill
                                        className="w-20 h-20 text-gray-400"
                                        priority
                                    />
                                </div>
                            </div>

                            <div className="shrink-0 w-20 h-20 relative grayscale transition-all duration-300">
                                <div className="w-full h-full flex items-center justify-center">
                                    <Image
                                        src="/assets/bh1.png"
                                        alt="Office meeting"
                                        fill
                                        className="w-20 h-20 text-gray-400"
                                        priority
                                    />
                                </div>
                            </div>

                            <div className="shrink-0 w-20 h-20 relative grayscale transition-all duration-300">
                                <div className="w-full h-full flex items-center justify-center">
                                    <Image
                                        src="/assets/bh1.png"
                                        alt="Office meeting"
                                        fill
                                        className="w-20 h-20 text-gray-400"
                                        priority
                                    />
                                </div>
                            </div>

                            <div className="shrink-0 w-20 h-20 relative grayscale transition-all duration-300">
                                <div className="w-full h-full flex items-center justify-center">
                                    <Image
                                        src="/assets/bh1.png"
                                        alt="Office meeting"
                                        fill
                                        className="w-20 h-20 text-gray-400"
                                        priority
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}