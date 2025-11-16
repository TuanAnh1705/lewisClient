"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// Wrap Next/Image để sử dụng trong Framer Motion
const MotionImage = motion(Image);

//-----------------------------------------------------
// 1. VARIANTS
//-----------------------------------------------------

const overlayVariants: Variants = {
    rest: {
        y: "calc(100% - 7rem)",
    },
    hover: {
        y: 0,
        transition: { duration: 0.4, ease: "easeInOut" },
    },
};

const contentVariants: Variants = {
    rest: { opacity: 0, y: 10 },
    hover: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.2, duration: 0.3 },
    },
};

const mobileCardVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
        },
    }),
};

//-----------------------------------------------------
// 2. DATA
//-----------------------------------------------------

interface StrategyCardProps {
    title: string;
    description: string;
    imageUrl: string;
    link: string;
}

const strategies: StrategyCardProps[] = [
    {
        title: "Personal Income Tax Strategy",
        description:
            "For executives, investors, and professionals living and working across borders. We ensure you remain compliant while optimising your tax position to preserve the wealth you work hard to create.",
        imageUrl: "/assets/show1.png",
        link: "/services/personalIncome",
    },
    {
        title: "Corporate Tax Structuring",
        description:
            "For UK companies expanding into Europe or EU companies operating in the UK. We design tax-efficient corporate structures that support growth and minimise fiscal drag.",
        imageUrl: "/assets/show2.png",
        link: "/services/corporate",
    },
    {
        title: "Cross-Border VAT Optimisation",
        description:
            "Navigate the complexities of Value Added Tax with clarity. We provide strategic advice to ensure your business remains compliant and efficient across multiple jurisdictions.",
        imageUrl: "/assets/show3.png",
        link: "/services/vat",
    },
];

const COMPOSITE_IMAGE_URL = "/assets/show1.png";

//-----------------------------------------------------
// 3. MOBILE CARD COMPONENT
//-----------------------------------------------------

const MobileStrategyCard = ({ strategy, index }: { strategy: StrategyCardProps; index: number }) => {
    return (
        <motion.div
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={mobileCardVariants}
            className="relative h-[500px] sm:h-[550px] overflow-hidden shadow-lg"
        >
            {/* Background Image */}
            <div className="absolute inset-0">
                <MotionImage
                    src={strategy.imageUrl}
                    alt={strategy.title}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-x-0 bottom-0 p-6 bg-[#BC9750]/90 backdrop-blur-sm text-[#041122]">
                <h3 className="arial-nova text-xl sm:text-2xl font-medium mb-3 leading-tight">
                    {strategy.title}
                </h3>
                <p className="arial-nova text-sm sm:text-base leading-relaxed text-[#4D4946] mb-4">
                    {strategy.description}
                </p>
                <Link
                    href={strategy.link}
                    className="gotham inline-flex items-center gap-2 px-4 py-2.5
                    rounded-none bg-white text-sm font-medium
                    hover:bg-[#041122] hover:text-white transition-colors"
                >
                    Explore Now
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
};

//-----------------------------------------------------
// 4. MAIN COMPONENT
//-----------------------------------------------------

export const CoreStrategiesSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="w-full py-12 md:py-16 lg:py-24 px-4 sm:px-6 lg:px-8">

            <div className="text-center mb-8 md:mb-12 max-w-3xl mx-auto">
                <p className="gotham text-yellow-600 text-base md:text-lg lg:text-xl font-medium">
                    Our Services
                </p>
                <h1 className="trajan-pro text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-gray-900 mt-4 md:mt-6 px-4">
                    Achieve Your Goals with Our Core Strategies
                </h1>
            </div>

            {/* Mobile */}
            <div className="lg:hidden space-y-6">
                {strategies.map((strategy, index) => (
                    <MobileStrategyCard key={strategy.title} strategy={strategy} index={index} />
                ))}
            </div>

            {/* Desktop */}
            <div
                className="hidden lg:block relative h-[650px] xl:h-[780px] rounded-none overflow-hidden shadow-lg w-full"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {/* Default Background */}
                <MotionImage
                    src={COMPOSITE_IMAGE_URL}
                    alt="Core Strategy Background"
                    fill
                    className="object-cover"
                    animate={{ opacity: 1 }}
                />

                {/* Hover images */}
                {strategies.map((strategy, index) => (
                    <MotionImage
                        key={strategy.imageUrl}
                        src={strategy.imageUrl}
                        alt={strategy.title}
                        fill
                        className="object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                ))}

                <div className="absolute inset-0 grid grid-cols-3 z-10">
                    {strategies.map((strategy, index) => {
                        const animateState = hoveredIndex === index ? "hover" : "rest";

                        return (
                            <div
                                key={strategy.title}
                                className="relative h-full"
                                onMouseEnter={() => setHoveredIndex(index)}
                            >
                                {/* Overlay */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 p-6 bg-[#BC9750]/70 backdrop-blur-xs
                                    text-[#041122] flex flex-col justify-start"
                                    variants={overlayVariants}
                                    animate={animateState}
                                >
                                    <h3 className="arial-nova text-2xl xl:text-3xl font-medium flex items-center max-w-[250px] leading-tight">
                                        {strategy.title}
                                    </h3>

                                    <motion.div
                                        className="mt-4 space-y-4"
                                        variants={contentVariants}
                                        animate={animateState}
                                    >
                                        <p className="arial-nova text-base xl:text-lg leading-relaxed text-[#4D4946]">
                                            {strategy.description}
                                        </p>

                                        <Link
                                            href={strategy.link}
                                            className="gotham flex items-center gap-2 px-4 py-2 w-fit
                                            rounded-none bg-white text-sm font-medium
                                            hover:bg-[#041122] hover:text-white transition-colors"
                                        >
                                            Explore Now
                                            <ArrowUpRight className="w-4 h-4" />
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                {/* Dividers */}
                <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/30 z-20"></div>
                <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white/30 z-20"></div>
            </div>
        </section>
    );
};
