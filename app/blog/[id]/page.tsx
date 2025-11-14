"use client";

import { useEffect, useState, useRef, useLayoutEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2,
  Link2,
  Linkedin,
  Instagram,
  MessageCircle,
  Check,
  Search,
  X,
} from "lucide-react";
import api from "@/lib/api";

/* ----------------- Types ----------------- */
interface PostCategory {
  postId: number;
  categoryId: number;
  assignedAt: string;
  category: {
    id: number;
    name: string;
    slug: string;
    createdAt: string;
  };
}

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  coverImage: string | null;
  excerpt?: string;
  contentHtml?: string;
  author?: string;
  wpCreatedAt?: string;
  categories?: PostCategory[];
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

/* ----------------- Component ----------------- */
export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [latestPosts, setLatestPosts] = useState<BlogPost[]>([]);
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(
    null
  );
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [copied, setCopied] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [matchCount, setMatchCount] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Resolve params
  useEffect(() => {
    params.then((p) => setResolvedParams(p));
  }, [params]);

  // Fetch data when resolvedParams is ready
  useEffect(() => {
    if (!resolvedParams) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch post detail
        const postRes = await api.get(`/api/post/${resolvedParams.id}`);
        const postData = postRes.data.post;

        if (!postData) {
          notFound();
          return;
        }

        setPost(postData);

        // Fetch all posts for latest
        const allPostsRes = await api.get("/api/post");
        const allPosts = allPostsRes.data.posts || [];

        // Get 3 latest posts (exclude current)
        const latest = allPosts
          .filter((p: BlogPost) => p.id !== postData.id)
          .slice(0, 3);
        setLatestPosts(latest);

        // Fetch ALL categories from database
        const categoriesRes = await api.get("/api/categories");
        const categories = categoriesRes.data.categories || [];
        setAllCategories(categories);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [resolvedParams]);

  /* ----------------- Utility functions ----------------- */

  // Escape regex special characters
  const escapeRegex = (str: string): string => {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  };

  // Format date
  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Current URL and title for share
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = post?.title || "";

  // Copy link
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Share handlers
  const shareOnLinkedIn = () => {
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      currentUrl
    )}`;
    window.open(url, "_blank", "width=600,height=600");
  };

  const shareOnWhatsApp = () => {
    const text = `${shareTitle} - ${currentUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const shareOnInstagram = () => {
    window.open("https://www.instagram.com/", "_blank");
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setDebouncedSearch("");
    setMatchCount(0);
  };

  /* ----------------- Robust removeHighlights ----------------- */

  const removeHighlights = () => {
    const root = contentRef.current;
    if (!root) return;

    // 1) Remove any <mark class="search-highlight"> first (safe even if wrapper missing)
    const marks = root.querySelectorAll("mark.search-highlight");
    marks.forEach((mark) => {
      const parent = mark.parentNode;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(mark.textContent || ""), mark);
      parent.normalize();
    });

    // 2) Remove any leftover wrapper spans used during previous highlights
    const wrappers = root.querySelectorAll('[data-highlight-wrapper="true"]');
    wrappers.forEach((wrapper) => {
      const parent = wrapper.parentNode;
      if (!parent) return;
      parent.replaceChild(document.createTextNode(wrapper.textContent || ""), wrapper);
      parent.normalize();
    });
  };

  /* ----------------- Highlight logic (useLayoutEffect) ----------------- */

  // Debounce searchTerm -> debouncedSearch (200ms)
  useEffect(() => {
    const t = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 200);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useLayoutEffect(() => {
    const root = contentRef.current;
    if (!root) return;

    // If there's no search term, just remove highlights and exit
    if (!debouncedSearch) {
      removeHighlights();
      setMatchCount(0);
      return;
    }

    // Remove any previous highlights before applying new ones
    removeHighlights();

    // Build safe regex
    const safe = escapeRegex(debouncedSearch);
    const regex = new RegExp(`(${safe})`, "gi");

    let count = 0;
    const firstMatchRef = { current: null as HTMLElement | null };

    // Walk the DOM and replace text nodes with highlighted markup where appropriate.
    const walk = (node: Node) => {
      // Don't process inside these tags
      if (node.nodeType === Node.ELEMENT_NODE) {
        const el = node as HTMLElement;
        const tag = el.tagName;
        if (
          ["SCRIPT", "STYLE", "MARK", "CODE", "PRE", "NOSCRIPT"].includes(tag)
        ) {
          return;
        }
      }

      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        // Quick check: if no match, skip
        if (!regex.test(text)) {
          // Reset lastIndex for regex to avoid stateful issues
          return;
        }

        // Reset lastIndex before using replace (safety)
        regex.lastIndex = 0;

        // Create a wrapper span that contains the replaced HTML
        const replaced = text.replace(regex, (match) => {
          count++;
          return `<mark class="search-highlight" data-highlight="true" style="background-color: #BC9750; color: white; padding: 2px 4px; border-radius: 2px;">${match}</mark>`;
        });

        const wrapper = document.createElement("span");
        wrapper.setAttribute("data-highlight-wrapper", "true");
        wrapper.innerHTML = replaced;

        // Replace the text node with wrapper
        const parent = node.parentNode;
        if (parent) {
          parent.replaceChild(wrapper, node);
          // Check first match to scroll into view later
          if (!firstMatchRef.current) {
            const firstMark = wrapper.querySelector<HTMLElement>(
              'mark.search-highlight'
            );
            if (firstMark) firstMatchRef.current = firstMark;
          }
        }

        // After replacing, no need to descend into this wrapper
        return;
      }

      // If element, iterate children (make static array to avoid live NodeList issues)
      if (node.nodeType === Node.ELEMENT_NODE) {
        const children = Array.from(node.childNodes);
        for (const child of children) {
          walk(child);
        }
      }
    };

    // Run walker on root
    walk(root);

    // Update state
    setMatchCount(count);

    // Scroll to first match if found
    if (firstMatchRef.current) {
      try {
        firstMatchRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (e) {
        // ignore
      }
    }
  }, [debouncedSearch, post?.contentHtml]);
  /* ----------------- Render (part 1: banner + main content start) ----------------- */

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-10 w-10 animate-spin text-[#BC9750]" />
      </div>
    );
  }

  if (!post) {
    return notFound();
  }

  const isActiveCategory = (categoryName: string) => {
    return post.categories?.some((cat) => cat.category.name === categoryName) || false;
  };

  return (
    <div className="w-full bg-white">
      {/* Banner Section */}
      <div className="relative w-full h-[400px] md:h-[500px] mb-12">
        {post.coverImage && (
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center px-6 md:px-12 lg:px-20">
          <div className="max-w-4xl text-center">
            <h1 className="trajan-pro text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <article className="lg:col-span-8">
            <div
              ref={contentRef}
              className="arial-nova prose prose-lg max-w-none
                [&_h1]:text-5xl! [&_h1]:font-bold! [&_h1]:mb-8! [&_h1]:mt-12! [&_h1]:text-[#041122]!
                [&_h2]:text-4xl! [&_h2]:font-bold! [&_h2]:mb-7! [&_h2]:mt-10! [&_h2]:text-[#041122]!
                [&_h3]:text-3xl! [&_h3]:font-semibold! [&_h3]:mb-6! [&_h3]:mt-8! [&_h3]:text-[#041122]!
                [&_h4]:text-2xl! [&_h4]:font-semibold! [&_h4]:mb-5! [&_h4]:text-[#041122]!
                [&_p]:text-xl! [&_p]:text-[#4D4946]! [&_p]:leading-normal! [&_p]:mb-4!
                [&_img]:rounded-none! [&_img]:shadow-md! [&_img]:my-10!
                [&_a]:text-[#BC9750]! [&_a]:no-underline! hover:[&_a]:underline!
                [&_strong]:text-[#041122]! [&_strong]:font-semibold!
                [&_ul]:list-disc! [&_ul]:text-xl! [&_ul]:list-outside! [&_ul]:ml-6! [&_ul]:my-4! [&_ul]:space-y-1!
                [&_ol]:list-decimal! [&_ol]:text-xl! [&_ol]:list-outside! [&_ol]:ml-6! [&_ol]:my-6! [&_ol]:space-y-1!
                [&_li]:text-[#4D4946]! [&_li]:leading-normal!
                [&_div]:text-xl! [&_div]:text-[#4D4946]! [&_div]:leading-normal!
                [&_span]:text-xl! [&_span]:text-[#4D4946]!
              "
              dangerouslySetInnerHTML={{
                __html: post.contentHtml || "",
              }}
            />

            {/* Social Share Section */}
            <div className="mt-12 pt-8 border-t border-[#726857]">
              <div className="flex items-center gap-4">
                {/* Copy Link */}
                <button
                  onClick={() => setShowLinkDialog(true)}
                  className="text-[#726857] hover:text-[#BC9750] transition-colors"
                  title="Copy link"
                >
                  <Link2 size={20} />
                </button>

                {/* LinkedIn */}
                <button
                  onClick={shareOnLinkedIn}
                  className="text-[#726857] hover:text-[#BC9750] transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin size={20} />
                </button>

                {/* Instagram */}
                <button
                  onClick={shareOnInstagram}
                  className="text-[#726857] hover:text-[#BC9750] transition-colors"
                  title="Share on Instagram"
                >
                  <Instagram size={20} />
                </button>

                {/* WhatsApp */}
                <button
                  onClick={shareOnWhatsApp}
                  className="text-[#726857] hover:text-[#BC9750] transition-colors"
                  title="Share on WhatsApp"
                >
                  <MessageCircle size={20} />
                </button>
              </div>
            </div>
          </article>
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-10">
            {/* Search Box */}
            <div className="bg-[#F2F0EC] p-6">
              <h3 className="trajan-pro text-xl font-medium text-[#041122] mb-4 pb-3 ">
                Search in Article
              </h3>

              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Enter keyword..."
                  className="w-full px-4 py-3 pr-20  focus:outline-none focus:border-[#726857] transition-colors arial-nova text-sm"
                />

                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-12 top-1/2 -translate-y-1/2 text-[#726857] hover:text-[#BC9750] transition-colors"
                    title="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}

                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-[#BC9750]" size={18} />
              </div>

              {/* Match count */}
              {debouncedSearch && (
                <div className="mt-3 text-xs arial-nova text-[#4D4946]">
                  {matchCount > 0 ? (
                    <span className="text-[#BC9750] font-medium">
                      Found {matchCount} match{matchCount !== 1 ? "es" : ""}
                    </span>
                  ) : (
                    <span className="text-[#726857]">No matches found</span>
                  )}
                </div>
              )}
            </div>

            {/* Latest Posts */}
            {latestPosts.length > 0 && (
              <div className="bg-[#F2F0EC] p-6">
                <h3 className="trajan-pro text-xl font-medium text-[#041122] mb-6 pb-3">
                  Latest Posts
                </h3>

                <div className="space-y-6">
                  {latestPosts.map((latestPost) => (
                    <Link key={latestPost.id} href={`/blog/${latestPost.id}`} className="group block">
                      <div className="flex gap-4">
                        {latestPost.coverImage && (
                          <div className="relative w-24 h-20 shrink-0 overflow-hidden">
                            <Image
                              src={latestPost.coverImage}
                              alt={latestPost.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}

                        <div className="flex-1">
                          <h4 className="arial-nova text-sm font-medium text-[#041122] group-hover:text-[#BC9750] transition-colors line-clamp-2 mb-2">
                            {latestPost.title}
                          </h4>
                          <span className="text-xs text-[#4D4946]">{formatDate(latestPost.wpCreatedAt)}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Categories */}
            {allCategories.length > 0 && (
              <div className="bg-[#F2F0EC] p-6">
                <h3 className="trajan-pro text-xl font-medium text-[#041122] mb-4 pb-3">
                  Categories
                </h3>

                <div className="space-y-2">
                  {allCategories.map((cat) => (
                    <div
                      key={cat.id}
                      className={`arial-nova px-4 py-3 text-lg transition-all cursor-default ${isActiveCategory(cat.name)
                          ? "bg-white text-[#BC9750] shadow-sm font-medium"
                          : "bg-transparent text-[#041122]"
                        }`}
                    >
                      {cat.name}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4" onClick={() => setShowLinkDialog(false)}>
          <div className="bg-white rounded-lg p-6 max-w-md w-full" onClick={(e) => e.stopPropagation()}>
            <h3 className="trajan-pro text-xl font-medium text-[#041122] mb-4">Share this post</h3>

            <div className="flex items-center gap-2 mb-4">
              <input type="text" value={currentUrl} readOnly className="flex-1 px-3 py-2 border border-gray-300 rounded text-sm text-[#4D4946] bg-gray-50" />
              <button onClick={copyLink} className="px-4 py-2 bg-[#BC9750] text-white rounded hover:bg-[#726857] transition-colors flex items-center gap-2 whitespace-nowrap">
                {copied ? (
                  <>
                    <Check size={16} />
                    Copied!
                  </>
                ) : (
                  "Copy"
                )}
              </button>
            </div>

            <button onClick={() => setShowLinkDialog(false)} className="w-full px-4 py-2 bg-gray-200 text-[#041122] rounded hover:bg-gray-300 transition-colors">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
