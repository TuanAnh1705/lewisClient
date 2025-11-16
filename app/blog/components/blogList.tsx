"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
    Loader2,
    Calendar,
    Tag,
    ArrowLeft,
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    ArrowUpRight,
} from "lucide-react";
import api from "@/lib/api";
import Image from "next/image";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useRouter } from "next/navigation";
import he from "he";


interface BlogPost {
    id: number;
    title: string;
    slug: string;
    coverImage: string | null;
    excerpt?: string;
    author?: string;
    wpCreatedAt?: string;
    categories?: string[];
}

export default function BlogSection() {
    const router = useRouter();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [latestIndex, setLatestIndex] = useState(0);
    const [direction, setDirection] = useState<"next" | "prev">("next");
    const perPage = 6;

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const res = await api.get("/api/post");
            setPosts(res.data.posts || []);
        } catch (err) {
            console.error("Error fetching posts:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Lấy 3 bài mới nhất cho Latest Insights
    const latestPosts = posts.slice(0, 3);
    const currentLatestPost = latestPosts[latestIndex];

    // 🔥 FIX: Sắp xếp From Our Desk theo bài mới nhất
    const deskPosts = [...posts].sort((a, b) => {
        // Sắp xếp theo wpCreatedAt giảm dần (mới nhất trước)
        const dateA = a.wpCreatedAt ? new Date(a.wpCreatedAt).getTime() : 0;
        const dateB = b.wpCreatedAt ? new Date(b.wpCreatedAt).getTime() : 0;
        return dateB - dateA;
    });

    const totalPages = Math.ceil(deskPosts.length / perPage);
    const paginatedPosts = deskPosts.slice((page - 1) * perPage, page * perPage);

    const handleLatestNext = () => {
        if (latestIndex < latestPosts.length - 1) {
            setDirection("next");
            setLatestIndex((prev) => prev + 1);
        }
    };

    const handleLatestPrev = () => {
        if (latestIndex > 0) {
            setDirection("prev");
            setLatestIndex((prev) => prev - 1);
        }
    };

    // Xử lý swipe gesture
    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const swipeThreshold = 50;

        if (info.offset.x > swipeThreshold) {
            handleLatestPrev();
        } else if (info.offset.x < -swipeThreshold) {
            handleLatestNext();
        }
    };

    const formatDate = (dateString?: string) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    if (loading) {
        return (
            <div className="flex justify-center py-32">
                <Loader2 className="h-10 w-10 animate-spin text-[#BC9750]" />
            </div>
        );
    }

    // Hiệu ứng animation cho slide
    const variants = {
        enter: (direction: "next" | "prev") => ({
            x: direction === "next" ? 100 : -100,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
            transition: { duration: 0.4 },
        },
        exit: (direction: "next" | "prev") => ({
            x: direction === "next" ? -100 : 100,
            opacity: 0,
            transition: { duration: 0.4 },
        }),
    };

    return (
        <div className="w-full bg-white py-12 md:py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* === THE LATEST INSIGHTS === */}
                <section className="mb-16 md:mb-20 overflow-hidden">
                    <h2
                        className="trajan-pro text-3xl md:text-5xl text-center font-medium text-[#041122] mb-8 md:mb-12 leading-tight overflow-visible"
                    >
                        GET THE LATEST INSIGHTS
                    </h2>

                    <div className="relative min-h-[550px] md:min-h-[400px] lg:min-h-[450px]">
                        <AnimatePresence mode="wait" custom={direction}>
                            {currentLatestPost && (
                                <motion.div
                                    key={currentLatestPost.id}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    drag={typeof window !== 'undefined' && window.innerWidth < 768 ? "x" : false}
                                    dragConstraints={{ left: 0, right: 0 }}
                                    dragElastic={0.2}
                                    onDragEnd={handleDragEnd}
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center absolute w-full touch-pan-y md:touch-auto"
                                >
                                    {/* Image - Clickable */}
                                    <div
                                        className="relative h-[280px] md:h-[400px] lg:h-[450px] w-full overflow-hidden lg:col-span-7 cursor-pointer group"
                                        onClick={() => router.push(`/blog/${currentLatestPost.id}`)}
                                    >
                                        {currentLatestPost.coverImage ? (
                                            <Image
                                                src={currentLatestPost.coverImage}
                                                alt={currentLatestPost.title}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-white flex items-center justify-center">
                                                <span className="text-gray-400">No image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-auto md:min-h-[400px] lg:min-h-[450px] py-0 lg:py-0">

                                        {/* Nhóm nội dung trên (Title + Excerpt) - Clickable */}
                                        <div
                                            className="space-y-4 md:space-y-6 cursor-pointer"
                                            onClick={() => router.push(`/blog/${currentLatestPost.id}`)}
                                        >
                                            <h3 className="trajan-pro text-xl md:text-3xl font-medium text-[#041122] leading-tight hover:text-[#BC9750] transition-colors">
                                                {currentLatestPost.title}
                                            </h3>
                                            <p className="arial-nova text-sm md:text-base text-[#4D4946] leading-relaxed line-clamp-3">
                                                {currentLatestPost.excerpt
                                                    ? he.decode(currentLatestPost.excerpt)
                                                    : "Fallback excerpt..."}
                                            </p>
                                        </div>

                                        <div className="space-y-0 md:space-y-6 mt-4 md:mt-6 lg:mt-0">
                                            {/* Mobile: Categories + Date + Arrows */}
                                            <div className="md:hidden">
                                                <div className="flex items-center justify-between gap-3">
                                                    {/* Categories + Date */}
                                                    <div className="flex items-center gap-3 text-xs text-[#4D4946] flex-1">
                                                        {currentLatestPost.categories?.length ? (
                                                            <div className="flex items-center gap-1.5">
                                                                <Tag size={14} className="text-[#BC9750]" />
                                                                <span className="arial-nova">
                                                                    {currentLatestPost.categories.join(", ")}
                                                                </span>
                                                            </div>
                                                        ) : null}
                                                        <span className="arial-nova">|</span>
                                                        <div className="flex items-center gap-1.5">
                                                            <Calendar size={14} className="text-[#BC9750]" />
                                                            <span className="arial-nova">
                                                                {formatDate(currentLatestPost.wpCreatedAt)}
                                                            </span>
                                                        </div>
                                                    </div>

                                                    {/* Navigation Arrows - Mobile */}
                                                    {latestPosts.length > 1 && (
                                                        <div className="flex gap-2 shrink-0">
                                                            <motion.button
                                                                onClick={handleLatestPrev}
                                                                disabled={latestIndex === 0}
                                                                aria-label="Previous post"
                                                                className="w-8 h-8 flex items-center justify-center text-[#BC9750] hover:border hover:border-[#726857] hover:text-[#726857] transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
                                                            >
                                                                <ArrowLeft size={16} />
                                                            </motion.button>

                                                            <motion.button
                                                                onClick={handleLatestNext}
                                                                disabled={latestIndex === latestPosts.length - 1}
                                                                aria-label="Next post"
                                                                className="w-8 h-8 flex items-center justify-center text-[#BC9750] hover:border hover:border-[#726857] hover:text-[#726857] transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
                                                            >
                                                                <ArrowRight size={16} />
                                                            </motion.button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Desktop: Categories + Date (without arrows) */}
                                            <div className="hidden md:flex items-center gap-4 text-sm text-[#4D4946]">
                                                {currentLatestPost.categories?.length ? (
                                                    <div className="flex items-center gap-2">
                                                        <Tag size={16} className="text-[#BC9750]" />
                                                        <span className="arial-nova">
                                                            {currentLatestPost.categories.join(", ")}
                                                        </span>
                                                    </div>
                                                ) : null}
                                                <span className="arial-nova">|</span>
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={16} className="text-[#BC9750]" />
                                                    <span className="arial-nova">
                                                        {formatDate(currentLatestPost.wpCreatedAt)}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Mobile: Button only */}
                                            <div className="md:hidden">
                                                <Link href={`/blog/${currentLatestPost.id}`}>
                                                    <button className="gotham bg-[#041122] text-[#BC9750] flex items-center gap-1 px-6 py-2.5 text-sm tracking-wider hover:bg-[#BC9750] hover:text-[#041122] transition-colors w-full justify-center">
                                                        Explore Now
                                                        <ArrowUpRight className="w-3.5 h-3.5" />
                                                    </button>
                                                </Link>
                                            </div>

                                            {/* Desktop: Button và Arrows cùng hàng */}
                                            <div className="hidden md:flex items-center justify-between">
                                                <Link href={`/blog/${currentLatestPost.id}`}>
                                                    <button className="gotham bg-[#041122] text-[#BC9750] flex items-center gap-1 px-8 py-3 text-base tracking-wider hover:bg-[#BC9750] hover:text-[#041122] transition-colors">
                                                        Explore Now
                                                        <ArrowUpRight className="w-4 h-4" />
                                                    </button>
                                                </Link>

                                                {/* Navigation Arrows - Desktop */}
                                                {latestPosts.length > 1 && (
                                                    <div className="flex gap-4">
                                                        <motion.button
                                                            onClick={handleLatestPrev}
                                                            disabled={latestIndex === 0}
                                                            aria-label="Previous post"
                                                            className="w-12 h-12 flex items-center justify-center text-[#BC9750] hover:border hover:border-[#726857] hover:text-[#726857] transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
                                                        >
                                                            <ArrowLeft size={24} />
                                                        </motion.button>

                                                        <motion.button
                                                            onClick={handleLatestNext}
                                                            disabled={latestIndex === latestPosts.length - 1}
                                                            aria-label="Next post"
                                                            className="w-12 h-12 flex items-center justify-center text-[#BC9750] hover:border hover:border-[#726857] hover:text-[#726857] transition-all duration-300 disabled:opacity-30 disabled:pointer-events-none"
                                                        >
                                                            <ArrowRight size={24} />
                                                        </motion.button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>

                {/* === FROM OUR DESK === */}
                <section>
                    <h2
                        className="trajan-pro text-3xl md:text-5xl text-center font-medium text-[#041122] mb-8 md:mb-12 leading-tight overflow-visible"
                    >
                        FROM OUR DESK
                    </h2>


                    {deskPosts.length === 0 ? (
                        <div className="text-center py-12 md:py-20">
                            <p className="arial-nova text-base md:text-lg text-[#4D4946]">No posts found</p>
                        </div>
                    ) : (
                        <>
                            {/* Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                                {paginatedPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="group bg-[#F2F0EC] overflow-hidden cursor-pointer"
                                        onClick={() => router.push(`/blog/${post.id}`)}
                                    >
                                        <div className="relative h-48 md:h-64 w-full overflow-hidden mb-3 md:mb-4">
                                            {post.coverImage ? (
                                                <Image
                                                    src={post.coverImage}
                                                    alt={post.title}
                                                    fill
                                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                                    <span className="text-gray-400">No image</span>
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-2.5 md:space-y-3 p-4 md:p-6">
                                            <h3 className="trajan-pro text-lg md:text-xl font-medium text-[#041122] line-clamp-2 leading-tight group-hover:text-[#BC9750] transition-colors">
                                                {post.title}
                                            </h3>
                                            <p className="arial-nova text-xs md:text-sm text-[#4D4946] line-clamp-2 leading-relaxed">
                                                {post.excerpt
                                                    ? he.decode(post.excerpt)
                                                    : "A deep-dive into strategic insights and expert advice on navigating complex tax landscapes."}
                                            </p>
                                            <div className="flex items-center gap-2 text-xs text-[#4D4946] flex-wrap">
                                                {post.categories?.length ? (
                                                    <>
                                                        <span className="arial-nova font-medium">
                                                            {post.categories.join(", ")}
                                                        </span>
                                                        <span>|</span>
                                                    </>
                                                ) : null}
                                                <span className="arial-nova">{formatDate(post.wpCreatedAt)}</span>
                                            </div>

                                            {/* Button với relative z-index để vẫn clickable */}
                                            <div
                                                className="relative z-10"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    router.push(`/blog/${post.id}`);
                                                }}
                                            >
                                                <button className="gotham bg-[#041122] text-[#BC9750] flex items-center gap-1 px-6 md:px-8 py-2.5 md:py-3 text-sm md:text-base tracking-wider hover:bg-[#BC9750] hover:text-[#041122] transition-colors mt-3 md:mt-7 w-full md:w-auto justify-center md:justify-start">
                                                    Read More
                                                    <ArrowUpRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-3 md:gap-4 mt-8 md:mt-12">
                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="text-[#BC9750] hover:text-[#726857] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={24} className="md:w-7 md:h-7" />
                                    </button>

                                    <div className="flex gap-1.5 md:gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                            <button
                                                key={pageNum}
                                                onClick={() => setPage(pageNum)}
                                                className={`w-8 h-8 md:w-10 md:h-10 gotham text-xs md:text-sm transition-colors ${page === pageNum
                                                    ? "text-[#BC9750]/30"
                                                    : "text-[#BC9750] hover:border border-[#726857] hover:text-[#726857]"
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="text-[#BC9750] hover:text-[#726857] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={24} className="md:w-7 md:h-7" />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </section>
            </div>
        </div>
    );
}