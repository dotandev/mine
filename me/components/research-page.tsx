"use client"

import { useEffect, useState } from "react"
import { apiClient } from "@/lib/api"
import { ResearchPaper } from "@/types/portfolio"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, FileText, ExternalLink, Calendar, Award, Quote, BookOpen, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

// Fallback categories if API doesn't provide them nicely, or we extract from data
const STATIC_CATEGORIES = [
    "All",
    "Quantum Computing",
    "Distributed Systems",
    "Blockchain",
    "Computer Vision",
    "Machine Learning",
    "Sustainable AI",
]

export function ResearchPage() {
    const router = useRouter()
    const [papers, setPapers] = useState<ResearchPaper[]>([])
    const [filteredPapers, setFilteredPapers] = useState<ResearchPaper[]>([])
    const [loading, setLoading] = useState(true)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")

    // Stats
    const [stats, setStats] = useState({
        publications: 0,
        citations: 0,
        collaborators: 0,
        avgImpact: 0,
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const response = await apiClient.getResearch({ limit: 100 })
                const data = (response.data as unknown as ResearchPaper[]) || []

                setPapers(data)
                setFilteredPapers(data)

                // Calculate stats dynamically if not provided by API
                const totalCitations = data.reduce((acc, curr) => acc + (curr.citations || 0), 0)
                const totalImpact = data.reduce((acc, curr) => acc + (curr.impact_factor || 0), 0)
                const avgImpact = data.length > 0 ? (totalImpact / data.length).toFixed(1) : 0

                setStats({
                    publications: data.length,
                    citations: totalCitations,
                    collaborators: 15, // Mock or extract unique authors
                    avgImpact: Number(avgImpact)
                })

            } catch (err) {
                console.error("Failed to fetch research papers", err)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    // Filter Logic
    useEffect(() => {
        let result = papers

        if (selectedCategory !== "All") {
            result = result.filter(paper => paper.category === selectedCategory)
        }

        if (searchQuery) {
            const query = searchQuery.toLowerCase()
            result = result.filter(paper =>
                paper.title.toLowerCase().includes(query) ||
                paper.abstract.toLowerCase().includes(query) ||
                paper.authors.some(author => author.toLowerCase().includes(query))
            )
        }

        setFilteredPapers(result)
    }, [papers, selectedCategory, searchQuery])

    // Get unique categories from data
    const categories = ["All", ...Array.from(new Set(papers.map(p => p.category).filter(Boolean)))]

    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-7xl mx-auto">

                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="font-heading font-black text-5xl sm:text-7xl mb-6 tracking-tight">
                        RESEARCH &
                        <br />
                        <span className="text-[#A25725]">PUBLICATIONS</span>
                    </h1>
                    <div className="w-24 h-1.5 bg-[#A25725] rounded-full mx-auto mb-8 shadow-lg shadow-[#A25725]/30" />
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                        Advancing the frontiers of technology through rigorous research, peer-reviewed publications, and
                        collaborative academic endeavors.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-5xl mx-auto bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border shadow-xl">
                    <div className="text-center border-r border-border/50 last:border-0">
                        <div className="text-4xl font-heading font-black text-[#A25725] mb-2">{stats.publications}+</div>
                        <div className="text-muted-foreground font-medium text-sm">Publications</div>
                    </div>
                    <div className="text-center border-r border-border/50 last:border-0">
                        <div className="text-4xl font-heading font-black text-[#A25725] mb-2">{stats.citations}+</div>
                        <div className="text-muted-foreground font-medium text-sm">Citations</div>
                    </div>
                    <div className="text-center border-r border-border/50 last:border-0">
                        <div className="text-4xl font-heading font-black text-[#A25725] mb-2">{stats.collaborators}+</div>
                        <div className="text-muted-foreground font-medium text-sm">Collaborators</div>
                    </div>
                    <div className="text-center">
                        <div className="text-4xl font-heading font-black text-[#A25725] mb-2">{stats.avgImpact}</div>
                        <div className="text-muted-foreground font-medium text-sm">Avg Impact Factor</div>
                    </div>
                </div>

                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search papers, authors, topics..."
                            className="pl-10 h-11 bg-card border-border/50 focus:border-[#A25725] transition-colors rounded-full"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex flex-wrap justify-center gap-2">
                        {categories.map((category) => (
                            <Button
                                key={category}
                                variant={category === selectedCategory ? "default" : "outline"}
                                onClick={() => setSelectedCategory(category)}
                                className={`rounded-full px-6 ${category === selectedCategory
                                        ? "bg-[#A25725] text-white hover:bg-[#bd7748] border-transparent"
                                        : "bg-transparent text-muted-foreground border-border/50 hover:border-[#A25725] hover:text-[#A25725]"
                                    }`}
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>

                {/* Papers List */}
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                        <Loader2 className="w-8 h-8 animate-spin mb-4 text-[#A25725]" />
                        <p>Loading research papers...</p>
                    </div>
                ) : filteredPapers.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-xl">
                        <p className="text-xl">No research papers found matching your criteria.</p>
                        <Button
                            variant="link"
                            onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
                            className="text-[#A25725]"
                        >
                            Clear filters
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-8">
                        <AnimatePresence mode="popLayout">
                            {filteredPapers.map((paper, index) => (
                                <motion.div
                                    key={paper.paper_id || index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group relative bg-[#A25725]/[0.02] hover:bg-[#A25725]/5 rounded-2xl border border-border/40 hover:border-[#A25725]/30 transition-all duration-300 p-8 cursor-pointer"
                                    onClick={() => router.push(`/research/${paper.paper_id || index}`)}
                                >
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#A25725] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-l-2xl" />

                                    <div className="flex flex-col lg:flex-row lg:items-start gap-8">
                                        <div className="flex-1 space-y-4">
                                            <div className="flex flex-wrap items-center justify-between gap-4">
                                                <div className="flex flex-wrap items-center gap-3">
                                                    <Badge variant="secondary" className="bg-[#A25725]/10 text-[#A25725] border border-[#A25725]/20 hover:bg-[#A25725]/20">
                                                        {paper.category}
                                                    </Badge>
                                                    <Badge variant={paper.status === "Published" ? "default" : "outline"} className={paper.status === 'Published' ? "bg-green-500/10 text-green-500 border-green-500/20" : "text-yellow-500 border-yellow-500/20 bg-yellow-500/10"}>
                                                        {paper.status}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                                                    <div className="flex items-center gap-1.5">
                                                        <Calendar className="w-4 h-4" />
                                                        {paper.year}
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Award className="w-4 h-4" />
                                                        IF: <span className="text-[#A25725] font-bold">{paper.impact_factor}</span>
                                                    </div>
                                                    <div className="flex items-center gap-1.5">
                                                        <Quote className="w-4 h-4" />
                                                        {paper.citations} citations
                                                    </div>
                                                </div>
                                            </div>

                                            <h3 className="font-heading font-bold text-2xl lg:text-3xl text-foreground group-hover:text-[#A25725] transition-colors leading-tight">
                                                {paper.title}
                                            </h3>

                                            <div className="flex flex-wrap gap-x-2 text-muted-foreground text-sm">
                                                <span className="font-semibold text-foreground">Authors:</span>
                                                {paper.authors.map((author, i) => (
                                                    <span key={i} className={author.includes("Khabib") || author.includes("Me") ? "text-[#A25725] font-semibold underline decoration-dotted" : ""}>
                                                        {author}{i < paper.authors.length - 1 ? ", " : ""}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className="flex items-center gap-2 text-sm">
                                                <BookOpen className="w-4 h-4 text-[#A25725]" />
                                                <span className="text-muted-foreground">Published in</span>
                                                <span className="font-medium text-foreground border-b border-[#A25725]/30">{paper.journal}</span>
                                            </div>

                                            <p className="text-muted-foreground leading-relaxed pt-2 max-w-4xl line-clamp-2">
                                                {paper.abstract}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </div>
        </div>
    )
}
