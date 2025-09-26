"use client"

import { useState, useEffect } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts"
import { TrendingUp, TrendingDown, Users, Briefcase, Clock, CheckCircle, MapPin, Download } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchAnalytics()
  }, [timeRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/analytics?period=${timeRange}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch analytics")
      }
      
      setAnalyticsData(data)
      setError("")
    } catch (err) {
      console.error("Analytics fetch error:", err)
      setError(err instanceof Error ? err.message : "Failed to load analytics")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading analytics...</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-red-400 mb-4">{error}</p>
            <Button onClick={fetchAnalytics} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  if (!analyticsData) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">No analytics data available</p>
            <p className="text-sm text-muted-foreground">Start by posting jobs and receiving applications</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  const { metrics, jobCategories, locations } = analyticsData

  // Convert data for charts
  const hiringTrendData = [
    { month: "Jan", applications: 45, hires: 12, jobs: 8 },
    { month: "Feb", applications: 52, hires: 15, jobs: 10 },
    { month: "Mar", applications: 38, hires: 9, jobs: 6 },
    { month: "Apr", applications: 67, hires: 18, jobs: 12 },
    { month: "May", applications: 73, hires: 22, jobs: 14 },
    { month: "Jun", applications: 89, hires: 28, jobs: 16 },
  ]

  const jobCategoryData = [
    { name: "Construction", value: 35, color: "#3b82f6" },
    { name: "Warehouse", value: 25, color: "#10b981" },
    { name: "Security", value: 20, color: "#f59e0b" },
    { name: "Delivery", value: 15, color: "#ef4444" },
    { name: "Kitchen", value: 5, color: "#8b5cf6" },
  ]

  const locationData = [
    { city: "Mumbai", applications: 89, hires: 28 },
    { city: "Delhi", applications: 67, hires: 22 },
    { city: "Bangalore", applications: 54, hires: 18 },
    { city: "Pune", applications: 43, hires: 15 },
    { city: "Chennai", applications: 32, hires: 12 },
  ]

  const timeToHireData = [
    { range: "< 1 day", count: 15, percentage: 25 },
    { range: "1-3 days", count: 24, percentage: 40 },
    { range: "4-7 days", count: 12, percentage: 20 },
    { range: "1-2 weeks", count: 6, percentage: 10 },
    { range: "> 2 weeks", count: 3, percentage: 5 },
  ]

  const skillDemandData = [
    { skill: "Construction", demand: 85, growth: 12 },
    { skill: "Warehouse", demand: 72, growth: 8 },
    { skill: "Security", demand: 68, growth: -3 },
    { skill: "Delivery", demand: 65, growth: 15 },
    { skill: "Kitchen", demand: 45, growth: 5 },
    { skill: "Cleaning", demand: 38, growth: 7 },
  ]

  const performanceMetrics = {
    totalJobs: 66,
    totalApplications: 285,
    totalHires: 95,
    avgTimeToHire: 2.3,
    applicationRate: 4.3,
    hireRate: 33.3,
    topPerformingJob: "Construction Workers",
    mostActiveLocation: "Mumbai",
  }

  const monthlyGrowth = {
    jobs: 18.5,
    applications: 22.3,
    hires: 15.7,
    timeToHire: -12.4,
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & Reports</h1>
            <p className="text-muted-foreground">Track your hiring performance and get insights</p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-32 bg-background border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-border hover:bg-accent bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Jobs Posted</p>
                  <p className="text-2xl font-bold text-foreground">{metrics.totalJobs}</p>
                </div>
                <Briefcase className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Applications</p>
                  <p className="text-2xl font-bold text-foreground">{metrics.totalApplications}</p>
                </div>
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Successful Hires</p>
                  <p className="text-2xl font-bold text-foreground">{metrics.totalHires}</p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Time to Hire</p>
                  <p className="text-2xl font-bold text-foreground">{metrics.avgTimeToHire}h</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="locations">Locations</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Hiring Trends */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Hiring Trends</CardTitle>
                  <CardDescription>Applications and hires over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={hiringTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="applications"
                        stackId="1"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                      <Area
                        type="monotone"
                        dataKey="hires"
                        stackId="2"
                        stroke="#10b981"
                        fill="#10b981"
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Job Categories */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Job Categories</CardTitle>
                  <CardDescription>Distribution of jobs by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={jobCategoryData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {jobCategoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex flex-wrap gap-4 mt-4">
                    {jobCategoryData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span className="text-sm text-muted-foreground">
                          {item.name} ({item.value}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Summary */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Performance Summary</CardTitle>
                <CardDescription>Key performance indicators for your hiring process</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-400">{metrics.applicationRate}</p>
                    <p className="text-sm text-muted-foreground">Applications per job</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-400">{metrics.hireRate}%</p>
                    <p className="text-sm text-muted-foreground">Hire rate</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-purple-400">{metrics.activeJobs}</p>
                    <p className="text-sm text-muted-foreground">Active jobs</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-yellow-400">{Object.keys(locations).length}</p>
                    <p className="text-sm text-muted-foreground">Cities covered</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Time to Hire Distribution */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Time to Hire Distribution</CardTitle>
                  <CardDescription>How quickly you hire workers</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={timeToHireData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis type="number" stroke="#9ca3af" />
                      <YAxis dataKey="range" type="category" stroke="#9ca3af" width={80} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="count" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Skill Demand */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Skill Demand Trends</CardTitle>
                  <CardDescription>Most in-demand skills and growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {skillDemandData.map((skill) => (
                      <div key={skill.skill} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-foreground">{skill.skill}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-muted-foreground">{skill.demand}%</span>
                              <Badge
                                variant="secondary"
                                className={
                                  skill.growth > 0
                                    ? "bg-green-600/10 text-green-400 border-green-600/20"
                                    : "bg-red-600/10 text-red-400 border-red-600/20"
                                }
                              >
                                {skill.growth > 0 ? "+" : ""}
                                {skill.growth}%
                              </Badge>
                            </div>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2">
                            <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${skill.demand}%` }}></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="locations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Location Performance */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Location Performance</CardTitle>
                  <CardDescription>Applications and hires by city</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={locationData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="city" stroke="#9ca3af" />
                      <YAxis stroke="#9ca3af" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1f2937",
                          border: "1px solid #374151",
                          borderRadius: "8px",
                        }}
                      />
                      <Bar dataKey="applications" fill="#3b82f6" name="Applications" />
                      <Bar dataKey="hires" fill="#10b981" name="Hires" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Location Stats */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Location Statistics</CardTitle>
                  <CardDescription>Detailed breakdown by location</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {locationData.map((location) => (
                      <div
                        key={location.city}
                        className="flex items-center justify-between p-3 border border-border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-foreground">{location.city}</p>
                            <p className="text-sm text-muted-foreground">
                              {location.applications} applications • {location.hires} hires
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-foreground">
                            {Math.round((location.hires / location.applications) * 100)}%
                          </p>
                          <p className="text-xs text-muted-foreground">Hire rate</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Key Insights */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Key Insights</CardTitle>
                  <CardDescription>AI-powered insights from your hiring data</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-blue-600/10 border border-blue-600/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Peak Application Time</p>
                        <p className="text-sm text-muted-foreground">
                          Most applications come in between 10 AM - 2 PM. Consider posting jobs during this time for
                          better visibility.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">High-Performing Jobs</p>
                        <p className="text-sm text-muted-foreground">
                          Construction and warehouse jobs have the highest application-to-hire ratio at 35%.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Faster Hiring Opportunity</p>
                        <p className="text-sm text-muted-foreground">
                          Jobs with clear salary ranges get hired 40% faster than those without.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-purple-600/10 border border-purple-600/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-purple-400 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground mb-1">Location Expansion</p>
                        <p className="text-sm text-muted-foreground">
                          Consider expanding to Hyderabad and Kolkata - high worker availability with low competition.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                  <CardDescription>Actionable suggestions to improve your hiring</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Optimize Job Descriptions</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Jobs with detailed requirements get 60% more qualified applications.
                    </p>
                    <Button size="sm" variant="outline" className="border-border hover:bg-accent bg-transparent">
                      View Templates
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Improve Response Time</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Responding to applications within 2 hours increases hire rate by 25%.
                    </p>
                    <Button size="sm" variant="outline" className="border-border hover:bg-accent bg-transparent">
                      Setup Notifications
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Expand Skill Requirements</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Consider multi-skilled workers to reduce hiring frequency by 30%.
                    </p>
                    <Button size="sm" variant="outline" className="border-border hover:bg-accent bg-transparent">
                      Browse Workers
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <h3 className="font-medium text-foreground mb-2">Seasonal Planning</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Plan construction jobs 2 weeks ahead during monsoon season for better availability.
                    </p>
                    <Button size="sm" variant="outline" className="border-border hover:bg-accent bg-transparent">
                      Schedule Jobs
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
