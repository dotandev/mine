'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mail, Phone, MapPin, Globe, Github, Linkedin, Twitter, User } from 'lucide-react'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

interface SocialLinks {
  github?: string
  linkedin?: string
  twitter?: string
  website?: string
}

interface Availability {
  status: 'available' | 'busy' | 'unavailable'
  message: string
}

interface ContactInfo {
  email: string
  phone: string
  location: string
  social_links: SocialLinks
  availability: Availability
}

export default function ContactManagement() {
  const [contactInfo, setContactInfo] = useState<ContactInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/contact`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (response.ok) {
        const data = await response.json()
        setContactInfo(data.data || {
          email: '',
          phone: '',
          location: '',
          social_links: {},
          availability: {
            status: 'available',
            message: ''
          }
        })
      } else {
        setError('Failed to fetch contact information')
      }
    } catch (error) {
      setError('Network error')
    }
    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!contactInfo) return

    setSaving(true)
    setError('')
    setMessage('')

    try {
      const token = localStorage.getItem('admin_token')
      const response = await fetch(`${API_BASE}/admin/contact`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(contactInfo)
      })

      if (response.ok) {
        setMessage('Contact information updated successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        const data = await response.json()
        setError(data.error || 'Failed to update contact information')
      }
    } catch (error) {
      setError('Network error')
    }
    setSaving(false)
  }

  const updateField = (field: keyof ContactInfo, value: any) => {
    if (!contactInfo) return
    setContactInfo({ ...contactInfo, [field]: value })
  }

  const updateSocialLink = (platform: keyof SocialLinks, url: string) => {
    if (!contactInfo) return
    setContactInfo({
      ...contactInfo,
      social_links: {
        ...contactInfo.social_links,
        [platform]: url
      }
    })
  }

  const updateAvailability = (field: keyof Availability, value: any) => {
    if (!contactInfo) return
    setContactInfo({
      ...contactInfo,
      availability: {
        ...contactInfo.availability,
        [field]: value
      }
    })
  }

  const getAvailabilityColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800'
      case 'busy': return 'bg-yellow-100 text-yellow-800'
      case 'unavailable': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getAvailabilityIcon = (status: string) => {
    switch (status) {
      case 'available': return '🟢'
      case 'busy': return '🟡'
      case 'unavailable': return '🔴'
      default: return '⚪'
    }
  }

  if (loading) {
    return <div className="flex justify-center p-8">Loading...</div>
  }

  if (!contactInfo) {
    return <div className="text-center p-8 text-red-500">Failed to load contact information</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Contact Management</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Current Status:</span>
          <Badge className={getAvailabilityColor(contactInfo.availability.status)}>
            {getAvailabilityIcon(contactInfo.availability.status)} {contactInfo.availability.status}
          </Badge>
        </div>
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
        {/* Basic Contact Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={contactInfo.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  value={contactInfo.phone}
                  onChange={(e) => updateField('phone', e.target.value)}
                  placeholder="+234 (0) 123-4567"
                />
              </div>
              <div className="md:col-span-2">
                <Label htmlFor="location" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Location
                </Label>
                <Input
                  id="location"
                  value={contactInfo.location}
                  onChange={(e) => updateField('location', e.target.value)}
                  placeholder="City, Country"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Links */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Social Links
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="github" className="flex items-center gap-2">
                  <Github className="h-4 w-4" />
                  GitHub Profile
                </Label>
                <Input
                  id="github"
                  value={contactInfo.social_links.github || ''}
                  onChange={(e) => updateSocialLink('github', e.target.value)}
                  placeholder="https://github.com/username"
                />
              </div>
              <div>
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedin"
                  value={contactInfo.social_links.linkedin || ''}
                  onChange={(e) => updateSocialLink('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
              <div>
                <Label htmlFor="twitter" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter Profile
                </Label>
                <Input
                  id="twitter"
                  value={contactInfo.social_links.twitter || ''}
                  onChange={(e) => updateSocialLink('twitter', e.target.value)}
                  placeholder="https://twitter.com/username"
                />
              </div>
              <div>
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Personal Website
                </Label>
                <Input
                  id="website"
                  value={contactInfo.social_links.website || ''}
                  onChange={(e) => updateSocialLink('website', e.target.value)}
                  placeholder="https://yourwebsite.com"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Availability Status */}
        <Card>
          <CardHeader>
            <CardTitle>Availability Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="status">Current Status</Label>
              <Select 
                value={contactInfo.availability.status} 
                onValueChange={(value: 'available' | 'busy' | 'unavailable') => updateAvailability('status', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select availability status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">
                    <div className="flex items-center gap-2">
                      <span>🟢</span>
                      Available for new opportunities
                    </div>
                  </SelectItem>
                  <SelectItem value="busy">
                    <div className="flex items-center gap-2">
                      <span>🟡</span>
                      Busy but open to interesting projects
                    </div>
                  </SelectItem>
                  <SelectItem value="unavailable">
                    <div className="flex items-center gap-2">
                      <span>🔴</span>
                      Currently unavailable
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="availability-message">Status Message</Label>
              <Textarea
                id="availability-message"
                value={contactInfo.availability.message}
                onChange={(e) => updateAvailability('message', e.target.value)}
                placeholder="Brief message about your current availability..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Contact Information Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-600" />
                <span>{contactInfo.email || 'No email provided'}</span>
              </div>
              
              {contactInfo.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-600" />
                  <span>{contactInfo.phone}</span>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span>{contactInfo.location || 'No location provided'}</span>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={getAvailabilityColor(contactInfo.availability.status)}>
                  {getAvailabilityIcon(contactInfo.availability.status)} {contactInfo.availability.status}
                </Badge>
              </div>
              
              {contactInfo.availability.message && (
                <p className="text-sm text-gray-600 italic">
                  "{contactInfo.availability.message}"
                </p>
              )}
              
              <div className="flex flex-wrap gap-2 pt-2">
                {contactInfo.social_links.github && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Github className="h-3 w-3" />
                    GitHub
                  </Badge>
                )}
                {contactInfo.social_links.linkedin && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Linkedin className="h-3 w-3" />
                    LinkedIn
                  </Badge>
                )}
                {contactInfo.social_links.twitter && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Twitter className="h-3 w-3" />
                    Twitter
                  </Badge>
                )}
                {contactInfo.social_links.website && (
                  <Badge variant="outline" className="flex items-center gap-1">
                    <Globe className="h-3 w-3" />
                    Website
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" disabled={saving}>
            {saving ? 'Saving...' : 'Update Contact Information'}
          </Button>
        </div>
      </form>
    </div>
  )
}