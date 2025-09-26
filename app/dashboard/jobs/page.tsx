"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Plus,
  Search,
  Filter,
  MapPin,
  Users,
  Calendar,
  Clock,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Upload,
  Briefcase,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function JobsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const jobs = [
    {
      id: 1,
      title: "Construction Workers",
      location: "Mumbai, Maharashtra",
      applicants: 23,
      status: "active",
      postedDate: "2024-01-15",
      salary: "₹500-700/day",
      workType: "Full-time",
      urgency: "high",
      description: "Need experienced construction workers for residential project",
    },
    {
      id: 2,
      title: "Warehouse Staff",
      location: "Pune, Maharashtra",
      applicants: 15,
      status: "active",
      postedDate: "2024-01-16",
      salary: "₹18,000-22,000/month",
      workType: "Full-time",
      urgency: "medium",
      description: "Looking for warehouse staff for inventory management",
    },
    {
      id: 3,
      title: "Security Guards",
      location: "Delhi, NCR",
      applicants: 31,
      status: "closed",
      postedDate: "2024-01-10",
      salary: "₹15,000-18,000/month",
      workType: "Shift",
      urgency: "low",
      description: "Night shift security guards for office complex",
    },
    {
      id: 4,
      title: "Delivery Drivers",
      location: "Bangalore, Karnataka",
      applicants: 42,
      status: "active",
      postedDate: "2024-01-14",
      salary: "₹400-600/day",
      workType: "Part-time",
      urgency: "medium",
      description: "Delivery drivers with own vehicle preferred",
    },
    {
      id: 5,
      title: "Kitchen Staff",
      location: "Chennai, Tamil Nadu",
      applicants: 8,
      status: "draft",
      postedDate: "2024-01-17",
      salary: "₹12,000-15,000/month",
      workType: "Full-time",
      urgency: "low",
      description: "Kitchen helpers for restaurant chain",
    },
  ]

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || job.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600/10 text-green-400 border-green-600/20"
      case "closed":
        return "bg-gray-600/10 text-gray-400 border-gray-600/20"
      case "draft":
        return "bg-yellow-600/10 text-yellow-400 border-yellow-600/20"
      default:
        return "bg-gray-600/10 text-gray-400 border-gray-600/20"
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "bg-red-600/10 text-red-400 border-red-600/20"
      case "medium":
        return "bg-yellow-600/10 text-yellow-400 border-yellow-600/20"
      case "low":
        return "bg-blue-600/10 text-blue-400 border-blue-600/20"
      default:
        return "bg-gray-600/10 text-gray-400 border-gray-600/20"
    }
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Job Management</h1>
            <p className="text-muted-foreground">Create, manage, and track all your hiring needs</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/jobs/bulk">
              <Button variant="outline" className="border-border hover:bg-accent bg-transparent">
                <Upload className="w-4 h-4 mr-2" />
                Bulk Upload
              </Button>
            </Link>
            <Link href="/dashboard/jobs/new">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Post New Job
              </Button>
            </Link>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search jobs by title or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-background border-border">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-border hover:bg-accent bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Jobs Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-96">
            <TabsTrigger value="all">All ({jobs.length})</TabsTrigger>
            <TabsTrigger value="active">Active ({jobs.filter((j) => j.status === "active").length})</TabsTrigger>
            <TabsTrigger value="closed">Closed ({jobs.filter((j) => j.status === "closed").length})</TabsTrigger>
            <TabsTrigger value="draft">Draft ({jobs.filter((j) => j.status === "draft").length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredJobs.map((job) => (
              <Card key={job.id} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                        <Badge variant="secondary" className={getStatusColor(job.status)}>
                          {job.status}
                        </Badge>
                        {job.urgency === "high" && (
                          <Badge variant="secondary" className={getUrgencyColor(job.urgency)}>
                            Urgent
                          </Badge>
                        )}
                      </div>

                      <p className="text-muted-foreground mb-3">{job.description}</p>

                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="w-4 h-4" />
                          {job.applicants} applicants
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          {new Date(job.postedDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          {job.workType}
                        </div>
                      </div>

                      <div className="mt-3">
                        <span className="text-sm font-medium text-foreground">Salary: </span>
                        <span className="text-sm text-blue-400">{job.salary}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/jobs/${job.id}`}>
                        <Button variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
                          <Eye className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </Link>
                      <Link href={`/dashboard/jobs/${job.id}/edit`}>
                        <Button variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-border hover:bg-accent bg-transparent text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            {filteredJobs
              .filter((job) => job.status === "active")
              .map((job) => (
                <Card key={job.id} className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                          <Badge variant="secondary" className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                          {job.urgency === "high" && (
                            <Badge variant="secondary" className={getUrgencyColor(job.urgency)}>
                              Urgent
                            </Badge>
                          )}
                        </div>

                        <p className="text-muted-foreground mb-3">{job.description}</p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {job.applicants} applicants
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {job.workType}
                          </div>
                        </div>

                        <div className="mt-3">
                          <span className="text-sm font-medium text-foreground">Salary: </span>
                          <span className="text-sm text-blue-400">{job.salary}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/jobs/${job.id}`}>
                          <Button variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </Link>
                        <Link href={`/dashboard/jobs/${job.id}/edit`}>
                          <Button variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-border hover:bg-accent bg-transparent text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="closed" className="space-y-4">
            {filteredJobs
              .filter((job) => job.status === "closed")
              .map((job) => (
                <Card key={job.id} className="bg-card border-border opacity-75">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                          <Badge variant="secondary" className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground mb-3">{job.description}</p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Users className="w-4 h-4" />
                            {job.applicants} applicants
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {job.workType}
                          </div>
                        </div>

                        <div className="mt-3">
                          <span className="text-sm font-medium text-foreground">Salary: </span>
                          <span className="text-sm text-blue-400">{job.salary}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/jobs/${job.id}`}>
                          <Button variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
                          Repost
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="draft" className="space-y-4">
            {filteredJobs
              .filter((job) => job.status === "draft")
              .map((job) => (
                <Card key={job.id} className="bg-card border-border border-dashed">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{job.title}</h3>
                          <Badge variant="secondary" className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>

                        <p className="text-muted-foreground mb-3">{job.description}</p>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {job.location}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="w-4 h-4" />
                            {new Date(job.postedDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {job.workType}
                          </div>
                        </div>

                        <div className="mt-3">
                          <span className="text-sm font-medium text-foreground">Salary: </span>
                          <span className="text-sm text-blue-400">{job.salary}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Link href={`/dashboard/jobs/${job.id}/edit`}>
                          <Button variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
                            <Edit className="w-4 h-4 mr-2" />
                            Continue Editing
                          </Button>
                        </Link>
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Publish</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>

        {filteredJobs.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "Get started by posting your first job"}
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <Link href="/dashboard/jobs/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Post Your First Job
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
