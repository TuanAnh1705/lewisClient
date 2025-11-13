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
        { title: 'Cross-Border Corporate Structuring' },
        { title: 'Transfer Pricing Policies' },
        { title: 'Mergers & Acquisitions (M&A) Tax Advisory' },
        { title: 'Intellectual Property (IP) & Royalty Structuring' },
        { title: 'Withholding Tax Optimisation' },
        { title: 'UK & EU Corporate Tax Compliance' }
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
                <div className="flex flex-col lg:flex-row items-start justify-between gap-4 lg:gap-16 mb-20 md:mb-40">
                    <div className="flex-1">
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#041122] trajan-pro leading-tight">
                            <span className="text-[#BC9750]">Engineered </span> for the Ambitious Enterprise
                        </h2>
                    </div>

                    <div className="flex-1">
                        <p className="text-gray-600 text-sm md:text-xl leading-normal arial-nova">
                            This service is built for businesses poised for or currently navigating international growth. We partner with UK Startups scaling into Europe, Established UK Companies seeking EU market entry, and European Enterprises establishing a UK presence. Our strategies provide the fiscal backbone for sustainable cross-border success.
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
                        Beyond Compliance:
                    </h3>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#BC9750] trajan-pro">
                        A Growth Partnership
                    </p>
                </div>

                {/* ✅ Wrapper để căn giữa toàn bộ grid */}
                <div className="flex justify-center">
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl">
                        {/* Column 1: Deep Dive Analysis */}
                        <div className="text-start space-y-6">
                            <div className="flex justify-start mb-8">
                                <div className="w-16 h-16 rounded flex items-start justify-start">
                                    <Image src="/assets/sv11.png" alt="Deep Dive Analysis" width={64} height={64} />
                                </div>
                            </div>
                            <h4 className="text-xl md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52">
                                Commercial Acumen
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-normal arial-nova md:max-w-56">
                                We align tax strategy with your business objectives, ensuring fiscal efficiency fuels your commercial goals.
                            </p>
                        </div>

                        {/* Column 2: Bespoke Strategy */}
                        <div className="text-start space-y-6">
                            <div className="flex justify-start mb-8">
                                <div className="w-16 h-16 rounded flex items-start justify-start">
                                    <Image src="/assets/sv12.png" alt="Bespoke Strategy" width={64} height={64} />
                                </div>
                            </div>
                            <h4 className="text-xl md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52">
                                Risk Mitigation
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-normal arial-nova md:max-w-60">
                                We proactively identify and manage cross-border tax risks, protecting your bottom line.
                            </p>
                        </div>

                        {/* Column 3: Proactive Management */}
                        <div className="text-start space-y-6">
                            <div className="flex justify-start mb-11">
                                <div className="w-12 h-12 rounded flex items-start justify-start">
                                    <Image src="/assets/sv13.png" alt="Proactive Management" width={64} height={64} />
                                </div>
                            </div>
                            <h4 className="text-xl md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52">
                                Growth Partnership
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-normal arial-nova md:max-w-60">
                                We act as long-term partners, adapting your tax structure as your business scales and evolves.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
