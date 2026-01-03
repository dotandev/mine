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
import { Plus, Edit2, Trash2, ExternalLink, Github, X } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface Project {
  id: string
  searchName: string
  name: string
  category: string
  description: string
  image: string
  languages: string[]
  technologies?: string[]
  tags: string[]
  date: string
  framework: string
  industry: string
  tasks: string[]
  requirements: string[]
  details: string
  github: string
  demo?: string
  status?: string
  team?: string
  year?: string
  timeline?: {
    date: string
    title: string
    description: string
  }[]
}

const categories = ['Library', 'Backend', 'Frontend', 'Website', 'Mobile', 'Desktop', 'Game', 'AI/ML', 'Blockchain']
const languages = ['JavaScript', 'TypeScript', 'Python', 'Rust', 'Go', 'Java', 'C#', 'C++', 'HTML', 'CSS', 'Node.js', 'Express']

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  const emptyProject: Project = {
    id: '',
    searchName: '',
    name: '',
    category: '',
    description: '',
    image: 'https://via.placeholder.com/150',
    languages: [],
    technologies: [],
    tags: [],
    date: new Date().toISOString().split('T')[0],
    framework: '',
    industry: '',
    tasks: [],
    requirements: [],
    details: '',
    github: '',
    demo: '',
    status: 'Active',
    team: '',
    year: new Date().getFullYear().toString(),
    timeline: []
  }

  const [formData, setFormData] = useState<Project>(emptyProject)
  const [newTag, setNewTag] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  const [newTask, setNewTask] = useState('')
  const [newRequirement, setNewRequirement] = useState('')
  const [newTimelineEvent, setNewTimelineEvent] = useState({ date: '', title: '', description: '' })

  useEffect(() => {
    fetchProjects()
  }, [])
  // ... (existing fetchProjects) ...

  // ... (existing helper functions) ...

  const addTimelineEvent = () => {
    if (!newTimelineEvent.title.trim() || !newTimelineEvent.date.trim()) return
    setFormData({
      ...formData,
      timeline: [...(formData.timeline || []), newTimelineEvent]
    })
    setNewTimelineEvent({ date: '', title: '', description: '' })
  }

  const removeTimelineEvent = (index: number) => {
    setFormData({
      ...formData,
      timeline: (formData.timeline || []).filter((_, i) => i !== index)
    })
  }

  const resetForm = () => {
    setFormData(emptyProject)
    setEditingProject(null)
    setNewTag('')
    setNewLanguage('')
    setNewTask('')
    setNewRequirement('')
    setNewTimelineEvent({ date: '', title: '', description: '' })
  }

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/projects`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setProjects(data.data || [])
      } else {
        setError('Failed to fetch projects')
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
      const url = editingProject
        ? `${API_BASE}/admin/projects/${editingProject.id}`
        : `${API_BASE}/admin/projects`

      const method = editingProject ? 'PUT' : 'POST'

      // Generate ID and searchName for new projects
      const projectData = {
        ...formData,
        id: formData.id || Date.now().toString(),
        searchName: formData.searchName || formData.name.toLowerCase().replace(/[^a-z0-9]/g, '')
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      })

      if (response.ok) {
        await fetchProjects()
        setMessage(editingProject ? 'Project updated successfully!' : 'Project created successfully!')
        setTimeout(() => setMessage(''), 3000)
        setIsDialogOpen(false)
        setEditingProject(null)
        setFormData(emptyProject)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to save project')
      }
    } catch (error) {
      setError('Network error')
    }
    setSaving(false)
  }

  const handleEdit = (project: Project) => {
    setEditingProject(project)
    setFormData(project)
    setIsDialogOpen(true)
  }

  const handleDelete = async (projectId: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    setSaving(true)
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/projects/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        await fetchProjects()
        setMessage('Project deleted successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError('Failed to delete project')
      }
    } catch (error) {
      setError('Network error')
    }
    setSaving(false)
  }

  const addToArray = (field: 'tags' | 'languages' | 'tasks' | 'requirements', value: string) => {
    if (!value.trim()) return
    const currentArray = formData[field] || []
    if (!currentArray.includes(value.trim())) {
      setFormData({
        ...formData,
        [field]: [...currentArray, value.trim()]
      })
    }
  }

  const removeFromArray = (field: 'tags' | 'languages' | 'tasks' | 'requirements', index: number) => {
    const currentArray = formData[field] || []
    setFormData({
      ...formData,
      [field]: currentArray.filter((_, i) => i !== index)
    })
  }



  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Projects Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle>
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6">
              <form id="project-form" onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Project Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    <Label htmlFor="framework">Framework</Label>
                    <Input
                      id="framework"
                      value={formData.framework}
                      onChange={(e) => setFormData({ ...formData, framework: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={formData.industry}
                      onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label htmlFor="github">GitHub URL</Label>
                    <Input
                      id="github"
                      value={formData.github}
                      onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="demo">Demo URL</Label>
                    <Input
                      id="demo"
                      value={formData.demo || ''}
                      onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="details">Details</Label>
                  <Textarea
                    id="details"
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    rows={4}
                  />
                </div>

                {/* Languages */}
                <div>
                  <Label>Languages</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.languages.map((lang, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {lang}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray('languages', index)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Select value={newLanguage} onValueChange={setNewLanguage}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        {languages.map(lang => (
                          <SelectItem key={lang} value={lang}>{lang}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      onClick={() => {
                        addToArray('languages', newLanguage)
                        setNewLanguage('')
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <Label>Tags</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="flex items-center gap-1">
                        {tag}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => removeFromArray('tags', index)}
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
                          addToArray('tags', newTag)
                          setNewTag('')
                        }
                      }}
                    />
                    <Button
                      type="button"
                      onClick={() => {
                        addToArray('tags', newTag)
                        setNewTag('')
                      }}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Timeline Management */}
                <div>
                  <Label>Timeline Events</Label>
                  <div className="space-y-3 mb-4">
                    {(formData.timeline || []).map((event, index) => (
                      <div key={index} className="flex items-start gap-2 p-3 bg-secondary/20 rounded-lg border border-border/50">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm bg-primary/10 px-2 py-0.5 rounded text-primary">{event.date}</span>
                            <span className="font-semibold text-sm">{event.title}</span>
                          </div>
                          <p className="text-xs text-muted-foreground">{event.description}</p>
                        </div>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeTimelineEvent(index)}
                          className="text-red-500 hover:text-red-700 h-6 w-6 p-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
                    <Input
                      placeholder="Date (e.g., 2024-01)"
                      value={newTimelineEvent.date}
                      onChange={(e) => setNewTimelineEvent({ ...newTimelineEvent, date: e.target.value })}
                    />
                    <Input
                      placeholder="Title (e.g., Alpha Release)"
                      value={newTimelineEvent.title}
                      onChange={(e) => setNewTimelineEvent({ ...newTimelineEvent, title: e.target.value })}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Description"
                      value={newTimelineEvent.description}
                      onChange={(e) => setNewTimelineEvent({ ...newTimelineEvent, description: e.target.value })}
                    />
                    <Button
                      type="button"
                      onClick={addTimelineEvent}
                      disabled={!newTimelineEvent.date || !newTimelineEvent.title}
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
              <Button type="submit" form="project-form" disabled={saving}>
                {saving ? 'Saving...' : (editingProject ? 'Update' : 'Create')}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{project.name}</h3>
                  <Badge variant="secondary" className="mt-1">{project.category}</Badge>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(project)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(project.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">{project.description}</p>

              <div className="flex flex-wrap gap-1 mb-3">
                {project.languages.slice(0, 3).map((lang, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {lang}
                  </Badge>
                ))}
                {project.languages.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{project.languages.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2">
                {project.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button variant="outline" size="sm" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            No projects found. Add your first project above.
          </CardContent>
        </Card>
      )}
    </div>
  )
}