'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function BottomSection() {
    return (
        <section className="relative w-full">
            {/* Background Image with Overlay */}
            <div className="relative h-[150px] sm:h-[180px] md:h-[300px] overflow-hidden md:mb-10">
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
                        <span className="arial-nova text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-medium text-white px-6 md:px-8">
                            BECAUSE YOUR FINANCES DESERVE PERSONAL INSIGHT
                        </span>
                        <span className="arial-nova text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-medium text-white px-6 md:px-8">
                            BECAUSE YOUR FINANCES DESERVE PERSONAL INSIGHT
                        </span>
                        <span className="arial-nova text-2xl sm:text-3xl md:text-6xl lg:text-7xl font-medium text-white px-6 md:px-8">
                            BECAUSE YOUR FINANCES DESERVE PERSONAL INSIGHT
                        </span>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Section - Trusted by clients */}
            <div className="py-8 md:py-16 md:mb-10">
                <div className="max-w-5xl mx-auto px-4">
                    {/* Title */}
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="trajan-pro text-xl sm:text-2xl md:text-4xl lg:text-5xl font-medium text-gray-900 leading-tight">
                            Trusted by Discerning Clients
                            <br className="hidden sm:inline" /> Around the World
                        </h2>
                    </div>

                    {/* Logo Carousel */}
                    <div className="relative overflow-hidden">
                        <div className="flex items-center justify-center gap-8 md:gap-12 lg:gap-16 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            {/* Logo 1 */}
                            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative grayscale">
                                <Image
                                    src="/assets/bh1.png"
                                    alt="Client logo 1"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Logo 2 */}
                            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative grayscale">
                                <Image
                                    src="/assets/bh1.png"
                                    alt="Client logo 2"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Logo 3 */}
                            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative grayscale">
                                <Image
                                    src="/assets/bh1.png"
                                    alt="Client logo 3"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Logo 4 */}
                            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative grayscale">
                                <Image
                                    src="/assets/bh1.png"
                                    alt="Client logo 4"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Logo 5 */}
                            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative grayscale">
                                <Image
                                    src="/assets/bh1.png"
                                    alt="Client logo 5"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            {/* Logo 6 */}
                            <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 relative grayscale">
                                <Image
                                    src="/assets/bh1.png"
                                    alt="Client logo 6"
                                    fill
                                    className="object-contain"
                                    priority
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}