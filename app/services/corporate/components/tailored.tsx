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

    // 💫 Spring cho desktop
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 20,
        mass: 0.8
    });

    // Desktop animation
    const translateX = useTransform(smoothProgress, [0, 1], ['20%', '0%']);
    const opacity = useTransform(smoothProgress, [0, 0.2], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="relative py-12 md:py-24 lg:py-32 bg-white overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Top Section */}
                <div className="flex flex-col lg:flex-row items-start justify-between gap-6 lg:gap-16 mb-12 md:mb-40">
                    <div className="flex-1">
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium text-[#041122] trajan-pro leading-tight">
                            <span className="text-[#BC9750]">Engineered </span> for the Ambitious Enterprise
                        </h2>
                    </div>

                    <div className="flex-1">
                        <p className="text-gray-600 text-sm md:text-xl leading-relaxed md:leading-normal arial-nova">
                            This service is built for businesses poised for or currently navigating international growth. We partner with UK Startups scaling into Europe, Established UK Companies seeking EU market entry, and European Enterprises establishing a UK presence. Our strategies provide the fiscal backbone for sustainable cross-border success.
                        </p>
                    </div>
                </div>


                {/* Key Areas Section */}
                <div className="space-y-8 md:space-y-12">
                    <h3 className="text-2xl md:text-5xl lg:text-6xl font-medium text-[#041122] trajan-pro">
                        Key Areas We Address:
                    </h3>

                    {/* Mobile Layout - Danh sách theo hàng dọc */}
                    <div className="md:hidden space-y-4 pt-6">
                        {keyAreas.map((area, index) => (
                            <div key={index} className="flex items-start gap-4">
                                {/* Bullet */}
                                <div className="w-3 h-3 bg-[#041122] shrink-0 mt-1.5" />
                                {/* Text */}
                                <p className="text-[#4D4946] text-sm font-medium leading-relaxed arial-nova flex-1">
                                    {area.title}
                                </p>
                            </div>
                        ))}
                    </div>

                    {/* Desktop Layout - Grid với animation */}
                    <div className="hidden md:block relative pt-16">
                        {/* Base Line */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-screen h-px bg-[#041122] z-10" />

                        {/* Motion Wrapper */}
                        <motion.div
                            style={{ x: translateX, opacity }}
                            className="grid md:grid-cols-3 lg:grid-cols-6 gap-8 relative z-20"
                        >
                            {keyAreas.map((area, index) => (
                                <div key={index} className="relative text-left">
                                    {/* Bullet vuông */}
                                    <div
                                        className="absolute left-1/2 w-4 h-4 bg-[#041122] z-20 -translate-x-22 transition-transform duration-300 ease-out"
                                        style={{ top: 'calc(50% - 40px)' }}
                                    />
                                    <div className="pt-8">
                                        <p className="text-[#4D4946] text-base font-medium leading-relaxed arial-nova max-w-36 mt-5">
                                            {area.title}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Beyond Compliance Section */}
            <div className="mt-12 md:mt-20 pt-12 md:pt-16 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-10 md:mb-16">
                    <h3 className="text-2xl md:text-4xl lg:text-5xl font-medium text-[#041122] trajan-pro mb-1 md:mb-2">
                        Beyond Compliance:
                    </h3>
                    <p className="text-2xl md:text-4xl lg:text-5xl font-medium text-[#BC9750] trajan-pro">
                        A Growth Partnership
                    </p>
                </div>

                {/* ✅ Wrapper để căn giữa toàn bộ grid */}
                <div className="flex justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 max-w-6xl w-full mx-auto justify-items-center">
                        {/* Column 1: Commercial Acumen */}
                        <div className="text-center md:text-start space-y-4 md:space-y-6">
                            <div className="flex justify-center md:justify-start mb-4 md:mb-8">
                                <div className="w-12 h-12 md:w-19 md:h-16 rounded flex items-start justify-start">
                                    <Image 
                                        src="/assets/sv11.png" 
                                        alt="Commercial Acumen" 
                                        width={64} 
                                        height={64}
                                        className="w-12 h-12 md:w-19 md:h-19"
                                    />
                                </div>
                            </div>
                            <h4 className="text-lg md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52 mx-auto md:mx-0">
                                Commercial Acumen
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-relaxed md:leading-normal arial-nova md:max-w-56 mx-auto md:mx-0">
                                We align tax strategy with your business objectives, ensuring fiscal efficiency fuels your commercial goals.
                            </p>
                        </div>

                        {/* Column 2: Risk Mitigation */}
                        <div className="text-center md:text-start space-y-4 md:space-y-6">
                            <div className="flex justify-center md:justify-start mb-4 md:mb-8">
                                <div className="w-12 h-14 md:w-16 md:h-16 rounded flex items-start justify-start">
                                    <Image 
                                        src="/assets/sv12.png" 
                                        alt="Risk Mitigation" 
                                        width={64} 
                                        height={64}
                                        className="w-12 h-14 md:w-16 md:h-19"
                                    />
                                </div>
                            </div>
                            <h4 className="text-lg md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52 mx-auto md:mx-0">
                                Risk Mitigation
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-relaxed md:leading-normal arial-nova md:max-w-60 mx-auto md:mx-0">
                                We proactively identify and manage cross-border tax risks, protecting your bottom line.
                            </p>
                        </div>

                        {/* Column 3: Growth Partnership */}
                        <div className="text-center md:text-start space-y-4 md:space-y-6">
                            <div className="flex justify-center md:justify-start mb-4 md:mb-11">
                                <div className="w-10 h-14 md:w-12 md:h-12 rounded flex items-start justify-start">
                                    <Image 
                                        src="/assets/sv13.png" 
                                        alt="Growth Partnership" 
                                        width={64} 
                                        height={64}
                                        className="w-10 h-14 md:w-16 md:h-18"
                                    />
                                </div>
                            </div>
                            <h4 className="text-lg md:text-2xl font-medium text-[#041122] trajan-pro md:max-w-52 mx-auto md:mx-0">
                                Growth Partnership
                            </h4>
                            <p className="text-[#4D4946] text-sm md:text-lg leading-relaxed md:leading-normal arial-nova md:max-w-60 mx-auto md:mx-0">
                                We act as long-term partners, adapting your tax structure as your business scales and evolves.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}