"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link"; // <-- Thêm Link của Next.js

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

//-----------------------------------------------------
// 2. DATA
//-----------------------------------------------------

interface StrategyCardProps {
    title: string;
    description: string;
    imageUrl: string;
    link: string; // <-- Thêm trường link
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
        link: "/services/corporate", // <-- Link riêng
    },
    {
        title: "Cross-Border VAT Optimisation",
        description:
            "Navigate the complexities of Value Added Tax with clarity. We provide strategic advice to ensure your business remains compliant and efficient across multiple jurisdictions.",
        imageUrl: "/assets/show3.png",
        link: "/services/vat", // <-- Link riêng
    },
];

const COMPOSITE_IMAGE_URL = "/assets/show1.png";

//-----------------------------------------------------
// 3. COMPONENT CHÍNH
//-----------------------------------------------------

export const CoreStrategiesSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="w-full py-16 md:py-24">
            {/* Tiêu đề Section */}
            <div className="text-center mb-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="gotham text-yellow-600 text-lg md:text-xl font-medium">Our Services</p>
                <h1 className="trajan-pro text-3xl md:text-5xl font-medium text-gray-900 mt-6">
                    Achieve Your Goals with Our Core Strategies
                </h1>
            </div>

            {/* Khối chính */}
            <div
                className="relative h-[780px] rounded-none overflow-hidden shadow-lg w-full"
                onMouseLeave={() => setHoveredIndex(null)}
            >
                {/* Ảnh nền mặc định */}
                <motion.img
                    src={COMPOSITE_IMAGE_URL}
                    alt="Core Strategy Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ opacity: 1 }}
                />

                {/* Ảnh hover */}
                {strategies.map((strategy, index) => (
                    <motion.img
                        key={strategy.imageUrl}
                        src={strategy.imageUrl}
                        alt={strategy.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                ))}

                {/* Lưới nội dung */}
                <div className="absolute inset-0 grid grid-cols-3 z-10">
                    {strategies.map((strategy, index) => {
                        const animateState = hoveredIndex === index ? "hover" : "rest";

                        return (
                            <div
                                key={strategy.title}
                                className="relative h-full"
                                onMouseEnter={() => setHoveredIndex(index)}
                            >
                                {/* Lớp phủ */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 p-6 bg-[#BC9750]/70 backdrop-blur-xs
                                    text-[#041122] flex flex-col justify-start"
                                    variants={overlayVariants}
                                    animate={animateState}
                                >
                                    <h3 className="arial-nova text-3xl font-medium flex items-center max-w-[280px] sm:max-w-[320px] md:max-w-[260px] leading-tight">
                                        {strategy.title}
                                    </h3>

                                    {/* Nội dung chi tiết */}
                                    <motion.div
                                        className="mt-4 space-y-4"
                                        variants={contentVariants}
                                        animate={animateState}
                                    >
                                        <p className="arial-nova text-lg leading-relaxed text-[#4D4946]">
                                            {strategy.description}
                                        </p>

                                        {/* Nút có link riêng */}
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

                {/* Đường kẻ phân chia */}
                <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/30 z-20 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white/30 z-20 pointer-events-none"></div>
            </div>
        </section>
    );
};
