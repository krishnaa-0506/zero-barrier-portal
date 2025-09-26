"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Search,
  Filter,
  MapPin,
  Star,
  Clock,
  CheckCircle,
  Eye,
  MessageCircle,
  Phone,
  Award,
  Users,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

// Interfaces with proper status type
interface Job {
  id: string
  title: string
}

interface Applicant {
  id: string
  name: string
  avatar: string
  jobTitle: string
  jobId: string
  location: string
  distance: string
  experience: string
  rating: number
  skillMatch: number
  appliedDate: string
  status: 'new' | 'reviewed' | 'shortlisted' | 'hired' | 'rejected'
  phone: string
  email: string
  skills: string[]
  previousJobs: number
  verified: boolean
  languages: string[]
}

const stats = [
  {
    title: "New Applications",
    color: "blue",
    icon: Users,
    getValue: (applicants: Applicant[]) => applicants.filter(a => a.status === 'new').length
  },
  {
    title: "Shortlisted",
    color: "green",
    icon: CheckCircle,
    getValue: (applicants: Applicant[]) => applicants.filter(a => a.status === 'shortlisted').length
  },
  {
    title: "Hired",
    color: "purple",
    icon: Award,
    getValue: (applicants: Applicant[]) => applicants.filter(a => a.status === 'hired').length
  },
  {
    title: "Avg. Match",
    color: "yellow",
    icon: Briefcase,
    getValue: (applicants: Applicant[]) => {
      const total = applicants.reduce((acc, a) => acc + a.skillMatch, 0)
      return Math.round(total / (applicants.length || 1))
    },
    isPercentage: true
  }
]

