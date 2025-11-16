'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

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
    onLeave,
}: PrincipleCardProps) => {

    const [isDesktop, setIsDesktop] = useState(false);

    useEffect(() => {
        const checkDesktop = () => {
            setIsDesktop(window.innerWidth >= 1024);
        };

        checkDesktop();
        window.addEventListener('resize', checkDesktop);

        return () => window.removeEventListener('resize', checkDesktop);
    }, []);

    const isLeft = index === 0;
    const isCenter = index === 1;
    const isRight = index === 2;

    const getWidth = () => {
        if (!isDesktop) return undefined;
        
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
            className="relative h-[300px] md:h-[350px] lg:h-[400px] overflow-hidden lg:cursor-pointer lg:transition-all lg:duration-700 lg:ease-out w-full lg:w-auto"
            onMouseEnter={onHover}
            onMouseLeave={onLeave}
            style={{
                width: getWidth(),
                transformOrigin: getTransformOrigin(),
                animation: isDesktop ? `fadeInUp 0.8s ease-out ${index * 0.2}s both` : 'none'
            }}
        >
            {/* Background Image */}
            <div className="absolute inset-0 lg:transition-transform lg:duration-700 lg:ease-out lg:hover:scale-110">
                <Image src={image} alt={title} fill className="object-cover" />

                {/* Overlay trắng - chỉ trên desktop */}
                <div
                    className={`absolute inset-0 bg-linear-to-r from-white/90 to-transparent 
                        opacity-0
                        ${isExpanded ? 'lg:opacity-0' : 'lg:opacity-100'}
                        lg:transition-opacity lg:duration-700
                    `}
                />

                {/* Overlay đen - chỉ trên desktop */}
                <div
                    className={`absolute inset-0 bg-linear-to-r from-[#041122] to-transparent
                        opacity-100
                        ${isExpanded ? 'lg:opacity-100' : 'lg:opacity-0'}
                        lg:transition-all lg:duration-700
                    `}
                    style={{
                        animation: isDesktop && isExpanded
                            ? 'slideInFromLeft 0.7s ease-out forwards'
                            : 'none'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative h-full flex flex-col justify-between p-6 md:p-8 lg:p-10 lg:pl-5">
                {/* Title */}
                <h3
                    className={`trajan-pro text-xl md:text-2xl lg:text-3xl font-serif 
                        text-white
                        lg:transition-all lg:duration-500
                        ${isExpanded ? 'lg:text-white' : 'lg:text-[#000000]'}
                        ${isHovered ? 'lg:-translate-y-2' : ''}
                    `}
                >
                    {title}
                </h3>

                {/* Description */}
                <div className="space-y-3">
                    <p
                        className={`arial-nova text-sm md:text-base lg:text-lg leading-normal 
                            text-white opacity-100
                            lg:transition-all lg:ease-out
                            ${isExpanded
                                ? 'lg:opacity-100 lg:translate-y-0 lg:duration-500 lg:delay-580 lg:text-white'
                                : 'lg:opacity-0 lg:translate-y-3 lg:duration-150 lg:delay-0 lg:text-[#000000]'
                            }
                        `}
                    >
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

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
        <section className="bg-[#F2F0EC] py-8 md:py-10 lg:py-14">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="trajan-pro text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-medium text-center mb-8 md:mb-10 lg:mb-12 text-gray-900">
                    Our Guiding Principles
                </h2>
                
                <div className="flex flex-col lg:flex-row justify-center gap-4 md:gap-5 lg:gap-6">
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