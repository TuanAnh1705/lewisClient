'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link'; // 👈 [BƯỚC 1] Import Link

interface ServiceCardProps {
    subtitle: string;
    title: string;
    description: string;
    image: string;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
    href: string; // 👈 [BƯỚC 2] Thêm href vào props
}

const ServiceCard = ({
    subtitle,
    title,
    description,
    image,
    isHovered,
    onHover,
    onLeave,
    href, // 👈 [BƯỚC 2] Nhận href
}: ServiceCardProps) => {
    return (
        // 👇 [BƯỚC 3] Bọc toàn bộ thẻ bằng <Link>
        <Link href={href}>
            <motion.div
                className="relative border-b border-gray-700/50 overflow-hidden cursor-pointer group h-[220px] md:h-60"
                onMouseEnter={onHover}
                onMouseLeave={onLeave}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Background Image với Split Effect */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="absolute inset-0 z-0"
                            initial={{ clipPath: 'inset(0 0 100% 0)' }}
                            animate={{ clipPath: 'inset(0 0 0 0)' }}
                            exit={{ clipPath: 'inset(0 0 100% 0)' }}
                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                        >
                            <div
                                className="w-full h-full bg-cover bg-center"
                                style={{ backgroundImage: `url(${image})` }}
                            >
                                {/* Dark overlay */}
                                <div className="absolute inset-0 bg-black/60" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content */}
                <div className="relative z-10 h-full flex items-center py-8 md:py-10 px-6 md:px-8">
                    {/* Layout khi KHÔNG hover */}
                    {!isHovered && (
                        <div className="flex items-center justify-between w-full">
                            {/* Left - Title */}
                            <div className="space-y-2">
                                <p className="text-[#BC9750] text-lg md:text-xl font-medium tracking-wide arial-nova">
                                    {subtitle}
                                </p>
                                <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-medium trajan-pro">
                                    {title}
                                </h3>
                            </div>
                        </div>
                    )}

                    {/* Layout khi HOVER */}
                    {isHovered && (
                        <div className="grid md:grid-cols-2 gap-8 items-center w-full">
                            {/* Left Column - Title */}
                            <div className="space-y-2">
                                <p className="text-[#BC9750] text-lg md:text-xl font-medium tracking-wide arial-nova">
                                    {subtitle}
                                </p>
                                <h3 className="text-white text-2xl md:text-3xl lg:text-4xl font-medium trajan-pro">
                                    {title}
                                </h3>
                            </div>

                            {/* Right Column - Description & Arrow */}
                            <div className="flex items-center justify-between gap-10 -ml-4">
                                {/* Description - Dịch cố định sang trái */}
                                <p className="text-white/90 text-sm md:text-base leading-relaxed arial-nova flex-1">
                                    {description}
                                </p>

                                {/* Arrow Button */}
                                <motion.button
                                    className="flex items-center justify-center w-12 h-12 transition-all duration-300 shrink-0"
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ArrowRight className="w-10 h-10 text-white" />
                                </motion.button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </Link> // 👈 [BƯỚC 3] Đóng thẻ <Link>
    );
};

export default function OurServices() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const services = [
        {
            subtitle: 'For the Global Professional:',
            title: 'Personal Income Tax',
            description:
                "Whether you're a UK non-dom, an executive on assignment in Europe, or an entrepreneur with international income streams, we provide clarity. We handle residency issues, double-taxation treaties, and strategic planning to ensure your personal wealth is protected and compliant.",
            image: '/assets/sv1.png',
            href: '/services/personalIncome', // 👈 [BƯỚC 1] Thêm link
        },
        {
            subtitle: 'For the Ambitious Enterprise:',
            title: 'Corporate Tax',
            description:
                'Expansion should be a catalyst for growth, not a tax headache. We assist in structuring your company for tax-efficient cross-border operations, managing transfer pricing, and ensuring you meet all legal obligations in the UK and EU.',
            image: '/assets/sv2.png',
            href: '/services/corporate', // 👈 [BƯỚC 1] Thêm link
        },
        {
            subtitle: 'For Seamless Cross-Border Trade:',
            title: 'Value-Added Tax (VAT)',
            description:
                'VAT is one of the most complex areas of international business. Our advisory ensures your supply chain is structured efficiently, you are compliant with all regulations, and you avoid costly errors.',
            image: '/assets/sv3.png',
            href: '/services/vat', // 👈 [BƯỚC 1] Thêm link
        },
    ];

    return (
        <section className="py-16 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.h2
                    className="text-4xl md:text-5xl lg:text-6xl font-medium text-[#041122] mb-12 md:mb-16 trajan-pro"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Our Services
                </motion.h2>

                {/* Services List */}
                <div className="space-y-0 bg-[#041122]">
                    {services.map((service, index) => (
                        <ServiceCard
                            key={index}
                            subtitle={service.subtitle}
                            title={service.title}
                            description={service.description}
                            image={service.image}
                            href={service.href} // 👈 [BƯỚC 2] Truyền href vào
                            isHovered={hoveredIndex === index}
                            onHover={() => setHoveredIndex(index)}
                            onLeave={() => setHoveredIndex(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}