'use client';

import Image from 'next/image';
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// --- COMPONENT STATITEM (Không thay đổi) ---
interface StatItemProps {
    value: string;
    label: string;
    index: number;
    isNumber: boolean;
    targetNumber?: number;
    hoveredIndex: number | null;
    onHover: () => void;
    onLeave: () => void;
}

const StatItem = ({ value, label, index, isNumber, targetNumber, hoveredIndex, onHover, onLeave }: StatItemProps) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const count = useMotionValue(0);
    const rounded = useTransform(count, (latest) => Math.round(latest));

    const [displayValue, setDisplayValue] = useState('0');

    const isActive = hoveredIndex === null ? index === 0 : hoveredIndex === index;
    const opacity = isActive ? 1 : 0.5;

    useEffect(() => {
        if (isInView && isNumber && targetNumber) {
            const controls = animate(count, targetNumber, {
                duration: 2,
                ease: "easeOut"
            });

            const unsubscribe = rounded.on('change', (latest) => {
                if (value.includes('+')) {
                    setDisplayValue(`${latest}+`);
                } else if (value.includes('%')) {
                    setDisplayValue(`${latest}%`);
                } else {
                    setDisplayValue(`${latest}`);
                }
            });

            return () => {
                controls.stop();
                unsubscribe();
            };
        }
    }, [isInView, isNumber, targetNumber, count, rounded, value]);

    const finalDisplayValue = isNumber
        ? displayValue
        : (isInView ? value : '0');

    return (
        <motion.div
            ref={ref}
            className="text-center cursor-pointer transition-all duration-300"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
        >
            <div className="relative inline-block">
                <motion.h3
                    className="text-5xl md:text-6xl lg:text-7xl font-medium mb-4 trajan-pro"
                    style={{
                        color: '#BC9750',
                        opacity: opacity,
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    {finalDisplayValue}
                </motion.h3>
            </div>

            <div className='relative inline-block'>
                <p className="arial-nova text-sm md:text-base font-medium text-gray-600 max-w-[300px] mx-auto pb-2">
                    {label}
                </p>
                <motion.div
                    className="absolute -bottom-1 left-1/2 h-px bg-[#726857]"
                    initial={{ width: 0, x: '-50%' }}
                    animate={{
                        width: isActive ? '100%' : 0,
                        x: '-50%'
                    }}
                    transition={{
                        duration: 0.4,
                        ease: "easeOut"
                    }}
                />
            </div>

        </motion.div>
    );
};
// --- HẾT COMPONENT STATITEM ---


export default function WhyChooseUs() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const stats = [
        { value: '10+', label: 'Years of Combined Experience', isNumber: true, targetNumber: 10 },
        { value: '100%', label: 'Focus on UK-EU Cross-Border Tax', isNumber: true, targetNumber: 100 },
        { value: 'ACA', label: 'Chartered Accountant Qualification', isNumber: false },
        { value: '98%', label: 'Chartered Accountant Qualification', isNumber: true, targetNumber: 98 }
    ];

    return (
        <div className="min-h-screen md:-mb-5">
            {/* About Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">

                <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">

                    {/* Content Column (Cột text bên trái) */}
                    <div className="order-1 lg:order-1 lg:col-span-6 space-y-5">
                        <p className="text-[#BC9750] gotham font-medium text-xl tracking-wider">
                            Why Choose Us
                        </p>

                        <h2 className="text-4xl md:text-5xl lg:text-5xl font-medium trajan-pro leading-tight">
                            Your Chartered Partner in International Tax
                        </h2>

                        <div className="space-y-1 arial-nova text-[#4D4946] leading-normal text-lg">
                            <p>
                                Many offer tax advice, but few provide a truly bespoke, strategic framework. We redefine international tax advisory to suit your lifestyle and global ambitions. We are your strategists, not just accountants. We deliver unbiased, expert counsel backed by the highest professional qualifications.
                            </p>
                        </div>
                        <Link href="/contact">
                            <button className="gotham px-4 py-2.5 bg-[#BC9750] hover:bg-[#726857] text-white font-medium tracking-wide transition-colors duration-200 rounded-none hover:shadow-lg md:text-xs">
                                CONTACT OUR EXPERTS
                            </button>
                        </Link>
                    </div>

                    {/* Image Column (Cột ảnh bên phải) */}
                    <div className="order-2 lg:order-2 lg:col-span-6">
                        <div className="relative w-full max-w-[575px] mx-auto ">
                            <Image
                                src="/assets/ab5.png"
                                alt="tax"
                                width={575}
                                height={450}
                                className="object-cover rounded-none shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Statistics Section */}
            <section className="py-16 lg:py-24 lg:-mt-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
                        {stats.map((stat, index) => (
                            <StatItem
                                key={index}
                                value={stat.value}
                                label={stat.label}
                                index={index}
                                isNumber={stat.isNumber}
                                targetNumber={stat.targetNumber}
                                hoveredIndex={hoveredIndex}
                                onHover={() => setHoveredIndex(index)}
                                onLeave={() => setHoveredIndex(null)}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}