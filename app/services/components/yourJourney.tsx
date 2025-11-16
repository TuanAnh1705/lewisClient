'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// --- StepCard component (Không thay đổi) ---
interface Step {
    number: string;
    label: string;
    title: string;
    description: string;
}

interface StepCardProps {
    step: Step;
    isActive: boolean;
    index: number;
    totalSteps: number;
}

const StepCard = ({ step, isActive, index }: StepCardProps) => {
    return (
        <div className="relative flex items-center gap-8 md:gap-12 min-h-[400px]">
            {/* Number Box - Nhỏ hơn nữa */}
            <motion.div
                className={`w-10 h-10 flex items-center justify-center transition-all duration-500 shrink-0 ${
                    isActive
                        ? 'bg-[#041122] text-white'
                        : 'bg-white border-2 border-gray-300 text-gray-400'
                }`}
                animate={{
                    scale: isActive ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
            >
                <span className="text-sm font-medium gotham">{step.number}</span>
            </motion.div>

            {/* Content - Rộng hơn */}
            <div className="flex-1  ">
                <div className="bg-[#F8F6F3] p-10 md:p-12 lg:p-10 space-y-5 min-h-[350px] ">
                    <p className="text-[#BC9750] text-sm md:text-2xl font-medium tracking-wider gotham">
                        {step.label}
                    </p>
                    <h3 className="text-2xl md:text-3xl lg:text-5xl font-medium text-[#041122] trajan-pro">
                        {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-xl leading-relaxed arial-nova md:mt-24 md:max-w-md">
                        {step.description}
                    </p>
                </div>
            </div>
        </div>
    );
};
// --- Hết StepCard component ---


export default function YourJourney() {
    const [activeStep, setActiveStep] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const steps: Step[] = [
        {
            number: '01',
            label: 'STEP 1',
            title: 'Discovery Call',
            description:
                'A confidential consultation to understand your financial situation, international footprint, and long-term goals.'
        },
        {
            number: '02',
            label: 'STEP 2',
            title: 'Strategy Design',
            description:
                'We conduct a deep analysis and design a bespoke, multi-faceted tax strategy documented in a clear action plan.'
        },
        {
            number: '03',
            label: 'STEP 3',
            title: 'Implementation',
            description:
                'We guide you through every step of implementing the strategy, coordinating with legal and financial partners as needed.'
        },
        {
            number: '04',
            label: 'STEP 4',
            title: 'Ongoing Review',
            description:
                'The world changes, and so should your strategy. We provide ongoing support to adapt your plan to new regulations and opportunities.'
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            if (!containerRef.current) return;

            const container = containerRef.current;
            const stepElements = container.querySelectorAll('[data-step]');

            stepElements.forEach((element, index) => {
                const rect = element.getBoundingClientRect();
                const elementMiddle = rect.top + rect.height / 2;
                const screenMiddle = window.innerHeight / 2;

                if (elementMiddle < screenMiddle && elementMiddle > 0) {
                    setActiveStep(index);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section className="relative py-16 md:py-24 lg:py-32 md:-mt-28 md:-mb-20">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-5 gap-12 lg:gap-16" ref={containerRef}>
                    {/* Left Column - Sticky Title (2/5) */}
                    <div className="relative h-full lg:col-span-2">
                        <div className="lg:sticky lg:top-24">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium text-[#041122] trajan-pro leading-tight">
                                Your Journey
                                to Financial
                                Clarity
                            </h2>
                        </div>
                    </div>

                    {/* Right Column - Steps with Timeline (3/5) */}
                    <div className="relative lg:col-span-3">
                        {/* Vertical Line Container */}
                        <div className="absolute left-5 top-0 bottom-0 w-0.5">
                            {/* Full gray line */}
                            <div className="absolute inset-0 bg-gray-300" />

                            {/* Active black line segment - CHỈ phần active */}
                            {steps.map((_, index) => {
                                const isCurrentActive = index === activeStep;
                                return (
                                    <motion.div
                                        key={index}
                                        className="absolute left-0 bg-[#041122]"
                                        style={{
                                            top: `${(index / steps.length) * 100}%`,
                                            height: `${(1 / steps.length) * 100}%`,
                                            width: '100%'
                                        }}
                                        initial={{ scaleY: 0 }}
                                        animate={{
                                            scaleY: isCurrentActive ? 1 : 0,
                                            transformOrigin: 'top'
                                        }}
                                        transition={{ duration: 0.5 }}
                                    />
                                );
                            })}
                        </div>

                        {/* Steps */}
                        {/* THAY ĐỔI Ở ĐÂY: 'space-y-0' -> 'space-y-16' */}
                        <div className="space-y-16">
                            {steps.map((step, index) => (
                                <div key={index} data-step={index}>
                                    <StepCard
                                        step={step}
                                        isActive={activeStep === index}
                                        index={index}
                                        totalSteps={steps.length}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}