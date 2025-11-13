'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PrincipleCardProps {
    title: string;
    description: string;
    image: string;
    index: number;
    isHovered: boolean;
    hoveredIndex: number | null;
    onHover: () => void;
    onLeave: () => void;
}

const PrincipleCard = ({
    title,
    description,
    image,
    index,
    isHovered,
    hoveredIndex,
    onHover,
    onLeave
}: PrincipleCardProps) => {

    const isLeft = index === 0;
    const isCenter = index === 1;
    const isRight = index === 2;

    const getWidth = () => {
        if (hoveredIndex === null) {
            return isCenter ? '530px' : '360px';
        }
        if (isHovered) {
            return '530px';
        }
        return '360px';
    };

    const getTransformOrigin = () => {
        if (isLeft) return 'left';
        if (isRight) return 'right';
        return 'center';
    };

    const isExpanded = (hoveredIndex === null && isCenter) || isHovered;

    return (
        <div
            // transition-all duration-700 ở đây là để cho width (getWidth())
            className="relative h-[400px] overflow-hidden cursor-pointer transition-all duration-700 ease-out"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            style={{
                width: getWidth(),
                transformOrigin: getTransformOrigin(),
                animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`
            }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 transition-transform duration-700 ease-out hover:scale-110">
                <Image src={image} alt={title} fill className="object-cover" />

                {/* Overlay trắng */}
                <div
                    className={`absolute inset-0 bg-linear-to-r from-white/90 via-white/60 to-transparent transition-opacity duration-700 ${
                        isExpanded ? 'opacity-0' : 'opacity-100'
                    }`}
                />

                {/* Overlay đen */}
                <div
                    className={`absolute inset-0 bg-linear-to-r from-[#041122] via-[#041122]/30 to-transparent transition-all duration-700 ${
                        isExpanded ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{
                        animation: isExpanded
                            ? 'slideInFromLeft 0.7s ease-out forwards'
                            : 'none'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-8 md:p-10 md:pl-5">
                {/* Title */}
                <h3
                    className={`trajan-pro text-2xl md:text-3xl font-serif transition-all duration-500 ${
                        isExpanded ? 'text-white' : 'text-[#000000]'
                    } ${isHovered ? '-translate-y-2' : ''}`}
                >
                    {title}
                </h3>

                {/* Description */}
                <div className="space-y-3">
                    <p
                        className={`arial-nova text-sm md:text-lg leading-normal 
                            ${/* ✅ DÙNG CÁC CLASS NÀY */''}
                            transition-all ease-out 
                            ${/* Đây là mấu chốt: */''}
                            ${isExpanded
                                // KHI MỞ RỘNG: Chờ 700ms, rồi fade-in trong 500ms
                                ? 'opacity-100 translate-y-0 duration-500 delay-580'
                                // KHI THU LẠI: Biến mất trong 150ms (nhanh), không delay
                                : 'opacity-0 translate-y-3 duration-150 delay-0'
                            }
                            ${/* ------------------------- */''}
                            ${isExpanded ? 'text-white' : 'text-[#000000]'}`
                        }
                    >
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};


// Component `GuidingPrinciples` (cha) của bạn giữ nguyên, không cần thay đổi.
// Dưới đây là component cha để bạn có cái nhìn toàn cảnh.

export default function GuidingPrinciples() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const principles = [
        {
            title: 'Strategy First',
            description: 'We are strategists, not just accountants. Every recommendation is part of a bigger picture designed to meet your long-term goals.',
            image: '/assets/ab2.png'
        },
        {
            title: 'Unwavering Integrity',
            description: 'Our advice is built on a foundation of proven legal and financial principles. We build trust through transparency and professionalism.',
            image: '/assets/ab3.png'
        },
        {
            title: 'Bespoke Solutions',
            description: 'Your financial situation is unique. Your strategy should be too. We reject templates and build custom frameworks for every client.',
            image: '/assets/ab4.png'
        }
    ];

    return (
        <section className="bg-[#F2F0EC] py-4 md:py-8 lg:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="trajan-pro text-4xl md:text-5xl lg:text-6xl font-medium text-center mb-6 md:mb-10 text-gray-900">
                    Our Guiding Principles
                </h2>
                <div className="flex justify-center gap-6">
                    {principles.map((principle, index) => (
                        <PrincipleCard
                            key={index}
                            title={principle.title}
                            description={principle.description}
                            image={principle.image}
                            index={index}
                            isHovered={hoveredIndex === index}
                            hoveredIndex={hoveredIndex}
                            onHover={() => setHoveredIndex(index)}
                            onLeave={() => setHoveredIndex(null)}
                        />
                    ))}
                </div>
            </div>
            <style jsx global>{`
                @keyframes fadeInUp {
                  from {
                    opacity: 0;
                    transform: translateY(30px);
                  }
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
                @keyframes slideInFromLeft {
                  from {
                    transform: translateX(-100%);
                    opacity: 0;
                  }
                  to {
                    transform: translateX(0);
                    opacity: 1;
                  }
                }
            `}</style>
        </section>
    );
}