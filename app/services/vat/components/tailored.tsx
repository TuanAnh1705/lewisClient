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
        { title: 'UK & EU VAT Registration and De-registration' },
        { title: 'Place of Supply Rules Analysis' },
        { title: 'E-commerce VAT (OSS/IOSS) Solutions' },
        { title: 'VAT Recovery and Optimisation' },
        { title: 'Managing Import/Export VAT' },
        { title: 'Ensuring Full Compliance with HMRC & EU Authorities' }
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
                        <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#041122] trajan-pro leading-tight md:max-w-2xl">
                            <span className="text-[#BC9750]">Designed</span> for International Commerce
                        </h2>
                    </div>

                    <div className="flex items-start">
                        <p className="text-gray-600 text-sm md:text-xl leading-normal arial-nova">
                            VAT is a critical, and often complex, component of cross-border trade. This service is essential for E-commerce businesses selling to UK/EU customers, companies providing digital services across borders, and businesses managing complex supply chains. We turn VAT complexity into a competitive advantage.
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
                                        <p className="text-[#4D4946] text-sm md:text-base font-medium leading-relaxed arial-nova md:max-w-38 md:mt-10">
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
                        Our Approach:
                    </h3>
                    <p className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#BC9750] trajan-pro">
                        Proactive & Precise
                    </p>
                </div>

                {/* ✅ Wrapper để căn giữa toàn bộ grid */}
                <div className="flex justify-center">
                    <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-6xl">
                        {/* Column 1: Deep Dive Analysis */}
                        <div className="text-start space-y-6">
                            <div className="flex justify-start mb-8">
                                <div className="w-16 h-16 rounded flex items-start justify-start">
                                    <Image src="/assets/sv16.png" alt="Deep Dive Analysis" width={64} height={64} />
                                </div>
                            </div>
                            <h4 className="text-xl md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52">
                                Process Optimization
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-normal arial-nova md:max-w-56">
                                We analyse your transaction flows to create efficient and compliant VAT processes from the start.
                            </p>
                        </div>

                        {/* Column 2: Bespoke Strategy */}
                        <div className="text-start space-y-6">
                            <div className="flex justify-start mb-8">
                                <div className="w-16 h-16 rounded flex items-start justify-start">
                                    <Image src="/assets/sv17.png" alt="Bespoke Strategy" width={64} height={64} />
                                </div>
                            </div>
                            <h4 className="text-xl md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52">
                                Cash Flow Efficiency
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-normal arial-nova md:max-w-60">
                               We identify opportunities for VAT recovery and improved cash flow management related to VAT payments.
                            </p>
                        </div>

                        {/* Column 3: Proactive Management */}
                        <div className="text-start space-y-6">
                            <div className="flex justify-start mb-8">
                                <div className="w-16 h-16 rounded flex items-start justify-start">
                                    <Image src="/assets/sv18.png" alt="Proactive Management" width={64} height={64} />
                                </div>
                            </div>
                            <h4 className="text-xl md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52">
                               Certainty & Compliance
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-normal arial-nova md:max-w-60">
                               We provide the certainty you need to trade across borders, knowing your VAT obligations are fully managed.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}
