'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ServiceCardProps {
    subtitle: string;
    title: string;
    description: string;
    image: string;
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
    href: string;
}

const ServiceCard = ({
    subtitle,
    title,
    description,
    image,
    isHovered,
    onHover,
    onLeave,
    href,
}: ServiceCardProps) => {
    return (
        <Link href={href}>
            <motion.div
                className="relative border-b border-gray-700/50 overflow-hidden cursor-pointer group min-h-[180px] h-auto md:h-60"
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
                <div className="relative z-10 h-full flex items-center py-6 px-4 md:py-10 md:px-8">
                    {/* Layout khi KHÔNG hover */}
                    {!isHovered && (
                        <div className="flex items-center justify-between w-full">
                            {/* Left - Title */}
                            <div className="space-y-1 md:space-y-2">
                                <p className="text-[#BC9750] text-sm md:text-xl font-medium tracking-wide arial-nova">
                                    {subtitle}
                                </p>
                                <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-medium trajan-pro leading-tight">
                                    {title}
                                </h3>
                            </div>
                        </div>
                    )}

                    {/* Layout khi HOVER */}
                    {isHovered && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 items-center w-full">
                            {/* Left Column - Title */}
                            <div className="space-y-1 md:space-y-2">
                                <p className="text-[#BC9750] text-sm md:text-xl font-medium tracking-wide arial-nova">
                                    {subtitle}
                                </p>
                                <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-medium trajan-pro leading-tight">
                                    {title}
                                </h3>
                            </div>

                            {/* Right Column - Description & Arrow */}
                            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-10 md:-ml-4">
                                {/* Description */}
                                <p className="text-white/90 text-xs md:text-base leading-relaxed arial-nova flex-1">
                                    {description}
                                </p>

                                {/* Arrow Button */}
                                <motion.button
                                    className="flex items-center justify-center w-10 h-10 md:w-12 md:h-12 transition-all duration-300 shrink-0 self-end md:self-auto"
                                    initial={{ scale: 1 }}
                                    animate={{ scale: 1.1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <ArrowRight className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                </motion.button>
                            </div>
                        </div>
                    )}
                </div>
            </motion.div>
        </Link>
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
            href: '/services/personalIncome',
        },
        {
            subtitle: 'For the Ambitious Enterprise:',
            title: 'Corporate Tax',
            description:
                'Expansion should be a catalyst for growth, not a tax headache. We assist in structuring your company for tax-efficient cross-border operations, managing transfer pricing, and ensuring you meet all legal obligations in the UK and EU.',
            image: '/assets/sv2.png',
            href: '/services/corporate',
        },
        {
            subtitle: 'For Seamless Cross-Border Trade:',
            title: 'Value-Added Tax (VAT)',
            description:
                'VAT is one of the most complex areas of international business. Our advisory ensures your supply chain is structured efficiently, you are compliant with all regulations, and you avoid costly errors.',
            image: '/assets/sv3.png',
            href: '/services/vat',
        },
    ];

    return (
        <section className="py-12 md:py-24 lg:py-32">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Title */}
                <motion.h2
                    className="text-3xl md:text-5xl lg:text-6xl font-medium text-[#041122] mb-8 md:mb-16 trajan-pro"
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
                            href={service.href}
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