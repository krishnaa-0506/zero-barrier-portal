"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Plus,
  Users,
  Briefcase,
  Clock,
  CheckCircle,
  TrendingUp,
  MapPin,
  Calendar,
  Eye,
  Edit,
  MoreHorizontal,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

interface DashboardStats {
  jobs: {
    totalJobs: number
    activeJobs: number
    totalViews: number
    totalApplications: number
    totalHires: number
  }
  applications: Record<string, number>
}

interface Job {
  _id: string
  title: string
  category: string
  location: {
    address?: {
      city: string
      state: string
    }
  }
  status: string
  createdAt: string
  stats: {
    applications: number
    views: number
  }
  urgency: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [jobs, setJobs] = useState<Job[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true)
      setError("")

      const [analyticsResponse, jobsResponse] = await Promise.all([fetch("/api/analytics"), fetch("/api/jobs?limit=5")])

      if (!analyticsResponse.ok || !jobsResponse.ok) {
        throw new Error("Failed to fetch dashboard data")
      }

      const analyticsData = await analyticsResponse.json()
      const jobsData = await jobsResponse.json()

      console.log("[v0] Dashboard data loaded:", { analytics: analyticsData, jobs: jobsData })

      setStats(analyticsData)
      setJobs(jobsData.jobs || [])
    } catch (err) {
      console.error("[v0] Dashboard fetch error:", err)
      setError(err instanceof Error ? err.message : "Failed to load dashboard data")
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    return date.toLocaleDateString()
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "urgent":
        return "bg-red-600/10 text-red-400 border-red-600/20"
      case "high":
        return "bg-orange-600/10 text-orange-400 border-orange-600/20"
      case "medium":
        return "bg-yellow-600/10 text-yellow-400 border-yellow-600/20"
      default:
        return "bg-green-600/10 text-green-400 border-green-600/20"
    }
  }

  if (error) {
    return (
      <DashboardLayout>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back! Here's what's happening with your hiring.</p>
          </div>
          <Link href="/dashboard/jobs/new">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Post New Job
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Jobs</CardTitle>
              <Briefcase className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-foreground">{stats?.jobs.activeJobs || 0}</div>
                  <p className="text-xs text-green-400">
                    {stats?.jobs.totalJobs ? `${stats.jobs.totalJobs} total` : "No jobs yet"}
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Applications</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-foreground">{stats?.jobs.totalApplications || 0}</div>
                  <p className="text-xs text-green-400">
                    {Object.values(stats?.applications || {}).reduce((a, b) => a + b, 0)} total responses
                  </p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Hires Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-foreground">{stats?.jobs.totalHires || 0}</div>
                  <p className="text-xs text-green-400">{stats?.applications?.hired || 0} hired this month</p>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
              <Clock className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <>
                  <div className="text-2xl font-bold text-foreground">{stats?.jobs.totalViews || 0}</div>
                  <p className="text-xs text-green-400">Job post impressions</p>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-foreground">Recent Jobs</CardTitle>
                    <CardDescription>Your latest job postings and their status</CardDescription>
                  </div>
                  <Link href="/dashboard/jobs">
                    <Button variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 border border-border rounded-lg">
                        <Skeleton className="h-6 w-48 mb-2" />
                        <div className="flex gap-4">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : jobs.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">No jobs posted yet</p>
                    <Link href="/dashboard/jobs/new">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <Plus className="w-4 h-4 mr-2" />
                        Post Your First Job
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs.map((job) => (
                      <div
                        key={job._id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-foreground">{job.title}</h3>
                            <Badge
                              variant={job.status === "active" ? "default" : "secondary"}
                              className={
                                job.status === "active" ? "bg-green-600/10 text-green-400 border-green-600/20" : ""
                              }
                            >
                              {job.status}
                            </Badge>
                            {job.urgency && job.urgency !== "low" && (
                              <Badge variant="secondary" className={getUrgencyColor(job.urgency)}>
                                {job.urgency}
                              </Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {job.location.address
                                ? `${job.location.address.city}, ${job.location.address.state}`
                                : "Location TBD"}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {job.stats.applications} applicants
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(job.createdAt)}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Link href={`/dashboard/jobs/${job._id}`}>
                            <Button variant="ghost" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/dashboard/jobs/${job._id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions & Activity */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Quick Actions</CardTitle>
                <CardDescription>Common tasks to get things done faster</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/dashboard/jobs/new">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-accent bg-transparent"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post New Job
                  </Button>
                </Link>
                <Link href="/dashboard/jobs/bulk">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-accent bg-transparent"
                  >
                    <Briefcase className="w-4 h-4 mr-2" />
                    Bulk Upload Jobs
                  </Button>
                </Link>
                <Link href="/dashboard/workers">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-accent bg-transparent"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Browse Workers
                  </Button>
                </Link>
                <Link href="/dashboard/analytics">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-border hover:bg-accent bg-transparent"
                  >
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Recent Activity</CardTitle>
                <CardDescription>Latest updates on your jobs</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-start gap-3">
                        <Skeleton className="w-2 h-2 rounded-full mt-2" />
                        <div className="flex-1">
                          <Skeleton className="h-4 w-full mb-1" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {jobs.slice(0, 4).map((job, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1">
                          <p className="text-sm text-foreground">
                            {job.stats.applications > 0
                              ? `${job.stats.applications} applications received for ${job.title}`
                              : `Posted new job: ${job.title}`}
                          </p>
                          <p className="text-xs text-muted-foreground">{formatDate(job.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                    {jobs.length === 0 && (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No recent activity. Post your first job to get started!
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Hiring Progress */}
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground">This Month's Hiring Progress</CardTitle>
            <CardDescription>Track your hiring goals and achievements</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    <Skeleton className="h-2 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Jobs Posted</span>
                    <span className="text-sm text-muted-foreground">{stats?.jobs.totalJobs || 0}/10</span>
                  </div>
                  <Progress value={Math.min(((stats?.jobs.totalJobs || 0) / 10) * 100, 100)} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Workers Hired</span>
                    <span className="text-sm text-muted-foreground">{stats?.jobs.totalHires || 0}/50</span>
                  </div>
                  <Progress value={Math.min(((stats?.jobs.totalHires || 0) / 50) * 100, 100)} className="h-2" />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-foreground">Response Rate</span>
                    <span className="text-sm text-muted-foreground">
                      {stats?.jobs.totalViews && stats?.jobs.totalApplications
                        ? Math.round((stats.jobs.totalApplications / stats.jobs.totalViews) * 100)
                        : 0}
                      %
                    </span>
                  </div>
                  <Progress
                    value={
                      stats?.jobs.totalViews && stats?.jobs.totalApplications
                        ? Math.min((stats.jobs.totalApplications / stats.jobs.totalViews) * 100, 100)
                        : 0
                    }
                    className="h-2"
                  />
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
