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
import { Plus, Edit2, Trash2, Building, Calendar, X } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface Role {
  title: string
  duration: string
  type: string
  description: string
  achievements: string[]
  technologies: string[]
}

interface Experience {
  experience_id: string
  type: 'company' | 'break'
  company?: string
  location?: string
  duration?: string
  description?: string
  roles?: Role[]
}

export default function ExperienceManagement() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null)

  const emptyExperience: Experience = {
    experience_id: '',
    type: 'company',
    company: '',
    location: '',
    roles: []
  }

  const emptyRole: Role = {
    title: '',
    duration: '',
    type: 'Full-time',
    description: '',
    achievements: [],
    technologies: []
  }

  const [formData, setFormData] = useState<Experience>(emptyExperience)
  const [newAchievement, setNewAchievement] = useState('')
  const [newTechnology, setNewTechnology] = useState('')
  const [editingRoleIndex, setEditingRoleIndex] = useState<number | null>(null)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/experiences`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setExperiences(data.data || [])
      } else {
        setError('Failed to fetch experiences')
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
      const url = editingExperience
        ? `${API_BASE}/admin/experiences/${editingExperience.experience_id}`
        : `${API_BASE}/admin/experiences`

      const method = editingExperience ? 'PUT' : 'POST'

      const experienceData = {
        ...formData,
        experience_id: formData.experience_id || Date.now().toString()
      }

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(experienceData)
      })

      if (response.ok) {
        await fetchExperiences()
        setMessage(editingExperience ? 'Experience updated successfully!' : 'Experience created successfully!')
        setTimeout(() => setMessage(''), 3000)
        setIsDialogOpen(false)
        setEditingExperience(null)
        setFormData(emptyExperience)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to save experience')
      }
    } catch (error) {
      console.error(error)
      setError('Network error')
    }
    setSaving(false)
  }

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience)
    setFormData(experience)
    setIsDialogOpen(true)
  }

  const handleDelete = async (experienceId: string) => {
    if (!confirm('Are you sure you want to delete this experience?')) return

    setSaving(true)
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/experiences/${experienceId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        await fetchExperiences()
        setMessage('Experience deleted successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setError('Failed to delete experience')
      }
    } catch (error) {
      setError('Network error')
    }
    setSaving(false)
  }

  const addRole = () => {
    setFormData({
      ...formData,
      roles: [...(formData.roles || []), { ...emptyRole }]
    })
    setEditingRoleIndex((formData.roles || []).length)
  }

  const updateRole = (index: number, role: Role) => {
    const updatedRoles = [...(formData.roles || [])]
    updatedRoles[index] = role
    setFormData({ ...formData, roles: updatedRoles })
  }

  const removeRole = (index: number) => {
    const updatedRoles = (formData.roles || []).filter((_, i) => i !== index)
    setFormData({ ...formData, roles: updatedRoles })
    setEditingRoleIndex(null)
  }

  const addToRoleArray = (roleIndex: number, field: 'achievements' | 'technologies', value: string) => {
    if (!value.trim()) return
    const updatedRoles = [...(formData.roles || [])]
    const currentArray = updatedRoles[roleIndex][field] || []
    if (!currentArray.includes(value.trim())) {
      updatedRoles[roleIndex] = {
        ...updatedRoles[roleIndex],
        [field]: [...currentArray, value.trim()]
      }
      setFormData({ ...formData, roles: updatedRoles })
    }
  }

  const removeFromRoleArray = (roleIndex: number, field: 'achievements' | 'technologies', itemIndex: number) => {
    const updatedRoles = [...(formData.roles || [])]
    const currentArray = updatedRoles[roleIndex][field] || []
    updatedRoles[roleIndex] = {
      ...updatedRoles[roleIndex],
      [field]: currentArray.filter((_, i) => i !== itemIndex)
    }
    setFormData({ ...formData, roles: updatedRoles })
  }

  const resetForm = () => {
    setFormData(emptyExperience)
    setEditingExperience(null)
    setEditingRoleIndex(null)
    setNewAchievement('')
    setNewTechnology('')
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Experience Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Add Experience
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0 gap-0">
            <DialogHeader className="p-6 pb-4 border-b">
              <DialogTitle>
                {editingExperience ? 'Edit Experience' : 'Add New Experience'}
              </DialogTitle>
            </DialogHeader>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="type">Type</Label>
                    <Select value={formData.type} onValueChange={(value: 'company' | 'break') => setFormData({ ...formData, type: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="break">Career Break</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {formData.type === 'company' && (
                    <>
                      <div>
                        <Label htmlFor="company">Company</Label>
                        <Input
                          id="company"
                          value={formData.company || ''}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location || ''}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {formData.type === 'break' && (
                    <>
                      <div>
                        <Label htmlFor="duration">Duration</Label>
                        <Input
                          id="duration"
                          value={formData.duration || ''}
                          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                          placeholder="e.g., Jul 2024 – Feb 2025"
                          required
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          value={formData.description || ''}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Brief description of the career break"
                        />
                      </div>
                    </>
                  )}
                </div>

                {formData.type === 'company' && (
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <Label>Roles</Label>
                      <Button type="button" onClick={addRole} size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Role
                      </Button>
                    </div>

                    <div className="space-y-4">
                      {(formData.roles || []).map((role, index) => (
                        <Card key={index}>
                          <CardHeader>
                            <CardTitle className="flex items-center justify-between text-lg">
                              Role {index + 1}
                              <div className="flex gap-2">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => setEditingRoleIndex(editingRoleIndex === index ? null : index)}
                                >
                                  <Edit2 className="h-4 w-4" />
                                </Button>
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeRole(index)}
                                  className="text-red-500"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            {editingRoleIndex === index ? (
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label>Title</Label>
                                    <Input
                                      value={role.title}
                                      onChange={(e) => updateRole(index, { ...role, title: e.target.value })}
                                      required
                                    />
                                  </div>
                                  <div>
                                    <Label>Duration</Label>
                                    <Input
                                      value={role.duration}
                                      onChange={(e) => updateRole(index, { ...role, duration: e.target.value })}
                                      placeholder="e.g., Aug 2025 – Present"
                                      required
                                    />
                                  </div>
                                  <div>
                                    <Label>Type</Label>
                                    <Select value={role.type} onValueChange={(value) => updateRole(index, { ...role, type: value })}>
                                      <SelectTrigger>
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        <SelectItem value="Full-time">Full-time</SelectItem>
                                        <SelectItem value="Contract">Contract</SelectItem>
                                        <SelectItem value="Internship">Internship</SelectItem>
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>

                                <div>
                                  <Label>Description</Label>
                                  <Textarea
                                    value={role.description}
                                    onChange={(e) => updateRole(index, { ...role, description: e.target.value })}
                                    rows={3}
                                  />
                                </div>

                                {/* Achievements */}
                                <div>
                                  <Label>Achievements</Label>
                                  <div className="space-y-2 mb-2">
                                    {(role.achievements || []).map((achievement, achIndex) => (
                                      <div key={achIndex} className="flex items-center gap-2 p-2 bg-gray-50 rounded dark:bg-zinc-800">
                                        <span className="flex-1 text-sm">{achievement}</span>
                                        <X
                                          className="h-4 w-4 cursor-pointer text-red-500"
                                          onClick={() => removeFromRoleArray(index, 'achievements', achIndex)}
                                        />
                                      </div>
                                    ))}
                                  </div>
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Add achievement"
                                      value={newAchievement}
                                      onChange={(e) => setNewAchievement(e.target.value)}
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault()
                                          addToRoleArray(index, 'achievements', newAchievement)
                                          setNewAchievement('')
                                        }
                                      }}
                                    />
                                    <Button
                                      type="button"
                                      onClick={() => {
                                        addToRoleArray(index, 'achievements', newAchievement)
                                        setNewAchievement('')
                                      }}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Technologies */}
                                <div>
                                  <Label>Technologies</Label>
                                  <div className="flex flex-wrap gap-2 mb-2">
                                    {(role.technologies || []).map((tech, techIndex) => (
                                      <Badge key={techIndex} variant="secondary" className="flex items-center gap-1">
                                        {tech}
                                        <X
                                          className="h-3 w-3 cursor-pointer"
                                          onClick={() => removeFromRoleArray(index, 'technologies', techIndex)}
                                        />
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex gap-2">
                                    <Input
                                      placeholder="Add technology"
                                      value={newTechnology}
                                      onChange={(e) => setNewTechnology(e.target.value)}
                                      onKeyPress={(e) => {
                                        if (e.key === 'Enter') {
                                          e.preventDefault()
                                          addToRoleArray(index, 'technologies', newTechnology)
                                          setNewTechnology('')
                                        }
                                      }}
                                    />
                                    <Button
                                      type="button"
                                      onClick={() => {
                                        addToRoleArray(index, 'technologies', newTechnology)
                                        setNewTechnology('')
                                      }}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div>
                                <h4 className="font-semibold">{role.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{role.duration} • {role.type}</p>
                                <p className="text-sm mt-2">{role.description}</p>
                                {role.technologies && role.technologies.length > 0 && (
                                  <div className="flex flex-wrap gap-1 mt-2">
                                    {role.technologies.slice(0, 3).map((tech, techIndex) => (
                                      <Badge key={techIndex} variant="outline" className="text-xs">
                                        {tech}
                                      </Badge>
                                    ))}
                                    {role.technologies.length > 3 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{role.technologies.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <DialogFooter className="p-6 pt-4 border-t">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={(e) => handleSubmit(e as any)} disabled={saving}>
                {saving ? 'Saving...' : (editingExperience ? 'Update' : 'Create')}
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
        {experiences.map((experience) => (
          <Card key={experience.experience_id}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {experience.type === 'company' ? (
                    <Building className="h-5 w-5" />
                  ) : (
                    <Calendar className="h-5 w-5" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {experience.type === 'company' ? experience.company : 'Career Break'}
                    </h3>
                    {experience.location && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{experience.location}</p>
                    )}
                    {experience.type === 'break' && experience.duration && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">{experience.duration}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(experience)}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(experience.experience_id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {experience.type === 'break' && experience.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">{experience.description}</p>
              )}

              {experience.type === 'company' && experience.roles && (
                <div className="space-y-4">
                  {experience.roles.map((role, index) => (
                    <div key={index} className="border-l-2 border-blue-200 pl-4 dark:border-blue-800">
                      <h4 className="font-semibold">{role.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{role.duration} • {role.type}</p>
                      <p className="text-sm mt-1">{role.description}</p>
                      {role.achievements && role.achievements.length > 0 && (
                        <div className="mt-2">
                          <p className="text-xs font-medium text-gray-700 dark:text-gray-300">Key Achievements:</p>
                          <ul className="text-xs text-gray-600 dark:text-gray-400 mt-1 space-y-1">
                            {role.achievements.slice(0, 2).map((achievement, achIndex) => (
                              <li key={achIndex}>• {achievement}</li>
                            ))}
                            {role.achievements.length > 2 && (
                              <li>• +{role.achievements.length - 2} more achievements</li>
                            )}
                          </ul>
                        </div>
                      )}
                      {role.technologies && role.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {role.technologies.slice(0, 4).map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {role.technologies.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{role.technologies.length - 4}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {experiences.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            No experiences found. Add your first experience above.
          </CardContent>
        </Card>
      )}
    </div>
  )
}