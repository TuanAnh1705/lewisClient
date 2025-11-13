"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

//-----------------------------------------------------
// 1. ĐỊNH NGHĨA VARIANTS (Không thay đổi)
//-----------------------------------------------------

// Lớp phủ nội dung (hiệu ứng "đẩy lên")
const overlayVariants: Variants = {
    rest: {
        y: "calc(100% - 7rem)", // Chỉ để lộ 7rem (chiều cao tiêu đề)
    },
    hover: {
        y: 0,
        transition: { duration: 0.4, ease: "easeInOut" },
    },
};

// Nội dung bên trong (mô tả + button)
const contentVariants: Variants = {
    rest: { opacity: 0, y: 10 },
    hover: {
        opacity: 1,
        y: 0,
        transition: { delay: 0.2, duration: 0.3 },
    },
};

//-----------------------------------------------------
// 2. DỮ LIỆU (DATA) VÀ TYPE (Không thay đổi)
//-----------------------------------------------------

interface StrategyCardProps {
    title: string;
    description: string;
    imageUrl: string;
}

const strategies: StrategyCardProps[] = [
    {
        title: "Personal Income Tax Strategy",
        description: "For executives, investors, and professionals living and working across borders. We ensure you remain compliant while optimising your tax position to preserve the wealth you work hard to create.",
        imageUrl: "/assets/show1.png" // Ảnh khi hover cột 1
    },
    {
        title: "Corporate Tax Structuring",
        description: "For UK companies expanding into Europe or EU companies operating in the UK. We design tax-efficient corporate structures that support growth and minimise fiscal drag.",
        imageUrl: "/assets/show2.png" // Ảnh khi hover cột 2
    },
    {
        title: "Cross-Border VAT Optimisation",
        description: "Navigate the complexities of Value Added Tax with clarity. We provide strategic advice to ensure your business remains compliant and efficient across multiple jurisdictions.",
        imageUrl: "/assets/show3.png" // Ảnh khi hover cột 3
    },
];

const COMPOSITE_IMAGE_URL = "/assets/show1.png";

//-----------------------------------------------------
// 3. COMPONENT CHÍNH
//-----------------------------------------------------
export const CoreStrategiesSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        // <-- SỬA LỖI 1: Xóa padding 'px-' khỏi section
        <section className="w-full py-16 md:py-24">

            {/* Tiêu đề Section */}
            {/* <-- SỬA LỖI 1: Thêm padding 'px-' vào div tiêu đề để nó giữ căn lề */}
            <div className="text-center mb-12 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="gotham text-yellow-600 text-lg md:text-xl font-medium">Our Services</p>
                <h1 className="trajan-pro text-3xl md:text-5xl font-medium text-gray-900 mt-6">
                    Achieve Your Goals with Our Core Strategies
                </h1>
            </div>

            {/* KHỐI CHÍNH (SINGLE BLOCK) */}
            <div
                // <-- SỬA LỖI 1: Đổi 'max-w-full mx-auto' thành 'w-full'
                className="relative h-[780px] rounded-none overflow-hidden shadow-lg w-full"
                onMouseLeave={() => setHoveredIndex(null)} // Reset về 'null' khi chuột rời khỏi toàn bộ khối
            >

                {/* <-- SỬA LỖI 2: THAY ĐỔI TOÀN BỘ LOGIC HIỂN THỊ ẢNH */}

                {/* 1. ẢNH NỀN MẶC ĐỊNH (LUÔN HIỂN THỊ Ở DƯỚI CÙNG) */}
                <motion.img
                    src={COMPOSITE_IMAGE_URL}
                    alt="Core Strategy Background"
                    className="absolute inset-0 w-full h-full object-cover"
                    animate={{ opacity: 1 }} // Luôn luôn hiển thị
                />

                {/* 2. CÁC ẢNH KHI HOVER (ĐÈ LÊN TRÊN, MẶC ĐỊNH LÀ TRONG SUỐT) */}
                {strategies.map((strategy, index) => (
                    <motion.img
                        key={strategy.imageUrl}
                        src={strategy.imageUrl}
                        alt={strategy.title}
                        className="absolute inset-0 w-full h-full object-cover"
                        initial={{ opacity: 0 }}
                        // Chỉ animate opacity lên 1 khi index khớp với index đang hover
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                ))}

                {/* 2. LƯỚI 3 CỘT (GRID) CHO NỘI DUNG VÀ HOVER (Không thay đổi) */}
                <div className="absolute inset-0 grid grid-cols-3 z-10">

                    {strategies.map((strategy, index) => {
                        let animateState = "rest";
                        if (hoveredIndex === index) {
                            animateState = "hover";
                        }

                        return (
                            <div
                                key={strategy.title}
                                className="relative h-full"
                                onMouseEnter={() => setHoveredIndex(index)}
                            >
                                {/* Lớp phủ nội dung trượt lên */}
                                <motion.div
                                    className="absolute bottom-0 left-0 right-0 p-6 bg-[#BC9750]/70 backdrop-blur-xs
                             text-[#041122] flex flex-col justify-start"
                                    variants={overlayVariants}
                                    animate={animateState}
                                >
                                    <h3 className="arial-nova text-3xl font-medium flex items-center max-w-[280px] sm:max-w-[320px] md:max-w-[260px] leading-tight">
                                        {strategy.title}
                                    </h3>
                                    {/* Nội dung chi tiết (mô tả, button) */}
                                    <motion.div
                                        className="mt-4 space-y-4"
                                        variants={contentVariants}
                                        animate={animateState}
                                    >
                                        <p className="arial-nova text-lg leading-relaxed text-[#4D4946]">
                                            {strategy.description}
                                        </p>
                                        <button
                                            className="gotham flex items-center gap-2 px-4 py-2 
                                  rounded-none bg-white text-sm font-medium
                                 hover:bg-[#041122] hover:text-white transition-colors"
                                        >
                                            Explore Now
                                            <ArrowUpRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>

                {/* 3. ĐƯỜNG KẺ (LINE) PHÂN CHIA (Không thay đổi) */}
                <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/30 z-20 pointer-events-none"></div>
                <div className="absolute top-0 bottom-0 left-2/3 w-px bg-white/30 z-20 pointer-events-none"></div>

            </div>
        </section>
    );
};