"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api"
import { ResearchPaper } from "@/types/portfolio"
import { motion } from "framer-motion"
import { FileText, ExternalLink, Calendar, Award, Quote, BookOpen, ArrowLeft, Download, Users, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useParams } from "next/navigation"

export function ResearchDetail() {
    const params = useParams()
    const id = params?.id as string
    const [paper, setPaper] = useState<ResearchPaper | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchPaper = async () => {
            if (!id) return;

            try {
                setLoading(true)
                // Try fetching specific paper
                // If the endpoint doesn't exist yet, we can fallback to fetching all and filtering
                try {
                    const response = await apiClient.getResearchPaper(id)
                    if (response.success && response.data) {
                        setPaper(response.data as unknown as ResearchPaper)
                        return
                    }
                } catch (ignore) {
                    // Fallback
                    console.log("Direct fetch failed, trying search match")
                }

                const allResponse = await apiClient.getResearch({ limit: 100 })
                const allPapers = (allResponse.data as unknown as ResearchPaper[]) || []
                const found = allPapers.find((p: any) => p.paper_id === id || p.title.toLowerCase().replace(/ /g, "-") === id)

                if (found) {
                    setPaper(found)
                }
            } catch (err) {
                console.error("Failed to fetch paper details", err)
            } finally {
                setLoading(false)
            }
        }

        fetchPaper()
    }, [id])

    if (loading) {
        return <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">Loading Paper Details...</div>
    }

    if (!paper) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold">Paper Not Found</h1>
                <Link href="/research">
                    <Button variant="outline"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Research</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-background pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-5xl mx-auto">

                {/* Navigation */}
                <Link href="/research" className="inline-flex items-center text-muted-foreground hover:text-[#A25725] mb-8 transition-colors group">
                    <div className="p-2 rounded-full bg-secondary/50 group-hover:bg-[#A25725]/10 mr-3 transition-colors">
                        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <span className="font-medium">All Publications</span>
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6 mb-12"
                >
                    <div className="flex flex-wrap gap-3">
                        <Badge className="bg-[#A25725]/10 text-[#A25725] hover:bg-[#A25725]/20 border border-[#A25725]/20 px-3 py-1 text-sm">
                            {paper.category}
                        </Badge>
                        <Badge variant={paper.status === "Published" ? "default" : "outline"} className={paper.status === 'Published' ? "bg-green-500/10 text-green-500 border-green-500/20" : "text-yellow-500 border-yellow-500/20 bg-yellow-500/10"}>
                            {paper.status}
                        </Badge>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight">
                        {paper.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-6 text-muted-foreground border-b border-border/40 pb-8">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5" />
                            <span className="font-medium">{paper.year}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <BookOpen className="w-5 h-5" />
                            <span>{paper.journal}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            <span>Impact Factor: <span className="text-[#A25725] font-bold">{paper.impact_factor}</span></span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Quote className="w-5 h-5" />
                            <span>{paper.citations} Citations</span>
                        </div>
                    </div>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
                                Abstract
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
                                <p>{paper.abstract}</p>
                            </div>
                        </motion.section>

                        {/* Authors */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-3">
                                <Users className="w-5 h-5 text-[#A25725]" /> Authors
                            </h2>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {paper.authors.map((author, index) => (
                                    <div key={index} className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#A25725] to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                                            {author.split(" ").map(n => n[0]).join("")}
                                        </div>
                                        <span className="font-medium">{author}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.section>

                        {/* Keywords */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
                                <Tag className="w-5 h-5 text-[#A25725]" /> Keywords
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {paper.keywords?.map((keyword, index) => (
                                    <span key={index} className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm">
                                        {keyword}
                                    </span>
                                )) || <p className="text-muted-foreground italic">No keywords listed.</p>}
                            </div>
                        </motion.section>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-lg sticky top-24">
                            <h3 className="font-bold text-lg mb-6">Resources</h3>
                            <div className="space-y-3">
                                {paper.links.pdf && (
                                    <a href={paper.links.pdf} target="_blank" rel="noopener noreferrer">
                                        <Button className="w-full justify-start text-left h-auto py-4 bg-[#A25725] hover:bg-[#A25725]/90 text-white shadow-lg shadow-[#A25725]/20">
                                            <FileText className="mr-3 w-5 h-5" />
                                            <div className="flex flex-col items-start">
                                                <span className="font-bold">Read Paper</span>
                                                <span className="text-xs opacity-90 font-normal">Download PDF</span>
                                            </div>
                                        </Button>
                                    </a>
                                )}

                                {paper.links.code && (
                                    <a href={paper.links.code} target="_blank" rel="noopener noreferrer">
                                        <Button variant="outline" className="w-full justify-start h-12">
                                            <ExternalLink className="mr-3 w-4 h-4" />
                                            View Code Repository
                                        </Button>
                                    </a>
                                )}

                                {paper.links.doi && (
                                    <a href={paper.links.doi} target="_blank" rel="noopener noreferrer">
                                        <Button variant="ghost" className="w-full justify-start h-10 text-muted-foreground hover:text-foreground">
                                            <ExternalLink className="mr-3 w-4 h-4" />
                                            View DOI
                                        </Button>
                                    </a>
                                )}
                            </div>

                            <div className="mt-8 pt-8 border-t border-border/50">
                                <h4 className="text-xs font-bold uppercase text-muted-foreground tracking-wider mb-4">Share</h4>
                                {/* Social share buttons could go here */}
                                <div className="flex gap-2">
                                    <Button size="icon" variant="outline" className="rounded-full w-10 h-10">
                                        <ExternalLink className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
