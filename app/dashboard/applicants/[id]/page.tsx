"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  MapPin,
  Star,
  Clock,
  CheckCircle,
  Phone,
  Mail,
  Award,
  Calendar,
  MessageCircle,
  Download,
} from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function ApplicantProfilePage({ params }: { params: { id: string } }) {
  // Mock data - in real app, fetch based on params.id
  const applicant = {
    id: 1,
    name: "Rajesh Kumar",
    avatar: "/indian-male-worker.jpg",
    jobTitle: "Construction Workers",
    jobId: 1,
    location: "Mumbai, Maharashtra",
    distance: "2.5 km",
    experience: "5 years",
    rating: 4.8,
    skillMatch: 95,
    appliedDate: "2024-01-16",
    status: "new",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    skills: ["Masonry", "Plumbing", "Electrical", "Carpentry", "Painting", "Welding"],
    previousJobs: 12,
    verified: true,
    languages: ["Hindi", "English", "Marathi"],
    bio: "Experienced construction worker with 5+ years in residential and commercial projects. Skilled in multiple trades including masonry, plumbing, and electrical work. Known for reliability and quality workmanship.",
    workHistory: [
      {
        company: "ABC Construction Ltd",
        role: "Senior Mason",
        duration: "2022 - 2024",
        rating: 4.9,
        description: "Led masonry work for 15+ residential projects. Managed team of 3 junior workers.",
      },
      {
        company: "XYZ Builders",
        role: "Construction Worker",
        duration: "2020 - 2022",
        rating: 4.7,
        description: "General construction work including plumbing and electrical assistance.",
      },
      {
        company: "PQR Infrastructure",
        role: "Helper",
        duration: "2019 - 2020",
        rating: 4.5,
        description: "Started as helper, learned various construction skills and techniques.",
      },
    ],
    certifications: [
      { name: "Construction Safety Certificate", issuer: "Safety Council of India", year: "2023" },
      { name: "Electrical Work Permit", issuer: "Maharashtra Electrical Board", year: "2022" },
      { name: "Plumbing Certification", issuer: "Plumbers Association", year: "2021" },
    ],
    availability: {
      startDate: "Immediately",
      workDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      preferredShift: "Day Shift (8 AM - 6 PM)",
    },
    references: [
      {
        name: "Suresh Patil",
        company: "ABC Construction Ltd",
        role: "Site Manager",
        phone: "+91 98765 11111",
        relationship: "Direct Supervisor",
      },
      {
        name: "Ramesh Gupta",
        company: "XYZ Builders",
        role: "Project Manager",
        phone: "+91 98765 22222",
        relationship: "Project Manager",
      },
    ],
  }

  const getStatusColor = (status: string) => {
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

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/applicants">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Applicants
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Applicant Profile</h1>
            <p className="text-muted-foreground">Detailed information about the applicant</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <Card className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-start gap-6">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src={applicant.avatar || "/placeholder.svg"} alt={applicant.name} />
                    <AvatarFallback className="text-lg">
                      {applicant.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-foreground">{applicant.name}</h2>
                      {applicant.verified && (
                        <Badge variant="secondary" className="bg-green-600/10 text-green-400 border-green-600/20">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                      <Badge variant="secondary" className={getStatusColor(applicant.status)}>
                        {applicant.status}
                      </Badge>
                    </div>

                    <p className="text-lg text-muted-foreground mb-4">Applied for: {applicant.jobTitle}</p>

                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="w-4 h-4" />
                        {applicant.location} ({applicant.distance} away)
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        {applicant.experience} experience
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Star className="w-4 h-4 text-yellow-400" />
                        {applicant.rating} rating ({applicant.previousJobs} jobs)
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        Applied {new Date(applicant.appliedDate).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Skill Match</span>
                        <span className="text-sm font-medium text-green-400">{applicant.skillMatch}%</span>
                      </div>
                      <Progress value={applicant.skillMatch} className="h-3" />
                    </div>

                    <p className="text-muted-foreground">{applicant.bio}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Skills & Expertise</CardTitle>
                <CardDescription>Technical skills and areas of expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {applicant.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="border-border">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Work History */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Work History</CardTitle>
                <CardDescription>Previous employment and experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {applicant.workHistory.map((job, index) => (
                  <div key={index}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-foreground">{job.role}</h3>
                        <p className="text-sm text-blue-400">{job.company}</p>
                        <p className="text-sm text-muted-foreground">{job.duration}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm font-medium">{job.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{job.description}</p>
                    {index < applicant.workHistory.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Certifications</CardTitle>
                <CardDescription>Professional certifications and licenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicant.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-yellow-400" />
                    <div>
                      <h3 className="font-medium text-foreground">{cert.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {cert.issuer} • {cert.year}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Actions</CardTitle>
                <CardDescription>Manage this applicant</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {applicant.status === "new" && (
                  <>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Shortlist Candidate
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-red-600/20 text-red-400 hover:bg-red-600/10 bg-transparent"
                    >
                      Reject Application
                    </Button>
                  </>
                )}

                {applicant.status === "shortlisted" && (
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Award className="w-4 h-4 mr-2" />
                    Hire Now
                  </Button>
                )}

                <Separator />

                <Button variant="outline" className="w-full border-border hover:bg-accent bg-transparent">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full border-border hover:bg-accent bg-transparent">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Interview
                </Button>
                <Button variant="outline" className="w-full border-border hover:bg-accent bg-transparent">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{applicant.phone}</p>
                    <p className="text-xs text-muted-foreground">Mobile</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{applicant.email}</p>
                    <p className="text-xs text-muted-foreground">Email</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Availability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Start Date</p>
                  <p className="text-sm text-muted-foreground">{applicant.availability.startDate}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Work Days</p>
                  <div className="flex flex-wrap gap-1">
                    {applicant.availability.workDays.map((day) => (
                      <Badge key={day} variant="outline" className="text-xs border-border">
                        {day.slice(0, 3)}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground mb-1">Preferred Shift</p>
                  <p className="text-sm text-muted-foreground">{applicant.availability.preferredShift}</p>
                </div>
              </CardContent>
            </Card>

            {/* Languages */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Languages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {applicant.languages.map((language) => (
                    <Badge key={language} variant="outline" className="border-border">
                      {language}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* References */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>References</CardTitle>
                <CardDescription>Previous employers and supervisors</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {applicant.references.map((ref, index) => (
                  <div key={index}>
                    <h3 className="font-medium text-foreground">{ref.name}</h3>
                    <p className="text-sm text-blue-400">{ref.role}</p>
                    <p className="text-sm text-muted-foreground">{ref.company}</p>
                    <p className="text-xs text-muted-foreground">{ref.relationship}</p>
                    <Button variant="ghost" size="sm" className="mt-1 p-0 h-auto text-blue-400 hover:text-blue-300">
                      <Phone className="w-3 h-3 mr-1" />
                      {ref.phone}
                    </Button>
                    {index < applicant.references.length - 1 && <Separator className="mt-3" />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
