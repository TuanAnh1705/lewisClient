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
import { motion, AnimatePresence } from "framer-motion";

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

    // Lấy 3 bài mới nhất
    const latestPosts = posts.slice(0, 3);
    const currentLatestPost = latestPosts[latestIndex];

    // Bài viết còn lại cho "From Our Desk"
    const deskPosts = posts.slice(0, 6);
    const totalPages = Math.ceil(deskPosts.length / perPage);
    const paginatedPosts = deskPosts.slice((page - 1) * perPage, page * perPage);

    const handleLatestNext = () => {
        setDirection("next");
        setLatestIndex((prev) => (prev + 1) % latestPosts.length);
    };

    const handleLatestPrev = () => {
        setDirection("prev");
        setLatestIndex((prev) => (prev - 1 + latestPosts.length) % latestPosts.length);
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
        <div className="w-full bg-white md:py-20">
            <div className="max-w-7xl mx-auto px-4">
                {/* === THE LATEST INSIGHTS === */}
                <section className="mb-20 overflow-hidden">
                    <h2
                        className="trajan-pro text-4xl md:text-5xl text-center font-medium text-[#041122] mb-12 leading-tight overflow-visible"
                    >
                        GET THE LATEST INSIGHTS
                    </h2>

                    {/* * THAY ĐỔI: Tăng min-h trên desktop để chứa layout mới (lg:min-h-[450px])
      */}
                    <div className="relative min-h-[400px] lg:min-h-[450px]">
                        <AnimatePresence mode="wait" custom={direction}>
                            {currentLatestPost && (
                                <motion.div
                                    key={currentLatestPost.id}
                                    custom={direction}
                                    variants={variants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center absolute w-full"
                                >
                                    <div className="relative h-[400px] lg:h-[450px] w-full overflow-hidden lg:col-span-7">
                                        {currentLatestPost.coverImage ? (
                                            <Image
                                                src={currentLatestPost.coverImage}
                                                alt={currentLatestPost.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-white flex items-center justify-center">
                                                <span className="text-gray-400">No image</span>
                                            </div>
                                        )}
                                    </div>

                                    <div className="lg:col-span-5 flex flex-col justify-between h-full min-h-[400px] lg:min-h-[450px] py-4 lg:py-0">

                                        {/* Nhóm nội dung trên (Title + Excerpt) */}
                                        <div className="space-y-6">
                                            <h3 className="trajan-pro text-2xl md:text-3xl font-medium text-[#041122] leading-tight">
                                                {currentLatestPost.title}
                                            </h3>
                                            <p className="arial-nova text-[#4D4946] leading-relaxed line-clamp-3">
                                                {currentLatestPost.excerpt ||
                                                    "Avoid these common pitfalls to ensure a smooth and successful expansion into the EU market, maximizing your growth opportunities."}
                                            </p>
                                        </div>

                                        <div className="space-y-6 mt-6 lg:mt-0">
                                            {/* Categories + Date */}
                                            <div className="flex items-center gap-4 text-sm text-[#4D4946]">
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

                                            <Link href={`/blog/${currentLatestPost.id}`}>
                                                <button className="gotham bg-[#041122] text-[#BC9750] flex items-center gap-1 px-8 py-3 tracking-wider hover:bg-[#BC9750] hover:text-[#041122] transition-colors">
                                                    Explore Now
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Arrows */}
                    {latestPosts.length > 1 && (
                        <div className="flex justify-center gap-14 mt-8">
                            <motion.button
                                whileHover={{ scale: 1.2, color: "#BC9750" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleLatestPrev}
                                aria-label="Previous post"
                                className="text-[#726857] transition-colors"
                            >
                                <ArrowLeft size={36} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.2, color: "#BC9750" }}
                                whileTap={{ scale: 0.9 }}
                                onClick={handleLatestNext}
                                aria-label="Next post"
                                className="text-[#726857] transition-colors"
                            >
                                <ArrowRight size={36} />
                            </motion.button>
                        </div>
                    )}
                </section>

                {/* === FROM OUR DESK === */}
                <section>
                    <h2
                        className="trajan-pro text-4xl md:text-5xl text-center font-medium text-[#041122] mb-12 leading-tight overflow-visible"
                    >
                        FROM OUR DESK
                    </h2>


                    {deskPosts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="arial-nova text-lg text-[#4D4946]">No posts found</p>
                        </div>
                    ) : (
                        <>
                            {/* Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {paginatedPosts.map((post) => (
                                    <div key={post.id} className="group bg-[#F2F0EC] overflow-hidden">
                                        <div className="relative h-64 w-full overflow-hidden mb-4">
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

                                        <div className="space-y-3 p-6">
                                            <h3 className="trajan-pro text-xl font-medium text-[#041122] line-clamp-2 leading-tight">
                                                {post.title}
                                            </h3>
                                            <p className="arial-nova text-sm text-[#4D4946] line-clamp-2 leading-relaxed">
                                                {post.excerpt ||
                                                    "A deep-dive into strategic insights and expert advice on navigating complex tax landscapes."}
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

                                            <Link href={`/blog/${post.id}`}>
                                                <button className="gotham bg-[#041122] text-[#BC9750] flex items-center gap-1 px-8 py-3 tracking-wider hover:bg-[#BC9750] hover:text-[#041122] transition-colors md:mt-7">
                                                    Read More
                                                    <ArrowUpRight className="w-4 h-4" />
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-4 mt-12">
                                    <button
                                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                                        disabled={page === 1}
                                        className="text-[#041122] hover:text-[#BC9750] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronLeft size={28} />
                                    </button>

                                    <div className="flex gap-2">
                                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                                            <button
                                                key={pageNum}
                                                onClick={() => setPage(pageNum)}
                                                className={`w-10 h-10 gotham text-sm transition-colors ${page === pageNum
                                                    ? "bg-[#BC9750] text-white"
                                                    : "text-[#041122] border border-[#041122] hover:bg-[#BC9750] hover:text-white"
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        ))}
                                    </div>

                                    <button
                                        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                                        disabled={page === totalPages}
                                        className="text-[#041122] hover:text-[#BC9750] disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <ChevronRight size={28} />
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