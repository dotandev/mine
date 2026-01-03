'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit2, Trash2, FileText, Link as LinkIcon, Users, ExternalLink, X } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface ResearchPaper {
    id: string
    paper_id: string
    title: string
    abstract: string
    authors: string[]
    journal: string
    year: number
    citations: number
    impact_factor: number
    status: 'Published' | 'Under Review' | 'Draft'
    category: string
    links: {
        pdf?: string
        doi?: string
        code?: string
    }
    keywords: string[]
}

const categories = [
    "Quantum Computing",
    "Distributed Systems",
    "Blockchain",
    "Computer Vision",
    "Machine Learning",
    "Sustainable AI",
    "Security"
]

const statuses = ['Published', 'Under Review', 'Draft']

export default function ResearchManagement() {
    const [papers, setPapers] = useState<ResearchPaper[]>([])
    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [editingPaper, setEditingPaper] = useState<ResearchPaper | null>(null)

    const emptyPaper: ResearchPaper = {
        id: '',
        paper_id: '',
        title: '',
        abstract: '',
        authors: ['Khabib Thekillys'],
        journal: '',
        year: new Date().getFullYear(),
        citations: 0,
        impact_factor: 0,
        status: 'Draft',
        category: 'Machine Learning',
        links: {},
        keywords: []
    }

    const [formData, setFormData] = useState<ResearchPaper>(emptyPaper)
    const [newAuthor, setNewAuthor] = useState('')
    const [newKeyword, setNewKeyword] = useState('')

    useEffect(() => {
        fetchPapers()
    }, [])

    const fetchPapers = async () => {
        try {
            const token = localStorage.getItem('admin_token')
            const response = await fetch(`${API_BASE}/admin/research`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                const data = await response.json()
                setPapers(data.data || [])
            } else {
                setError('Failed to fetch research papers')
            }
        } catch (error) {
            setError('Network error')
        }
        setLoading(false)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSaving(true)
        setError('')
        setMessage('')

        try {
            const token = localStorage.getItem('admin_token')
            const url = editingPaper
                ? `${API_BASE}/admin/research/${editingPaper.id}`
                : `${API_BASE}/admin/research`

            const method = editingPaper ? 'PUT' : 'POST'

            const paperData = {
                ...formData,
                id: formData.id || Date.now().toString(),
                paper_id: formData.paper_id || formData.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(paperData)
            })

            if (response.ok) {
                await fetchPapers()
                setMessage(editingPaper ? 'Research paper updated successfully!' : 'Research paper added successfully!')
                setTimeout(() => setMessage(''), 3000)
                setIsDialogOpen(false)
                setEditingPaper(null)
                setFormData(emptyPaper)
            } else {
                const data = await response.json()
                setError(data.error || 'Failed to save research paper')
            }
        } catch (error) {
            setError('Network error')
        }
        setSaving(false)
    }

    const handleEdit = (paper: ResearchPaper) => {
        setEditingPaper(paper)
        setFormData(paper)
        setIsDialogOpen(true)
    }

    const handleDelete = async (paperId: string) => {
        if (!confirm('Are you sure you want to delete this research paper?')) return

        setSaving(true)
        try {
            const token = localStorage.getItem('admin_token')
            const response = await fetch(`${API_BASE}/admin/research/${paperId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })

            if (response.ok) {
                await fetchPapers()
                setMessage('Research paper deleted successfully!')
                setTimeout(() => setMessage(''), 3000)
            } else {
                setError('Failed to delete research paper')
            }
        } catch (error) {
            setError('Network error')
        }
        setSaving(false)
    }

    const addAuthor = (author: string) => {
        if (!author.trim()) return
        if (!formData.authors.includes(author.trim())) {
            setFormData({
                ...formData,
                authors: [...formData.authors, author.trim()]
            })
        }
    }

    const removeAuthor = (index: number) => {
        setFormData({
            ...formData,
            authors: formData.authors.filter((_, i) => i !== index)
        })
    }

    const addKeyword = (keyword: string) => {
        if (!keyword.trim()) return
        if (!formData.keywords.includes(keyword.trim())) {
            setFormData({
                ...formData,
                keywords: [...formData.keywords, keyword.trim()]
            })
        }
    }

    const removeKeyword = (index: number) => {
        setFormData({
            ...formData,
            keywords: formData.keywords.filter((_, i) => i !== index)
        })
    }

    const resetForm = () => {
        setFormData(emptyPaper)
        setEditingPaper(null)
        setNewAuthor('')
        setNewKeyword('')
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Published': return 'bg-green-100 text-green-800'
            case 'Under Review': return 'bg-yellow-100 text-yellow-800'
            case 'Draft': return 'bg-gray-100 text-gray-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    if (loading) {
        return <div className="flex justify-center p-8">Loading...</div>
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold">Research Management</h2>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button onClick={resetForm}>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Paper
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
                        <DialogHeader className="p-6 pb-4 border-b">
                            <DialogTitle>
                                {editingPaper ? 'Edit Research Paper' : 'Add New Research Paper'}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="flex-1 overflow-y-auto p-6">
                            <form id="research-form" onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="md:col-span-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input
                                            id="title"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="journal">Journal/Conference</Label>
                                        <Input
                                            id="journal"
                                            value={formData.journal}
                                            onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="year">Year</Label>
                                        <Input
                                            id="year"
                                            type="number"
                                            value={formData.year}
                                            onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="category">Category</Label>
                                        <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map(cat => (
                                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="status">Status</Label>
                                        <Select value={formData.status} onValueChange={(value: any) => setFormData({ ...formData, status: value })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select status" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {statuses.map(status => (
                                                    <SelectItem key={status} value={status}>{status}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label htmlFor="citations">Citations</Label>
                                        <Input
                                            id="citations"
                                            type="number"
                                            value={formData.citations}
                                            onChange={(e) => setFormData({ ...formData, citations: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="impact">Impact Factor</Label>
                                        <Input
                                            id="impact"
                                            type="number"
                                            step="0.1"
                                            value={formData.impact_factor}
                                            onChange={(e) => setFormData({ ...formData, impact_factor: parseFloat(e.target.value) || 0 })}
                                        />
                                    </div>
                                </div>

                                {/* Authors */}
                                <div>
                                    <Label>Authors</Label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {formData.authors.map((author, index) => (
                                            <Badge key={index} variant="secondary" className="flex items-center gap-1">
                                                {author}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => removeAuthor(index)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add author"
                                            value={newAuthor}
                                            onChange={(e) => setNewAuthor(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    addAuthor(newAuthor)
                                                    setNewAuthor('')
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                addAuthor(newAuthor)
                                                setNewAuthor('')
                                            }}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>

                                <div>
                                    <Label htmlFor="abstract">Abstract</Label>
                                    <Textarea
                                        id="abstract"
                                        value={formData.abstract}
                                        onChange={(e) => setFormData({ ...formData, abstract: e.target.value })}
                                        rows={6}
                                        required
                                    />
                                </div>

                                {/* Links */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="linkPdf">PDF Link</Label>
                                        <Input
                                            id="linkPdf"
                                            value={formData.links?.pdf || ''}
                                            onChange={(e) => setFormData({ ...formData, links: { ...formData.links, pdf: e.target.value } })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="linkDoi">DOI Link</Label>
                                        <Input
                                            id="linkDoi"
                                            value={formData.links?.doi || ''}
                                            onChange={(e) => setFormData({ ...formData, links: { ...formData.links, doi: e.target.value } })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="linkCode">Code Link</Label>
                                        <Input
                                            id="linkCode"
                                            value={formData.links?.code || ''}
                                            onChange={(e) => setFormData({ ...formData, links: { ...formData.links, code: e.target.value } })}
                                        />
                                    </div>
                                </div>

                                {/* Keywords */}
                                <div>
                                    <Label>Keywords</Label>
                                    <div className="flex flex-wrap gap-2 mb-2">
                                        {formData.keywords.map((kw, index) => (
                                            <Badge key={index} variant="outline" className="flex items-center gap-1">
                                                {kw}
                                                <X
                                                    className="h-3 w-3 cursor-pointer"
                                                    onClick={() => removeKeyword(index)}
                                                />
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Add keyword"
                                            value={newKeyword}
                                            onChange={(e) => setNewKeyword(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    addKeyword(newKeyword)
                                                    setNewKeyword('')
                                                }
                                            }}
                                        />
                                        <Button
                                            type="button"
                                            onClick={() => {
                                                addKeyword(newKeyword)
                                                setNewKeyword('')
                                            }}
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>

                        <DialogFooter className="p-6 pt-4 border-t">
                            <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button type="submit" form="research-form" disabled={saving}>
                                {saving ? 'Saving...' : (editingPaper ? 'Update' : 'Create')}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {message && (
                <Alert>
                    <AlertDescription className="text-green-600">{message}</AlertDescription>
                </Alert>
            )}

            {error && (
                <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                </Alert>
            )}

            <div className="grid gap-6">
                {papers.map((paper) => (
                    <Card key={paper.id}>
                        <CardHeader>
                            <CardTitle className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <FileText className="h-5 w-5" />
                                        <h3 className="text-lg font-semibold">{paper.title}</h3>
                                        <Badge className={getStatusColor(paper.status)}>
                                            {paper.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Users className="h-4 w-4" />
                                            {paper.authors.length} Authors
                                        </span>
                                        <span>{paper.year}</span>
                                        <Badge variant="outline">{paper.category}</Badge>
                                        <span>IF: {paper.impact_factor}</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleEdit(paper)}
                                    >
                                        <Edit2 className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => handleDelete(paper.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-gray-600 mb-3 line-clamp-2">{paper.abstract}</p>

                            <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                                {paper.links.pdf && <span className="flex items-center gap-1"><LinkIcon className="w-3 h-3" /> PDF</span>}
                                {paper.links.code && <span className="flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Code</span>}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {papers.length === 0 && (
                <Card>
                    <CardContent className="p-8 text-center text-gray-500">
                        No research papers found. Add your first paper above.
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