export default function ApplicantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [jobFilter, setJobFilter] = useState("all")
  const [skillFilter, setSkillFilter] = useState("all")
  const [loading, setLoading] = useState(true)
  const [jobs, setJobs] = useState<Job[]>([])
  const [applicants, setApplicants] = useState<Applicant[]>([])

  const fetchApplicants = useCallback(async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/applications')
      if (!response.ok) throw new Error('Failed to fetch applicants')
      const data = await response.json()
      setApplicants(data.applications || [])
    } catch (error) {
      console.error('Error fetching applicants:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const fetchJobs = useCallback(async () => {
    try {
      const response = await fetch('/api/jobs')
      if (!response.ok) throw new Error('Failed to fetch jobs')
      const data = await response.json()
      setJobs(data.jobs || [])
    } catch (error) {
      console.error('Error fetching jobs:', error)
    }
  }, [])

  useEffect(() => {
    fetchApplicants()
    fetchJobs()
  }, [fetchApplicants, fetchJobs])

  const handleStatusUpdate = async (applicantId: string, newStatus: Applicant['status']) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/applications`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ applicationId: applicantId, status: newStatus })
      })
      
      if (!response.ok) throw new Error('Failed to update status')
      
      // Refresh the applicants list
      await fetchApplicants()
    } catch (error) {
      console.error('Error updating status:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredApplicants = applicants.filter((applicant) => {
    const matchesSearch =
      applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      applicant.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesJob = jobFilter === "all" || applicant.jobId === jobFilter
    return matchesSearch && matchesJob
  })

  const getStatusColor = (status: Applicant['status']) => {
    switch (status) {
      case "new":
        return "bg-blue-600/10 text-blue-400 border-blue-600/20"
      case "reviewed":
        return "bg-yellow-600/10 text-yellow-400 border-yellow-600/20"
      case "shortlisted":
        return "bg-green-600/10 text-green-400 border-green-600/20"
      case "hired":
        return "bg-purple-600/10 text-purple-400 border-purple-600/20"
      case "rejected":
        return "bg-red-600/10 text-red-400 border-red-600/20"
      default:
        return "bg-gray-600/10 text-gray-400 border-gray-600/20"
    }
  }

  const getSkillMatchColor = (match: number) => {
    if (match >= 90) return "text-green-400"
    if (match >= 75) return "text-yellow-400"
    return "text-red-400"
  }

  return (
    <DashboardLayout>
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header with floating animation */}
        <motion.div 
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <div>
            <h1 className="text-3xl font-bold text-foreground">Applicant Management</h1>
            <p className="text-muted-foreground">Review and manage job applications from verified workers</p>
          </div>
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button variant="outline" className="border-border hover:bg-accent bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </motion.div>
        </motion.div>

        {/* Stats Cards with animations */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                        <p className="text-2xl font-bold text-foreground">
                          {stat.getValue(applicants)}{stat.isPercentage ? "%" : ""}
                        </p>
                      </div>
                      <stat.icon className={`h-8 w-8 text-${stat.color}-400`} />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Search and Filters with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search applicants by name, job, or location..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background border-border"
                  />
                </div>
                <Select value={jobFilter} onValueChange={setJobFilter}>
                  <SelectTrigger className="w-full sm:w-48 bg-background border-border">
                    <SelectValue placeholder="Filter by job" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Jobs</SelectItem>
                    {jobs.map((job) => (
                      <SelectItem key={job.id} value={job.id}>
                        {job.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Applicant list with AnimatePresence */}
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {[1, 2, 3].map((i) => (
                <Card key={i} className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="animate-pulse space-y-4">
                      <div className="h-12 bg-muted rounded-md" />
                      <div className="h-20 bg-muted rounded-md" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-4"
            >
              {filteredApplicants.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <Card className="bg-card border-border">
                    <CardContent className="pt-6">
                      <div className="text-center py-12">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", damping: 20, delay: 0.2 }}
                        >
                          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-foreground mb-2">No applicants found</h3>
                        <p className="text-muted-foreground mb-4">
                          {searchQuery || jobFilter !== "all"
                            ? "Try adjusting your search or filters"
                            : "Applications will appear here once workers apply to your jobs"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ) : (
                filteredApplicants.map((applicant, index) => (
                  <motion.div
                    key={applicant.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    layout
                  >
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card className="bg-card border-border hover:border-primary/50 transition-colors">
                        <CardContent className="pt-6">
                          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                            <div className="flex items-start gap-4 flex-1">
                              <motion.div whileHover={{ scale: 1.1 }}>
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={applicant.avatar} alt={applicant.name} />
                                  <AvatarFallback>
                                    {applicant.name
                                      .split(" ")
                                      .map((n) => n[0])
                                      .join("")}
                                  </AvatarFallback>
                                </Avatar>
                              </motion.div>

                              <div className="flex-1">
                                <motion.div 
                                  className="flex items-center gap-3 mb-2"
                                  layout
                                >
                                  <h3 className="text-lg font-semibold text-foreground">{applicant.name}</h3>
                                  {applicant.verified && (
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: "spring", damping: 20 }}
                                    >
                                      <Badge variant="secondary" className="bg-green-600/10 text-green-400 border-green-600/20">
                                        <CheckCircle className="w-3 h-3 mr-1" />
                                        Verified
                                      </Badge>
                                    </motion.div>
                                  )}
                                  <Badge variant="secondary" className={getStatusColor(applicant.status)}>
                                    {applicant.status}
                                  </Badge>
                                </motion.div>

                                <p className="text-sm text-muted-foreground mb-3">
                                  Applied for: {applicant.jobTitle}
                                </p>

                                <motion.div
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.2 }}
                                  className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm"
                                >
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="w-4 h-4" />
                                    {applicant.location}
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    {applicant.experience}
                                  </div>
                                  <div className="flex items-center gap-2 text-muted-foreground">
                                    <Star className="w-4 h-4 text-yellow-400" />
                                    {applicant.rating} rating
                                  </div>
                                  <div className="text-muted-foreground">{applicant.distance}</div>
                                </motion.div>

                                <motion.div 
                                  className="mt-3"
                                  initial={{ opacity: 0, scaleX: 0 }}
                                  animate={{ opacity: 1, scaleX: 1 }}
                                  transition={{ delay: 0.3 }}
                                >
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-sm font-medium text-foreground">Skill Match</span>
                                    <span className={`text-sm font-medium ${getSkillMatchColor(applicant.skillMatch)}`}>
                                      {applicant.skillMatch}%
                                    </span>
                                  </div>
                                  <Progress value={applicant.skillMatch} className="h-2" />
                                </motion.div>

                                <motion.div 
                                  className="mt-3 flex flex-wrap gap-2"
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  transition={{ delay: 0.4 }}
                                >
                                  {applicant.skills.slice(0, 3).map((skill, i) => (
                                    <motion.div
                                      key={skill}
                                      initial={{ opacity: 0, scale: 0 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      transition={{ delay: 0.5 + (i * 0.1) }}
                                    >
                                      <Badge variant="outline" className="text-xs border-border">
                                        {skill}
                                      </Badge>
                                    </motion.div>
                                  ))}
                                </motion.div>
                              </div>
                            </div>

                            <motion.div 
                              className="flex flex-col gap-2 min-w-[200px]"
                              initial={{ opacity: 0, x: 20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 }}
                            >
                              <Link href={`/dashboard/applicants/${applicant.id}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-border hover:bg-accent bg-transparent"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Profile
                                </Button>
                              </Link>

                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 border-border hover:bg-accent bg-transparent"
                                >
                                  <MessageCircle className="w-4 h-4 mr-2" />
                                  Message
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 border-border hover:bg-accent bg-transparent"
                                >
                                  <Phone className="w-4 h-4 mr-2" />
                                  Call
                                </Button>
                              </div>

                              {applicant.status === "new" && (
                                <div className="flex gap-2">
                                  <Button 
                                    size="sm" 
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                                    onClick={() => handleStatusUpdate(applicant.id, 'shortlisted')}
                                  >
                                    Shortlist
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 border-red-600/20 text-red-400 hover:bg-red-600/10 bg-transparent"
                                    onClick={() => handleStatusUpdate(applicant.id, 'rejected')}
                                  >
                                    Reject
                                  </Button>
                                </div>
                              )}

                              {applicant.status === "shortlisted" && (
                                <Button 
                                  size="sm" 
                                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                                  onClick={() => handleStatusUpdate(applicant.id, 'hired')}
                                >
                                  Hire Now
                                </Button>
                              )}

                              {applicant.status === "hired" && (
                                <Badge
                                  variant="secondary"
                                  className="bg-purple-600/10 text-purple-400 border-purple-600/20 justify-center"
                                >
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Hired
                                </Badge>
                              )}
                            </motion.div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </motion.div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </DashboardLayout>
  )
}