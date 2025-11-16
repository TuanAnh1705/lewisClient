"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Mail, MapPin, Search, Phone, X, Loader2, ChevronDown, ChevronUp, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";

interface BlogPost {
    id: number;
    title: string;
    slug: string;
    coverImage: string | null;
    excerpt?: string;
    wpCreatedAt?: string;
}

export function Header() {
    const [isAboutOpen, setIsAboutOpen] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileAboutOpen, setMobileAboutOpen] = useState(false);
    const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<BlogPost[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showAllResults, setShowAllResults] = useState(false);
    const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
    const [isAtTop, setIsAtTop] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const searchDialogRef = useRef<HTMLDivElement>(null);

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isSearchOpen &&
                searchDialogRef.current &&
                !searchDialogRef.current.contains(event.target as Node)
            ) {
                setIsSearchOpen(false);
                setSearchQuery("");
                setSearchResults([]);
                setShowAllResults(false);
            }
        };

        if (isSearchOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isSearchOpen]);

    // Prevent body scroll when search dialog or mobile menu is open
    useEffect(() => {
        if (isSearchOpen || isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isSearchOpen, isMobileMenuOpen]);

    // Close search dialog on ESC key
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                if (isSearchOpen) {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                    setSearchResults([]);
                    setShowAllResults(false);
                }
                if (isMobileMenuOpen) {
                    setIsMobileMenuOpen(false);
                }
            }
        };

        document.addEventListener("keydown", handleEscKey);
        return () => document.removeEventListener("keydown", handleEscKey);
    }, [isSearchOpen, isMobileMenuOpen]);

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

    // Focus input when search opens
    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Search function
    useEffect(() => {
        const searchPosts = async () => {
            if (searchQuery.trim() === "") {
                setSearchResults([]);
                setShowAllResults(false);
                return;
            }

            setIsSearching(true);
            try {
                const response = await api.get("/api/post");
                const allPosts = response.data.posts || [];

                // Filter posts by search query
                const filtered = allPosts.filter((post: BlogPost) =>
                    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
                );

                setSearchResults(filtered);
                setShowAllResults(false);
            } catch (error) {
                console.error("Search error:", error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        };

        const debounceTimer = setTimeout(() => {
            searchPosts();
        }, 300);

        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    const handleSearchToggle = () => {
        setIsSearchOpen(!isSearchOpen);
        if (isSearchOpen) {
            setSearchQuery("");
            setSearchResults([]);
            setShowAllResults(false);
        }
    };

    const handleSearchResultClick = () => {
        setIsSearchOpen(false);
        setSearchQuery("");
        setSearchResults([]);
        setShowAllResults(false);
    };

    const handleMobileMenuClose = () => {
        setIsMobileMenuOpen(false);
        setMobileAboutOpen(false);
        setMobileServicesOpen(false);
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    // Get displayed results (3 or all)
    const displayedResults = showAllResults ? searchResults : searchResults.slice(0, 3);
    const hasMoreResults = searchResults.length > 3;

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
            {/* Main navigation */}
            <div className="bg-white relative">
                <div className="container mx-auto flex justify-between items-center py-3 md:py-4 px-4">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-3">
                        <Image
                            src="/assets/logo.png"
                            alt="LSJ TAX"
                            width={100}
                            height={30}
                            className="md:w-[130px] md:h-17"
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation menu */}
                    <nav className="arial-nova hidden lg:flex gap-6 text-sm font-medium uppercase text-gray-700 tracking-wide">
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
                                                    <div className="w-32 h-32 relative overflow-hidden shrink-0">
                                                        <Image
                                                            src="/assets/lewisNav.png"
                                                            alt="Lewis - Founder"
                                                            fill
                                                            className="object-cover"
                                                        />
                                                    </div>

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
                                                            <div className="absolute inset-0 bg-black/70 z-10" />
                                                            <Image
                                                                src={service.image}
                                                                alt={service.title}
                                                                fill
                                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                            />

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
                        <button
                            onClick={handleSearchToggle}
                            aria-label="Search"
                            className="text-gray-600 hover:text-[#BC9750] transition-colors"
                        >
                            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>
                    </nav>

                    {/* Right: Desktop button and Mobile controls */}
                    <div className="flex items-center gap-2 md:gap-4">
                        {/* Mobile Search Button */}
                        <button
                            onClick={handleSearchToggle}
                            aria-label="Search"
                            className="lg:hidden text-gray-600 hover:text-[#BC9750] transition-colors p-2"
                        >
                            {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                        </button>

                        {/* Desktop CTA Button */}
                        <Link href="/contact" className="hidden md:block">
                            <Button
                                className={cn(
                                    "gotham bg-[#BC9750] text-white rounded-none px-4 lg:px-6 py-2 uppercase tracking-wide text-xs lg:text-sm",
                                    "hover:bg-[#726857] transition-colors"
                                )}
                            >
                                <span className="hidden lg:inline">Become Our Client</span>
                                <span className="lg:hidden">Get Started</span>
                            </Button>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            aria-label="Toggle menu"
                            className="lg:hidden text-gray-600 hover:text-[#BC9750] transition-colors p-2"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            {/* Backdrop */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black/50 z-40"
                                onClick={handleMobileMenuClose}
                            />

                            {/* Menu Panel */}
                            <motion.div
                                initial={{ x: "100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "100%" }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl overflow-y-auto"
                            >
                                <div className="p-6">
                                    {/* Close Button */}
                                    <div className="flex justify-end mb-6">
                                        <button
                                            onClick={handleMobileMenuClose}
                                            className="text-gray-600 hover:text-[#BC9750] transition-colors"
                                        >
                                            <X size={28} />
                                        </button>
                                    </div>

                                    {/* Logo */}
                                    <Link href="/" onClick={handleMobileMenuClose} className="block mb-8">
                                        <Image
                                            src="/assets/logo.png"
                                            alt="LSJ TAX"
                                            width={120}
                                            height={40}
                                        />
                                    </Link>

                                    {/* Mobile Navigation Links */}
                                    <nav className="space-y-1">
                                        <Link
                                            href="/"
                                            onClick={handleMobileMenuClose}
                                            className="block py-3 px-4 text-gray-700 hover:bg-[#BC9750]/10 hover:text-[#BC9750] transition-colors arial-nova uppercase tracking-wide"
                                        >
                                            Home
                                        </Link>

                                        {/* About Us Accordion */}
                                        <div>
                                            <button
                                                onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                                                className="w-full flex justify-between items-center py-3 px-4 text-gray-700 hover:bg-[#BC9750]/10 hover:text-[#BC9750] transition-colors arial-nova uppercase tracking-wide"
                                            >
                                                <span>About Us</span>
                                                <ChevronDown
                                                    className={cn(
                                                        "transition-transform",
                                                        mobileAboutOpen && "rotate-180"
                                                    )}
                                                    size={20}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {mobileAboutOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden bg-gray-50"
                                                    >
                                                        <Link
                                                            href="/about"
                                                            onClick={handleMobileMenuClose}
                                                            className="block py-3 px-8 text-sm text-gray-600 hover:text-[#BC9750] transition-colors arial-nova"
                                                        >
                                                            About LSJ TAX
                                                        </Link>
                                                        <div className="px-8 py-4 space-y-3 border-t border-gray-200">
                                                            <div className="flex items-center gap-2">
                                                                <Phone size={16} className="text-[#BC9750]" />
                                                                <a href="tel:+123456789" className="text-sm text-gray-600">
                                                                    +123 456 789
                                                                </a>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Mail size={16} className="text-[#BC9750]" />
                                                                <a href="mailto:lsjtax@infor.com" className="text-sm text-gray-600">
                                                                    lsjtax@infor.com
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Services Accordion */}
                                        <div>
                                            <button
                                                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                                                className="w-full flex justify-between items-center py-3 px-4 text-gray-700 hover:bg-[#BC9750]/10 hover:text-[#BC9750] transition-colors arial-nova uppercase tracking-wide"
                                            >
                                                <span>Services</span>
                                                <ChevronDown
                                                    className={cn(
                                                        "transition-transform",
                                                        mobileServicesOpen && "rotate-180"
                                                    )}
                                                    size={20}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {mobileServicesOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden bg-gray-50"
                                                    >
                                                        {services.map((service, index) => (
                                                            <Link
                                                                key={index}
                                                                href={service.href}
                                                                onClick={handleMobileMenuClose}
                                                                className="block py-3 px-8 text-sm text-gray-600 hover:text-[#BC9750] transition-colors arial-nova"
                                                            >
                                                                {service.title}
                                                            </Link>
                                                        ))}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <Link
                                            href="/ourClient"
                                            onClick={handleMobileMenuClose}
                                            className="block py-3 px-4 text-gray-700 hover:bg-[#BC9750]/10 hover:text-[#BC9750] transition-colors arial-nova uppercase tracking-wide"
                                        >
                                            Our Clients
                                        </Link>

                                        <Link
                                            href="/blog"
                                            onClick={handleMobileMenuClose}
                                            className="block py-3 px-4 text-gray-700 hover:bg-[#BC9750]/10 hover:text-[#BC9750] transition-colors arial-nova uppercase tracking-wide"
                                        >
                                            Resources
                                        </Link>

                                        <Link
                                            href="/contact"
                                            onClick={handleMobileMenuClose}
                                            className="block py-3 px-4 text-gray-700 hover:bg-[#BC9750]/10 hover:text-[#BC9750] transition-colors arial-nova uppercase tracking-wide"
                                        >
                                            Contact
                                        </Link>
                                    </nav>

                                    {/* Mobile CTA Button */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        <Link href="/contact" onClick={handleMobileMenuClose}>
                                            <Button
                                                className="w-full gotham bg-[#BC9750] text-white rounded-none px-6 py-3 uppercase tracking-wide hover:bg-[#726857] transition-colors"
                                            >
                                                Become Our Client
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Search Dialog */}
                <AnimatePresence>
                    {isSearchOpen && (
                        <>
                            {/* Backdrop Overlay */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="fixed inset-0 bg-black/50 z-60"
                                onClick={() => {
                                    setIsSearchOpen(false);
                                    setSearchQuery("");
                                    setSearchResults([]);
                                    setShowAllResults(false);
                                }}
                            />

                            {/* Search Dialog Box */}
                            <motion.div
                                ref={searchDialogRef}
                                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                                transition={{ duration: 0.3, ease: "easeOut" }}
                                className="fixed top-16 md:top-20 left-4 right-4 md:left-1/2 md:-translate-x-1/2 w-auto md:max-w-4xl bg-white shadow-2xl z-70"
                            >
                                <div className="px-4 md:px-8 py-4 md:py-6">
                                    {/* Search Input */}
                                    <div className="relative">
                                        <input
                                            ref={searchInputRef}
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search Resources..."
                                            className="w-full px-4 md:px-6 py-3 md:py-4 text-base md:text-lg border-2 border-[#BC9750] focus:outline-none focus:border-[#726857] transition-colors arial-nova"
                                        />
                                        <Search
                                            className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-[#BC9750]"
                                            size={20}
                                        />
                                    </div>

                                    {/* Search Results */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className="mt-4 md:mt-6 max-h-[60vh] md:max-h-[500px] overflow-y-auto pr-2 
                                            [&::-webkit-scrollbar]:w-2
                                            [&::-webkit-scrollbar-track]:bg-gray-100
                                            [&::-webkit-scrollbar-thumb]:bg-[#BC9750]
                                            [&::-webkit-scrollbar-thumb]:rounded-full
                                            [&::-webkit-scrollbar-thumb]:hover:bg-[#726857]"
                                    >
                                        {isSearching ? (
                                            <div className="flex justify-center items-center py-8">
                                                <Loader2 className="h-8 w-8 animate-spin text-[#BC9750]" />
                                            </div>
                                        ) : searchQuery && searchResults.length > 0 ? (
                                            <div className="space-y-4">
                                                <p className="text-xs md:text-sm text-[#4D4946] arial-nova">
                                                    Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}
                                                </p>

                                                {/* Results List */}
                                                <AnimatePresence mode="sync">
                                                    {displayedResults.map((post, index) => (
                                                        <motion.div
                                                            key={post.id}
                                                            initial={{ opacity: 0, x: -15 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            exit={{ opacity: 0 }}
                                                            transition={{
                                                                duration: showAllResults ? 0.25 : 0.05,
                                                                delay: showAllResults ? index * 0.05 : 0
                                                            }}
                                                        >
                                                            <Link
                                                                href={`/blog/${post.id}`}
                                                                onClick={handleSearchResultClick}
                                                                className="block group"
                                                            >
                                                                <div className="flex gap-3 md:gap-4 p-3 md:p-4 border border-gray-200 hover:border-[#BC9750] hover:shadow-md transition-all">
                                                                    {post.coverImage && (
                                                                        <div className="relative w-20 h-16 md:w-32 md:h-24 shrink-0 overflow-hidden">
                                                                            <Image
                                                                                src={post.coverImage}
                                                                                alt={post.title}
                                                                                fill
                                                                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                                            />
                                                                        </div>
                                                                    )}
                                                                    <div className="flex-1 min-w-0">
                                                                        <h4 className="arial-nova text-sm md:text-base font-medium text-[#041122] group-hover:text-[#BC9750] transition-colors mb-1 md:mb-2 line-clamp-2">
                                                                            {post.title}
                                                                        </h4>
                                                                        {post.excerpt && (
                                                                            <p className="text-xs md:text-sm text-[#4D4946] line-clamp-2 mb-1 md:mb-2">
                                                                                {post.excerpt}
                                                                            </p>
                                                                        )}
                                                                        <span className="text-[10px] md:text-xs text-[#BC9750]">
                                                                            {formatDate(post.wpCreatedAt)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </Link>
                                                        </motion.div>
                                                    ))}
                                                </AnimatePresence>

                                                {/* See All / Show Less Button */}
                                                {hasMoreResults && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        transition={{ delay: 0.2 }}
                                                        className="flex justify-center pt-4"
                                                    >
                                                        <button
                                                            onClick={() => setShowAllResults(!showAllResults)}
                                                            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-[#BC9750] text-white arial-nova text-sm md:text-base font-medium hover:bg-[#726857] transition-all shadow-md hover:shadow-lg"
                                                        >
                                                            {showAllResults ? (
                                                                <>
                                                                    <span>Show Less</span>
                                                                    <ChevronUp size={18} />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span>See All ({searchResults.length})</span>
                                                                    <ChevronDown size={18} />
                                                                </>
                                                            )}
                                                        </button>
                                                    </motion.div>
                                                )}
                                            </div>
                                        ) : searchQuery && searchResults.length === 0 ? (
                                            <div className="text-center py-8">
                                                <p className="text-sm md:text-base text-[#4D4946] arial-nova">
                                                    No results found for &quot;{searchQuery}&quot;
                                                </p>
                                            </div>
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-sm md:text-base text-[#4D4946] arial-nova">
                                                    Enter keywords to search for Resources
                                                </p>
                                            </div>
                                        )}
                                    </motion.div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </motion.header>
    );
}