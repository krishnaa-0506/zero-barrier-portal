"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Star,
  Clock,
  CheckCircle,
  MessageCircle,
  Phone,
  Sparkles,
  Filter,
  Users,
  Zap,
} from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function WorkersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [skillFilter, setSkillFilter] = useState("all")
  const [locationFilter, setLocationFilter] = useState("all")
  const [availabilityFilter, setAvailabilityFilter] = useState("all")

  const workers = [
    {
      id: 1,
      name: "Rajesh Kumar",
      avatar: "/indian-male-worker.jpg",
      skills: ["Masonry", "Plumbing", "Electrical"],
      location: "Mumbai, Maharashtra",
      distance: "2.5 km",
      experience: "5 years",
      rating: 4.8,
      availability: "available",
      lastActive: "2 hours ago",
      completedJobs: 12,
      verified: true,
      hourlyRate: "₹50-70/hour",
      languages: ["Hindi", "English", "Marathi"],
      aiMatch: 95,
    },
    {
      id: 2,
      name: "Priya Sharma",
      avatar: "/indian-female-worker.jpg",
      skills: ["Inventory Management", "Forklift Operation", "Quality Control"],
      location: "Pune, Maharashtra",
      distance: "1.2 km",
      experience: "3 years",
      rating: 4.6,
      availability: "available",
      lastActive: "1 hour ago",
      completedJobs: 8,
      verified: true,
      hourlyRate: "₹40-60/hour",
      languages: ["Hindi", "English"],
      aiMatch: 88,
    },
    {
      id: 3,
      name: "Mohammed Ali",
      avatar: "/indian-male-security-guard.jpg",
      skills: ["Security Operations", "CCTV Monitoring", "Emergency Response"],
      location: "Delhi, NCR",
      distance: "5.8 km",
      experience: "7 years",
      rating: 4.9,
      availability: "busy",
      lastActive: "30 minutes ago",
      completedJobs: 15,
      verified: true,
      hourlyRate: "₹35-50/hour",
      languages: ["Hindi", "English", "Urdu"],
      aiMatch: 92,
    },
    {
      id: 4,
      name: "Sunita Devi",
      avatar: "/indian-female-kitchen-staff.jpg",
      skills: ["Food Preparation", "Kitchen Hygiene", "Team Coordination"],
      location: "Chennai, Tamil Nadu",
      distance: "3.1 km",
      experience: "4 years",
      rating: 4.7,
      availability: "available",
      lastActive: "15 minutes ago",
      completedJobs: 6,
      verified: true,
      hourlyRate: "₹30-45/hour",
      languages: ["Tamil", "Hindi", "English"],
      aiMatch: 85,
    },
    {
      id: 5,
      name: "Amit Patel",
      avatar: "/indian-male-delivery-driver.jpg",
      skills: ["Driving", "Navigation", "Customer Service"],
      location: "Bangalore, Karnataka",
      distance: "4.2 km",
      experience: "2 years",
      rating: 4.4,
      availability: "available",
      lastActive: "5 minutes ago",
      completedJobs: 4,
      verified: true,
      hourlyRate: "₹25-40/hour",
      languages: ["Gujarati", "Hindi", "English"],
      aiMatch: 78,
    },
  ]

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.skills.some((skill) => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
      worker.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesAvailability = availabilityFilter === "all" || worker.availability === availabilityFilter
    return matchesSearch && matchesAvailability
  })

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-600/10 text-green-400 border-green-600/20"
      case "busy":
        return "bg-red-600/10 text-red-400 border-red-600/20"
      case "offline":
        return "bg-gray-600/10 text-gray-400 border-gray-600/20"
      default:
        return "bg-gray-600/10 text-gray-400 border-gray-600/20"
    }
  }

  const getAIMatchColor = (match: number) => {
    if (match >= 90) return "text-green-400"
    if (match >= 75) return "text-yellow-400"
    return "text-red-400"
  }

  const availableWorkers = workers.filter((w) => w.availability === "available").length
  const totalWorkers = workers.length
  const avgRating = (workers.reduce((acc, w) => acc + w.rating, 0) / workers.length).toFixed(1)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Worker Availability</h1>
            <p className="text-muted-foreground">Browse and connect with verified workers in real-time</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="border-border hover:bg-accent bg-transparent">
              <Sparkles className="w-4 h-4 mr-2" />
              AI Shortlist
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <MessageCircle className="w-4 h-4 mr-2" />
              Bulk Message
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Now</p>
                  <p className="text-2xl font-bold text-green-400">{availableWorkers}</p>
                </div>
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Workers</p>
                  <p className="text-2xl font-bold text-foreground">{totalWorkers}</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg. Rating</p>
                  <p className="text-2xl font-bold text-foreground">{avgRating}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Response Rate</p>
                  <p className="text-2xl font-bold text-foreground">94%</p>
                </div>
                <Zap className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search workers by name, skills, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-border"
                />
              </div>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-background border-border">
                  <SelectValue placeholder="Availability" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Workers</SelectItem>
                  <SelectItem value="available">Available Now</SelectItem>
                  <SelectItem value="busy">Currently Busy</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
              <Select value={skillFilter} onValueChange={setSkillFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-background border-border">
                  <SelectValue placeholder="Skills" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Skills</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="warehouse">Warehouse</SelectItem>
                  <SelectItem value="security">Security</SelectItem>
                  <SelectItem value="delivery">Delivery</SelectItem>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-border hover:bg-accent bg-transparent">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* AI Shortlisting Assistant */}
        <Card className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border-blue-600/20">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Sparkles className="w-6 h-6 text-blue-400" />
              <div>
                <CardTitle className="text-foreground">AI Shortlisting Assistant</CardTitle>
                <CardDescription>Let AI find the best workers for your specific needs</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Describe what you're looking for... e.g., 'experienced mason for residential project'"
                className="flex-1 bg-background border-border"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Sparkles className="w-4 h-4 mr-2" />
                Find Workers
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Workers List */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
            <TabsTrigger value="all">All Workers ({totalWorkers})</TabsTrigger>
            <TabsTrigger value="available">Available ({availableWorkers})</TabsTrigger>
            <TabsTrigger value="recommended">AI Recommended</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredWorkers.map((worker) => (
              <Card key={worker.id} className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="relative">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={worker.avatar || "/placeholder.svg"} alt={worker.name} />
                          <AvatarFallback>
                            {worker.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div
                          className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                            worker.availability === "available"
                              ? "bg-green-400"
                              : worker.availability === "busy"
                                ? "bg-red-400"
                                : "bg-gray-400"
                          }`}
                        ></div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">{worker.name}</h3>
                          {worker.verified && (
                            <Badge variant="secondary" className="bg-green-600/10 text-green-400 border-green-600/20">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                          <Badge variant="secondary" className={getAvailabilityColor(worker.availability)}>
                            {worker.availability}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-blue-400" />
                            <span className={`text-sm font-medium ${getAIMatchColor(worker.aiMatch)}`}>
                              {worker.aiMatch}% match
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            {worker.location}
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Clock className="w-4 h-4" />
                            {worker.experience} exp.
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Star className="w-4 h-4 text-yellow-400" />
                            {worker.rating} ({worker.completedJobs} jobs)
                          </div>
                          <div className="text-muted-foreground">{worker.distance} away</div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {worker.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs border-border">
                              {skill}
                            </Badge>
                          ))}
                          {worker.skills.length > 3 && (
                            <Badge variant="outline" className="text-xs border-border">
                              +{worker.skills.length - 3} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-blue-400 font-medium">{worker.hourlyRate}</span>
                          <span className="text-muted-foreground">Last active: {worker.lastActive}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 min-w-[200px]">
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-border hover:bg-accent bg-transparent"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 border-border hover:bg-accent bg-transparent"
                        >
                          View Profile
                        </Button>
                      </div>
                      {worker.availability === "available" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600/20 text-green-400 hover:bg-green-600/10 bg-transparent"
                        >
                          Hire Now
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="available" className="space-y-4">
            {filteredWorkers
              .filter((worker) => worker.availability === "available")
              .map((worker) => (
                <Card key={worker.id} className="bg-card border-border">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="relative">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={worker.avatar || "/placeholder.svg"} alt={worker.name} />
                            <AvatarFallback>
                              {worker.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-card"></div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{worker.name}</h3>
                            {worker.verified && (
                              <Badge variant="secondary" className="bg-green-600/10 text-green-400 border-green-600/20">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Badge variant="secondary" className="bg-green-600/10 text-green-400 border-green-600/20">
                              Available Now
                            </Badge>
                            <div className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-blue-400" />
                              <span className={`text-sm font-medium ${getAIMatchColor(worker.aiMatch)}`}>
                                {worker.aiMatch}% match
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              {worker.location}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {worker.experience} exp.
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Star className="w-4 h-4 text-yellow-400" />
                              {worker.rating} ({worker.completedJobs} jobs)
                            </div>
                            <div className="text-muted-foreground">{worker.distance} away</div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {worker.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs border-border">
                                {skill}
                              </Badge>
                            ))}
                            {worker.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs border-border">
                                +{worker.skills.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-blue-400 font-medium">{worker.hourlyRate}</span>
                            <span className="text-muted-foreground">Last active: {worker.lastActive}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-border hover:bg-accent bg-transparent"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-border hover:bg-accent bg-transparent"
                          >
                            View Profile
                          </Button>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-green-600/20 text-green-400 hover:bg-green-600/10 bg-transparent"
                        >
                          Hire Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="recommended" className="space-y-4">
            {filteredWorkers
              .filter((worker) => worker.aiMatch >= 85)
              .sort((a, b) => b.aiMatch - a.aiMatch)
              .map((worker) => (
                <Card key={worker.id} className="bg-card border-border border-blue-600/20">
                  <CardContent className="pt-6">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="relative">
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={worker.avatar || "/placeholder.svg"} alt={worker.name} />
                            <AvatarFallback>
                              {worker.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div
                            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                              worker.availability === "available"
                                ? "bg-green-400"
                                : worker.availability === "busy"
                                  ? "bg-red-400"
                                  : "bg-gray-400"
                            }`}
                          ></div>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{worker.name}</h3>
                            {worker.verified && (
                              <Badge variant="secondary" className="bg-green-600/10 text-green-400 border-green-600/20">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Verified
                              </Badge>
                            )}
                            <Badge variant="secondary" className={getAvailabilityColor(worker.availability)}>
                              {worker.availability}
                            </Badge>
                            <Badge variant="secondary" className="bg-blue-600/10 text-blue-400 border-blue-600/20">
                              <Sparkles className="w-3 h-3 mr-1" />
                              AI Recommended
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <MapPin className="w-4 h-4" />
                              {worker.location}
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Clock className="w-4 h-4" />
                              {worker.experience} exp.
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Star className="w-4 h-4 text-yellow-400" />
                              {worker.rating} ({worker.completedJobs} jobs)
                            </div>
                            <div className="text-muted-foreground">{worker.distance} away</div>
                          </div>

                          <div className="flex flex-wrap gap-2 mb-3">
                            {worker.skills.slice(0, 3).map((skill) => (
                              <Badge key={skill} variant="outline" className="text-xs border-border">
                                {skill}
                              </Badge>
                            ))}
                            {worker.skills.length > 3 && (
                              <Badge variant="outline" className="text-xs border-border">
                                +{worker.skills.length - 3} more
                              </Badge>
                            )}
                          </div>

                          <div className="flex items-center gap-4 text-sm">
                            <span className="text-blue-400 font-medium">{worker.hourlyRate}</span>
                            <span className={`font-medium ${getAIMatchColor(worker.aiMatch)}`}>
                              {worker.aiMatch}% AI match
                            </span>
                            <span className="text-muted-foreground">Last active: {worker.lastActive}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 min-w-[200px]">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                          <MessageCircle className="w-4 h-4 mr-2" />
                          Send Message
                        </Button>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-border hover:bg-accent bg-transparent"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-border hover:bg-accent bg-transparent"
                          >
                            View Profile
                          </Button>
                        </div>
                        {worker.availability === "available" && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-green-600/20 text-green-400 hover:bg-green-600/10 bg-transparent"
                          >
                            Hire Now
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>
        </Tabs>

        {filteredWorkers.length === 0 && (
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No workers found</h3>
                <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setAvailabilityFilter("all")
                    setSkillFilter("all")
                  }}
                  className="border-border hover:bg-accent bg-transparent"
                >
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
