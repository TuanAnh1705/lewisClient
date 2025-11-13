'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';

interface KeyArea {
    title: string;
}

export default function TailoredSection() {
    const sectionRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ['start end', 'end start']
    });

    const keyAreas: KeyArea[] = [
        { title: 'Tax Residency & Domicile Planning' },
        { title: 'Double-Taxation Treaty Analysis' },
        { title: 'Foreign Income & Asset Reporting' },
        { title: 'Tax-Efficient Investment Structuring' },
        { title: 'Cross-Border Estate Planning' },
        { title: 'Compliance & Risk Management' }
    ];

    // 💫 Thêm spring để animation mượt hơn và phản ứng nhanh hơn
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120, // tăng để nhanh hơn
        damping: 20,    // giảm để mượt
        mass: 0.8       // nhẹ hơn giúp phản hồi nhanh
    });

    // Chuyển động mượt và hơi nhanh hơn
    const translateX = useTransform(smoothProgress, [0, 1], ['20%', '0%']);
    const opacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="relative py-16 md:py-24 lg:py-32 bg-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row justify-between gap-4 lg:gap-24 mb-20 md:mb-40">

                    <div>
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#041122] trajan-pro leading-tight md:max-w-lg">
                            <span className="text-[#BC9750]">Tailored</span> for
                            the Global
                            Professional
                        </h2>
                    </div>

                    <div className="flex items-start">
                        <p className="text-gray-600 text-sm md:text-xl leading-normal arial-nova">
                            This service is specifically designed for high-achieving individuals whose lives and careers are not limited by borders. If you are a C-Level Executive with international responsibilities, a UK Non-Domiciled Resident seeking tax efficiency, an Entrepreneur with income from multiple countries, or a High-Net-Worth Individual managing cross-border assets, our strategies are built for you.
                        </p>
                    </div>
                </div>

                {/* Key Areas Section */}
                <div className="space-y-12">
                    <h3 className="text-3xl md:text-5xl lg:text-6xl font-medium text-[#041122] trajan-pro">
                        Key Areas We Address:
                    </h3>

                    <div className="relative pt-16">
                        {/* Base Line */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-screen h-px bg-[#041122] z-10" />

                        {/* Motion Wrapper */}
                        <motion.div
                            style={{ x: translateX, opacity }}
                            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-20"
                        >
                            {keyAreas.map((area, index) => (
                                <div key={index} className="relative text-left">
                                    {/* Bullet vuông */}
                                    <div
                                        className="absolute left-1/2 w-4 h-4 bg-[#041122] z-20 -translate-x-22 transition-transform duration-300 ease-out"
                                        style={{ top: 'calc(50% - 40px)' }}
                                    />
                                    <div className="pt-8">
                                        <p className="text-[#4D4946] text-sm md:text-base font-medium leading-relaxed arial-nova md:max-w-36 md:mt-5">
                                            {area.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Beyond Filing Section - Thêm phần này vào cuối, trước thẻ đóng section */}
            <div className="mt-10 md:mt-20 pt-16">
                {/* Header */}
                <div className="text-center mb-16">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#041122] trajan-pro mb-2">
                        Beyond Filing:
                    </h3>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#BC9750] trajan-pro">
                        A Strategic Partnership
                    </p>
                </div>

                {/* ✅ Wrapper để căn giữa toàn bộ grid */}
                <div className="flex justify-center">
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl">
                        {/* Column 1: Deep Dive Analysis */}
                        <div className="text-start space-y-6">
                            <div className="flex justify-start mb-8">
                                <div className="w-16 h-16 rounded flex items-start justify-start">
                                    <Image src="/assets/sv7.png" alt="Deep Dive Analysis" width={64} height={64} />
                                </div>
                            </div>
                            <h4 className="text-xl md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52">
                                Deep Dive Analysis
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-normal arial-nova md:max-w-56">
                                We start with a comprehensive review of your entire financial picture to identify risks and opportunities.
                            </p>
                        </div>

                        {/* Column 2: Bespoke Strategy */}
                        <div className="text-start space-y-6">
                            <div className="flex justify-start mb-8">
                                <div className="w-16 h-16 rounded flex items-start justify-start">
                                    <Image src="/assets/sv8.png" alt="Bespoke Strategy" width={64} height={64} />
                                </div>
                            </div>
                            <h4 className="text-xl md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52">
                                Bespoke Strategy
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-normal arial-nova md:max-w-60">
                                We design a custom, actionable tax strategy that aligns with your specific personal and professional goals.
                            </p>
                        </div>

                        {/* Column 3: Proactive Management */}
                        <div className="text-start space-y-6">
                            <div className="flex justify-start mb-9">
                                <div className="w-14 h-14 rounded flex items-start justify-start">
                                    <Image src="/assets/sv9.png" alt="Proactive Management" width={64} height={64} />
                                </div>
                            </div>
                            <h4 className="text-xl md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52">
                                Proactive Management
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-normal arial-nova md:max-w-60">
                                We provide ongoing support to ensure your strategy remains effective as regulations and your circumstances evolve.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
