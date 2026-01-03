"use client"

import { useEffect, useState } from "react"
import { useComprehensiveData } from "@/hooks/usePortfolio"
import { BlogPost } from "@/types/portfolio"
import { motion } from "framer-motion"
import { format } from "date-fns"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

// Mock data for demonstration if API returns empty
const MOCK_POSTS: BlogPost[] = [
    {
        blog_id: "1",
        title: "Advancing AI reasoning with chain-of-thought prompting",
        slug: "chain-of-thought",
        excerpt: "We are exploring how chain-of-thought prompting can improve the reasoning capabilities of large language models.",
        content: "...",
        author: "Research Team",
        published_date: "2025-12-15",
        tags: ["Research", "AI"],
        category: "Research",
        reading_time: 5,
        status: "published",
        views: 1200,
        likes: 45,
        lastUpdated: new Date()
    },
    {
        blog_id: "2",
        title: "Introducing new embedding models",
        slug: "new-embeddings",
        excerpt: "New embedding models are now available, offering better performance at a lower cost.",
        content: "...",
        author: "Product Team",
        published_date: "2025-11-30",
        tags: ["Product", "Embeddings"],
        category: "Product",
        reading_time: 3,
        status: "published",
        views: 980,
        likes: 32,
        lastUpdated: new Date()
    },
    {
        blog_id: "3",
        title: "Governance at scale",
        slug: "governance-scale",
        excerpt: "How we are approaching the challenge of governing AI systems as they become more capable and widespread.",
        content: "...",
        author: "Safety Team",
        published_date: "2025-10-20",
        tags: ["Safety", "Governance"],
        category: "Safety",
        reading_time: 8,
        status: "published",
        views: 1500,
        likes: 67,
        lastUpdated: new Date()
    },
    {
        blog_id: "4",
        title: "DALL·E 3 system card",
        slug: "dalle-3-system-card",
        excerpt: "We are releasing a system card for DALL·E 3, detailing our safety work and evaluations.",
        content: "...",
        author: "Research Team",
        published_date: "2025-10-05",
        tags: ["Research", "Safety"],
        category: "Research",
        reading_time: 6,
        status: "published",
        views: 2100,
        likes: 120,
        lastUpdated: new Date()
    }
]

export function BlogPage() {
    const { data, loading } = useComprehensiveData()
    const [activeCategory, setActiveCategory] = useState("All")
    // Use real data if available and not empty, otherwise usage MOCK_POSTS
    const posts = (data?.recentPosts && data.recentPosts.length > 0) ? data.recentPosts : MOCK_POSTS

    const categories = ["All", ...Array.from(new Set(posts.map(post => post.category)))]

    const filteredPosts = activeCategory === "All"
        ? posts
        : posts.filter(post => post.category === activeCategory)

    // Sort by date desc
    const sortedPosts = [...filteredPosts].sort((a, b) =>
        new Date(b.published_date).getTime() - new Date(a.published_date).getTime()
    )

    const featuredPost = sortedPosts[0]
    const otherPosts = sortedPosts.slice(1)

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="mb-16">
                    <h1 className="text-5xl md:text-7xl font-semibold tracking-tight mb-6">
                        Blog
                    </h1>
                    <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                        News, research, and updates from the team.
                    </p>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-6 mb-12 border-b border-border pb-4">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`text-sm font-medium transition-colors hover:text-foreground/80 ${activeCategory === category
                                    ? "text-foreground border-b-2 border-foreground -mb-[17px] pb-4"
                                    : "text-muted-foreground"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Featured Post (only if "All" is selected or it matches filter) */}
                {featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mb-16 group cursor-pointer"
                    >
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="aspect-[16/9] w-full bg-accent/10 rounded-sm overflow-hidden relative">
                                {/* Placeholder for real image or generated patterns */}
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/10 group-hover:scale-105 transition-transform duration-500 ease-out" />
                            </div>
                            <div className="space-y-4">
                                <div className="text-sm font-medium text-accent">
                                    {format(new Date(featuredPost.published_date), "MMMM d, yyyy")}
                                </div>
                                <h2 className="text-3xl md:text-4xl font-semibold leading-tight group-hover:text-foreground/80 transition-colors">
                                    {featuredPost.title}
                                </h2>
                                <p className="text-lg text-muted-foreground line-clamp-3">
                                    {featuredPost.excerpt}
                                </p>
                                <div className="pt-2 flex items-center text-sm font-medium">
                                    Read more <ArrowRight className="ml-2 w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Grid of Posts */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                    {otherPosts.map((post, idx) => (
                        <motion.div
                            key={post.blog_id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group cursor-pointer flex flex-col h-full"
                        >
                            <div className="aspect-[3/2] w-full bg-accent/5 rounded-sm overflow-hidden relative mb-6">
                                <div className="absolute inset-0 bg-gradient-to-tr from-background to-accent/20 group-hover:scale-105 transition-transform duration-500" />
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="text-xs font-medium text-accent uppercase tracking-wider">
                                    {post.category} -- {format(new Date(post.published_date), "MMM d, yyyy")}
                                </div>
                                <h3 className="text-xl font-semibold leading-snug group-hover:text-foreground/80 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-muted-foreground text-sm line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {filteredPosts.length === 0 && (
                    <div className="py-20 text-center text-muted-foreground">
                        No posts found in this category.
                    </div>
                )}

            </div>
        </div>
    )
}
