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
import { Plus, Edit2, Trash2, FileText, Calendar, Clock, X } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  author: string
  published_date: string
  tags: string[]
  category: string
  reading_time: number
  status: 'draft' | 'published' | 'archived'
}

const categories = ['Technology', 'Career', 'Tutorial', 'Opinion', 'News']
const statuses = ['draft', 'published', 'archived']

export default function BlogManagement() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)

  const emptyPost: BlogPost = {
    id: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    author: 'Khabib Thekillys',
    published_date: new Date().toISOString().split('T')[0],
    tags: [],
    category: 'Technology',
    reading_time: 5,
    status: 'draft'
  }

  const [formData, setFormData] = useState<BlogPost>(emptyPost)
  const [newTag, setNewTag] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/blog`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setPosts(data.data || [])
      } else {
        setError('Failed to fetch blog posts')
      }
    } catch (error) {
      setError('Network error')
    }
    setLoading(false)
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const wordCount = content.split(/\s+/).length
    return Math.max(1, Math.ceil(wordCount / wordsPerMinute))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')

    try {
      const token = localStorage.getItem('admin_token')
      const url = editingPost
        ? `${API_BASE}/admin/blog/${editingPost.id}`
        : `${API_BASE}/admin/blog`

      const method = editingPost ? 'PUT' : 'POST'

      const postData = {
        ...formData,
        id: formData.id || Date.now().toString(),
        slug: formData.slug || generateSlug(formData.title),
        reading_time: estimateReadingTime(formData.content)
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(postData)
      })

      if (response.ok) {
        await fetchPosts()
        setMessage(editingPost ? 'Blog post updated successfully!' : 'Blog post created successfully!')
        setTimeout(() => setMessage(''), 3000)
        setIsDialogOpen(false)
        setEditingPost(null)
        setFormData(emptyPost)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to save blog post')
      }
    } catch (error) {
      setError('Network error')
    }
    setSaving(false)
  }

  const handleEdit = (post: BlogPost) => {
    setEditingPost(post)
    setFormData(post)
    setIsDialogOpen(true)
  }

  const handleDelete = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) return

    setSaving(true)
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/blog/${postId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        await fetchPosts()
        setMessage('Blog post deleted successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError('Failed to delete blog post')
      }
    } catch (error) {
      setError('Network error')
    }
    setSaving(false)
  }

  const addTag = (tag: string) => {
    if (!tag.trim()) return
    if (!formData.tags.includes(tag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, tag.trim()]
      })
    }
  }

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((_, i) => i !== index)
    })
  }

  const resetForm = () => {
    setFormData(emptyPost)
    setEditingPost(null)
    setNewTag('')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Blog Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Blog Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle>
                {editingPost ? 'Edit Blog Post' : 'Add New Blog Post'}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="blog-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => {
                        const title = e.target.value
                        setFormData({
                          ...formData,
                          title,
                          slug: generateSlug(title)
                        })
                      }}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
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
                    <Select value={formData.status} onValueChange={(value: 'draft' | 'published' | 'archived') => setFormData({ ...formData, status: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="published_date">Published Date</Label>
                    <Input
                      id="published_date"
                      type="date"
                      value={formData.published_date}
                      onChange={(e) => setFormData({ ...formData, published_date: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    rows={3}
                    placeholder="Brief description of the blog post"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content (Markdown)</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => {
                      const content = e.target.value
                      setFormData({
                        ...formData,
                        content,
                        reading_time: estimateReadingTime(content)
                      })
                    }}
                    rows={12}
                    placeholder="Write your blog post content in Markdown format..."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Estimated reading time: {formData.reading_time} minute{formData.reading_time !== 1 ? 's' : ''}
                  </p>
                </div>

                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeTag(index)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Add tag"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault()
                          addTag(newTag)
                          setNewTag('')
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        addTag(newTag)
                        setNewTag('')
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
              <Button type="submit" form="blog-form" disabled={saving}>
                {saving ? 'Saving...' : (editingPost ? 'Update' : 'Create')}
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
        {posts.map((post) => (
          <Card key={post.id}>
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="h-5 w-5" />
                    <h3 className="text-lg font-semibold">{post.title}</h3>
                    <Badge className={getStatusColor(post.status)}>
                      {post.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.published_date).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {post.reading_time} min read
                    </span>
                    <Badge variant="outline">{post.category}</Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-3">{post.excerpt}</p>

              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-3">
                  {post.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              <div className="text-sm text-gray-500">
                <p>Author: {post.author}</p>
                <p>Slug: /{post.slug}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {posts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            No blog posts found. Add your first blog post above.
          </CardContent>
        </Card>
      )}
    </div>
  )
}