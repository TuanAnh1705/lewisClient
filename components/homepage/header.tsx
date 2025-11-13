"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Linkedin, Instagram, Facebook, Mail, MapPin, Search, Phone } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Check if at top of page
            if (currentScrollY < 10) {
                setIsAtTop(true);
                setScrollDirection("up");
            } else {
                setIsAtTop(false);

                // Determine scroll direction
                if (currentScrollY > lastScrollY) {
                    setScrollDirection("down");
                } else {
                    setScrollDirection("up");
                }
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const services = [
        {
            title: "Explore All Services",
            subtitle: "",
            image: "/assets/svNav3.png",
            href: "/services"
        },
        {
            title: "Personal Income Tax",
            subtitle: "For the Global Professional",
            image: "/assets/svNav.png",
            href: "/services/personalIncome"
        },
        {
            title: "Corporate Tax",
            subtitle: "For the Ambitious Enterprise",
            image: "/assets/svNav1.png",
            href: "/services/corporate"
        },
        {
            title: "VAT",
            subtitle: "For Seamless Cross-Border Trade",
            image: "/assets/svNav2.png",
            href: "/services/vat"
        }
    ];

    return (
        <motion.header
            className={cn(
                "w-full border-b border-[#BC9750] transition-all duration-300",
                !isAtTop && "fixed top-0 left-0 right-0 z-50 shadow-lg"
            )}
            initial={false}
            animate={{
                y: scrollDirection === "down" && !isAtTop ? -200 : 0,
            }}
            transition={{
                duration: 0.3,
                ease: "easeInOut"
            }}
        >
            {/* Top bar - only show when at top of page */}
            {/* <AnimatePresence>
                {isAtTop && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#041122] text-xs border-b border-[#BC9750] overflow-hidden"
                    >
                        <div className="container mx-auto flex justify-between items-center py-2 px-4">
                            <div className="flex items-center gap-4">
                                <Link href="#" aria-label="Twitter X" className="hover:text-[#BC9750]">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 1200 1227"
                                        width="20"
                                        height="20"
                                        fill="currentColor"
                                    >
                                        <path d="M714.163 519.284L1177.67 0H1071.46L667.137 462.675L353.112 0H0L483.048 700.909L0 1226.37H106.215L531.557 736.008L866.888 1226.37H1200L714.163 519.284ZM583.284 672.009L537.412 606.056L144.615 79.534H303.009L600.282 505.529L646.154 571.482L1057.47 1150.47H899.074L583.284 672.009Z" />
                                    </svg>
                                </Link>

                                <Link href="#" aria-label="LinkedIn" className="hover:text-[#BC9750]">
                                    <Linkedin size={20} />
                                </Link>
                                <Link href="#" aria-label="Facebook" className="hover:text-[#BC9750]">
                                    <Facebook size={20} />
                                </Link>
                                <Link href="#" aria-label="Instagram" className="hover:text-[#BC9750]">
                                    <Instagram size={20} />
                                </Link>
                            </div>

                            <div className="flex items-center text-[#041122]">
                                <div className="arial-nova flex items-center gap-2">
                                    <MapPin size={20} />
                                    <span>771 Ngo Quyen, An Hai Ward, Vietnam</span>
                                </div>

                                
                                <div className="mx-4 h-4 w-px bg-[#BC9750]" />

                                <div className="arial-nova flex items-center gap-2">
                                    <Mail size={20} />
                                    <span>lsjtax@info.com</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence> */}

            {/* Main navigation */}
            <div className="bg-white relative">
                <div className="container mx-auto flex justify-between items-center py-4 px-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/assets/logo.png"
                            alt="LSJ TAX"
                            width={130}
                            height={40}
                            priority
                        />
                    </Link>

                    {/* Navigation menu */}
                    <nav className="arial-nova hidden md:flex gap-6 text-sm font-medium uppercase text-gray-700 tracking-wide">
                        <Link href="/" className="hover:text-[#BC9750] transition-colors">
                            Home
                        </Link>

                        {/* About Us with Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsAboutOpen(true)}
                            onMouseLeave={() => setIsAboutOpen(false)}
                        >
                            <Link href="/about" className="hover:text-[#BC9750] transition-colors">
                                about us
                            </Link>

                            <AnimatePresence>
                                {isAboutOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className={cn(
                                            "fixed left-0 right-0 bg-white shadow-xl border-t border-gray-200 z-50",
                                            isAtTop ? "top-[98px]" : "top-[95px]"
                                        )}
                                    >
                                        <div className="container mx-auto px-4">
                                            <div className="flex items-center justify-between py-8 gap-8">
                                                {/* Left Section - Founder Info */}
                                                <div className="flex items-center gap-6">
                                                    {/* Image */}
                                                    <div className="w-32 h-32 relative overflow-hidden shrink-0">
                                                        <Image
                                                            src="/assets/lewisNav.png"
                                                            alt="Lewis - Founder"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>

                                                    {/* Name & Description */}
                                                    <div className="md:max-w-[360px]">
                                                        <h3 className="text-lg font-medium trajan-pro text-[#000000] normal-case mb-1">
                                                            Lewis ...
                                                        </h3>
                                                        <p className="text-xs arial-nova text-[#BC9750] normal-case mb-3">
                                                            Founder of LSJ | TAX
                                                        </p>
                                                        <p className="text-xs arial-nova text-[#4D4946] leading-normal normal-case">
                                                            I am Lewis, a UK-chartered accountant and international
                                                            tax strategist. My firm was founded on a single principle: to
                                                            provide sophisticated, legally-sound tax strategies that
                                                            protect and enhance your wealth.
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Middle Section - Contact Info */}
                                                <div className="grid grid-cols-1 gap-1">
                                                    {/* Phone */}
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-[#041122] flex items-center justify-center shrink-0">
                                                            <Phone className="text-white" size={16} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] arial-nova font-medium text-[#4D4946] normal-case mb-1">
                                                                Have any questions?
                                                            </p>
                                                            <a
                                                                href="tel:+123456789"
                                                                className="text-[#BC9750] font-medium arial-nova text-sm"
                                                            >
                                                                +123 456 789
                                                            </a>
                                                        </div>
                                                    </div>

                                                    {/* Email */}
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-[#041122] flex items-center justify-center shrink-0">
                                                            <Mail className="text-white" size={16} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] arial-nova font-medium text-[#4D4946] normal-case mb-1">
                                                                Send us your email
                                                            </p>
                                                            <a
                                                                href="mailto:lsjtax@infor.com"
                                                                className="text-[#BC9750] font-medium arial-nova text-sm"
                                                            >
                                                                lsjtax@infor.com
                                                            </a>
                                                        </div>
                                                    </div>

                                                    {/* Location */}
                                                    <div className="flex items-start gap-3">
                                                        <div className="w-10 h-10 bg-[#041122] flex items-center justify-center shrink-0">
                                                            <MapPin className="text-white" size={16} />
                                                        </div>
                                                        <div>
                                                            <p className="text-[10px] arial-nova font-medium text-[#4D4946] normal-case mb-1">
                                                                Visit anytime
                                                            </p>
                                                            <a
                                                                href="https://maps.app.goo.gl/XvLFSm3DThKU9fx96"
                                                                className="text-[#BC9750] font-medium arial-nova text-sm"
                                                            >
                                                                771 Ngo Quyen, Son Tra Ward, Vietnam
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Right Section - Office Image */}
                                                <div className="w-56 h-32 relative overflow-hidden shrink-0">
                                                    <Image
                                                        src="/assets/hero.jpg"
                                                        alt="Office"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Services with Dropdown */}
                        <div
                            className="relative"
                            onMouseEnter={() => setIsServicesOpen(true)}
                            onMouseLeave={() => setIsServicesOpen(false)}
                        >
                            <Link href="/services" className="hover:text-[#BC9750] transition-colors">
                                Services
                            </Link>

                            <AnimatePresence>
                                {isServicesOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.2 }}
                                        className={cn(
                                            "fixed left-0 right-0 bg-white shadow-xl border-t border-gray-200 z-50",
                                            isAtTop ? "top-[98px]" : "top-[95px]"
                                        )}
                                    >
                                        <div className="container mx-auto px-4 py-8">
                                            <div className="grid grid-cols-4 gap-6">
                                                {services.map((service, index) => (
                                                    <Link
                                                        key={index}
                                                        href={service.href}
                                                        className="group"
                                                    >
                                                        <div className="relative h-48 overflow-hidden">
                                                            {/* Background Image with Overlay */}
                                                            <div className="absolute inset-0 bg-black/70 z-10" />
                                                            <Image
                                                                src={service.image}
                                                                alt={service.title}
                                                                fill
                                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />

                                                            {/* Text Content */}
                                                            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
                                                                {service.subtitle && (
                                                                    <p className="text-[#BC9750] text-xs arial-nova mb-2 normal-case">
                                                                        {service.subtitle}
                                                                    </p>
                                                                )}
                                                                <h3 className="text-white text-lg font-medium trajan-pro">
                                                                    {service.title}
                                                                </h3>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <Link href="/ourClient" className="hover:text-[#BC9750] transition-colors">
                            Our Clients
                        </Link>
                        <Link href="/blog" className="hover:text-[#BC9750] transition-colors">
                            Resources
                        </Link>
                        <Link href="/contact" className="hover:text-[#BC9750] transition-colors">
                            Contact
                        </Link>
                        <button aria-label="Search" className="text-gray-600 hover:text-[#BC9750]">
                            <Search size={20} />
                        </button>
                    </nav>

                    {/* Right: button */}
                    <div className="flex items-center gap-4">
                        <Link href="/contact">
                            <Button
                                className={cn(
                                    "gotham bg-[#BC9750] text-white rounded-none px-6 py-2 uppercase tracking-wide",
                                    "hover:bg-[#726857] transition-colors"
                                )}
                            >
                                Become Our Client
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.header>
    );
}