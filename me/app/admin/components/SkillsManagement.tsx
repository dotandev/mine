'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { X, Plus, Edit2, Save } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface Skill {
  category: string
  items: string[]
  _id?: string
}

export default function SkillsManagement() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [editingCategory, setEditingCategory] = useState<string | null>(null)
  const [newSkillInputs, setNewSkillInputs] = useState<{ [key: string]: string }>({})
  const [newCategory, setNewCategory] = useState({ category: '', items: '' })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/skills`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setSkills(data.data || [])
      } else {
        setError('Failed to fetch skills')
      }
    } catch (error) {
      setError('Network error')
    }
    setLoading(false)
  }

  const updateSkillCategory = async (category: string, updatedSkill: Skill) => {
    setSaving(true)
    setError('')
    setMessage('')

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/skills/${encodeURIComponent(category)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updatedSkill)
      })

      if (response.ok) {
        await fetchSkills()
        setMessage('Skills updated successfully!')
        setTimeout(() => setMessage(''), 3000)
        setEditingCategory(null)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to update skills')
      }
    } catch (error) {
      setError('Network error')
    }
    setSaving(false)
  }

  const addSkillToCategory = (category: string) => {
    const newSkill = newSkillInputs[category]?.trim()
    if (!newSkill) return

    const skillCategory = skills.find(s => s.category === category)
    if (!skillCategory) return

    if (!skillCategory.items.includes(newSkill)) {
      const updatedSkill = {
        ...skillCategory,
        items: [...skillCategory.items, newSkill]
      }
      updateSkillCategory(category, updatedSkill)
      setNewSkillInputs({ ...newSkillInputs, [category]: '' })
    }
  }

  const removeSkillFromCategory = (category: string, skillIndex: number) => {
    const skillCategory = skills.find(s => s.category === category)
    if (!skillCategory) return

    const updatedSkill = {
      ...skillCategory,
      items: skillCategory.items.filter((_, index) => index !== skillIndex)
    }
    updateSkillCategory(category, updatedSkill)
  }

  const addNewCategory = async () => {
    if (!newCategory.category.trim() || !newCategory.items.trim()) return

    const items = newCategory.items.split(',').map(item => item.trim()).filter(item => item)
    const skillData = {
      category: newCategory.category.trim(),
      items
    }

    await updateSkillCategory(newCategory.category.trim(), skillData)
    setNewCategory({ category: '', items: '' })
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Skills Management</h2>
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

      {/* Add New Category */}
      <Card>
        <CardHeader>
          <CardTitle>Add New Skill Category</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="newCategory">Category Name</Label>
              <Input
                id="newCategory"
                placeholder="e.g., Programming Languages"
                value={newCategory.category}
                onChange={(e) => setNewCategory({ ...newCategory, category: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="newItems">Skills (comma-separated)</Label>
              <Input
                id="newItems"
                placeholder="e.g., JavaScript, TypeScript, Python"
                value={newCategory.items}
                onChange={(e) => setNewCategory({ ...newCategory, items: e.target.value })}
              />
            </div>
          </div>
          <Button onClick={addNewCategory} disabled={saving}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
        </CardContent>
      </Card>

      {/* Existing Skills */}
      <div className="grid gap-6">
        {skills.map((skill) => (
          <Card key={skill.category}>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {skill.category}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingCategory(editingCategory === skill.category ? null : skill.category)}
                >
                  {editingCategory === skill.category ? (
                    <>
                      <X className="h-4 w-4 mr-2" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </>
                  )}
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Skills Display */}
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {item}
                    {editingCategory === skill.category && (
                      <X 
                        className="h-3 w-3 cursor-pointer text-red-500" 
                        onClick={() => removeSkillFromCategory(skill.category, index)}
                      />
                    )}
                  </Badge>
                ))}
              </div>

              {/* Add New Skill Input */}
              {editingCategory === skill.category && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new skill"
                    value={newSkillInputs[skill.category] || ''}
                    onChange={(e) => setNewSkillInputs({ 
                      ...newSkillInputs, 
                      [skill.category]: e.target.value 
                    })}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addSkillToCategory(skill.category)
                      }
                    }}
                  />
                  <Button
                    onClick={() => addSkillToCategory(skill.category)}
                    disabled={saving}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {skills.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            No skills found. Add your first skill category above.
          </CardContent>
        </Card>
      )}
    </div>
  )
}