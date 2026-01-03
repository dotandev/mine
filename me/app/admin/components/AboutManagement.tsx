'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface AboutInfo {
  name: string
  title: string
  bio: string
  location: string
  avatar: string
  resume_url?: string
  interests: string[]
  languages: string[]
  fun_facts: string[]
  current_focus: string[]
}

export default function AboutManagement() {
  const [aboutInfo, setAboutInfo] = useState<AboutInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  // Form state for arrays
  const [newInterest, setNewInterest] = useState('')
  const [newLanguage, setNewLanguage] = useState('')
  const [newFunFact, setNewFunFact] = useState('')
  const [newFocus, setNewFocus] = useState('')

  useEffect(() => {
    fetchAboutInfo()
  }, [])

  const fetchAboutInfo = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/about`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setAboutInfo(data.data || {
          name: '',
          title: '',
          bio: '',
          location: '',
          avatar: '',
          resume_url: '',
          interests: [],
          languages: [],
          fun_facts: [],
          current_focus: []
        })
      } else {
        setError('Failed to fetch about information')
      }
    } catch (error) {
      setError('Network error')
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!aboutInfo) return

    setSaving(true)
    setError('')
    setMessage('')

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/about`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(aboutInfo)
      })

      if (response.ok) {
        setMessage('About information updated successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to update about information')
      }
    } catch (error) {
      setError('Network error')
    }
    setSaving(false)
  }

  const updateField = (field: keyof AboutInfo, value: any) => {
    if (!aboutInfo) return
    setAboutInfo({ ...aboutInfo, [field]: value })
  }

  const addToArray = (field: 'interests' | 'languages' | 'fun_facts' | 'current_focus', value: string) => {
    if (!aboutInfo || !value.trim()) return
    const currentArray = aboutInfo[field] || []
    if (!currentArray.includes(value.trim())) {
      updateField(field, [...currentArray, value.trim()])
    }
  }

  const removeFromArray = (field: 'interests' | 'languages' | 'fun_facts' | 'current_focus', index: number) => {
    if (!aboutInfo) return
    const currentArray = aboutInfo[field] || []
    updateField(field, currentArray.filter((_, i) => i !== index))
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  if (!aboutInfo) {
    return <div className="text-center p-8 text-red-500">Failed to load about information</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">About Management</h2>
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

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={aboutInfo.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={aboutInfo.title}
                  onChange={(e) => updateField('title', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={aboutInfo.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="avatar">Avatar URL</Label>
                <Input
                  id="avatar"
                  value={aboutInfo.avatar}
                  onChange={(e) => updateField('avatar', e.target.value)}
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="resume_url">Resume URL</Label>
                <Input
                  id="resume_url"
                  value={aboutInfo.resume_url || ''}
                  onChange={(e) => updateField('resume_url', e.target.value)}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={aboutInfo.bio}
                onChange={(e) => updateField('bio', e.target.value)}
                rows={4}
                required
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Interests</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {aboutInfo.interests.map((interest, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {interest}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArray('interests', index)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new interest"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addToArray('interests', newInterest)
                    setNewInterest('')
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  addToArray('interests', newInterest)
                  setNewInterest('')
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Languages</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {aboutInfo.languages.map((language, index) => (
                <Badge key={index} variant="secondary" className="flex items-center gap-1">
                  {language}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArray('languages', index)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new language"
                value={newLanguage}
                onChange={(e) => setNewLanguage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addToArray('languages', newLanguage)
                    setNewLanguage('')
                  }
                }}
              />
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
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fun Facts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              {aboutInfo.fun_facts.map((fact, index) => (
                <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                  <span className="flex-1">{fact}</span>
                  <X 
                    className="h-4 w-4 cursor-pointer text-red-500" 
                    onClick={() => removeFromArray('fun_facts', index)}
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new fun fact"
                value={newFunFact}
                onChange={(e) => setNewFunFact(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addToArray('fun_facts', newFunFact)
                    setNewFunFact('')
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  addToArray('fun_facts', newFunFact)
                  setNewFunFact('')
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Focus</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {aboutInfo.current_focus.map((focus, index) => (
                <Badge key={index} variant="outline" className="flex items-center gap-1">
                  {focus}
                  <X 
                    className="h-3 w-3 cursor-pointer" 
                    onClick={() => removeFromArray('current_focus', index)}
                  />
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                placeholder="Add new focus area"
                value={newFocus}
                onChange={(e) => setNewFocus(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addToArray('current_focus', newFocus)
                    setNewFocus('')
                  }
                }}
              />
              <Button
                type="button"
                onClick={() => {
                  addToArray('current_focus', newFocus)
                  setNewFocus('')
                }}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Update About Information'}
          </Button>
        </div>
      </form>
    </div>
  )
}