"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, MapPin, DollarSign, Sparkles, Save, Send, Loader2, AlertCircle } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"
import { LocationSelector } from "@/components/location-selector"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NewJobPage() {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    state: "",
    district: "",
    stateLabel: "",
    districtLabel: "",
    address: "",
    salaryType: "daily",
    salaryMin: "",
    salaryMax: "",
    workType: "",
    urgency: "medium",
    requirements: "",
    benefits: "",
    contactInfo: "",
  })

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  const jobTemplates = [
    {
      id: "construction",
      title: "Construction Workers",
      description:
        "Experienced construction workers needed for residential/commercial projects. Must have basic construction skills and ability to work in team environment.",
      requirements:
        "• 1+ years construction experience\n• Physical fitness required\n• Basic tool knowledge\n• Team player attitude",
      workType: "full-time",
      salaryType: "daily",
      salaryRange: "500-700",
    },
    {
      id: "warehouse",
      title: "Warehouse Staff",
      description:
        "Looking for warehouse staff for inventory management, packing, and logistics operations. Experience with warehouse operations preferred.",
      requirements:
        "• Basic computer skills\n• Physical ability to lift 25kg\n• Attention to detail\n• Previous warehouse experience preferred",
      workType: "full-time",
      salaryType: "monthly",
      salaryRange: "18000-22000",
    },
    {
      id: "security",
      title: "Security Guards",
      description:
        "Security guards needed for office complexes and residential areas. Must be alert, responsible, and have good communication skills.",
      requirements:
        "• Security training certificate\n• Good physical condition\n• Alert and responsible\n• Basic English communication",
      workType: "shift",
      salaryType: "monthly",
      salaryRange: "15000-18000",
    },
    {
      id: "delivery",
      title: "Delivery Drivers",
      description:
        "Delivery drivers needed for food and package delivery. Own vehicle preferred but not mandatory. Flexible working hours available.",
      requirements:
        "• Valid driving license\n• Own vehicle preferred\n• Good knowledge of local area\n• Mobile phone required",
      workType: "part-time",
      salaryType: "daily",
      salaryRange: "400-600",
    },
  ]

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template.id)
    setJobData({
      ...jobData,
      title: template.title,
      description: template.description,
      requirements: template.requirements,
      workType: template.workType,
      salaryType: template.salaryType,
      salaryMin: template.salaryRange.split("-")[0],
      salaryMax: template.salaryRange.split("-")[1],
    })
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState("")

  const handleSaveDraft = async () => {
    await submitJob("draft")
  }

  const handlePublish = async () => {
    await submitJob("active")
  }

  const submitJob = async (status: "draft" | "active") => {
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const jobPayload = {
        title: jobData.title,
        description: jobData.description,
        category: "General", // You can add category selection later
        requirements: {
          skills: jobData.requirements.split('\n').filter(req => req.trim()),
          experience: 0, // You can add experience field later
          languages: ["Hindi", "English"],
          gender: "any",
        },
        location: {
          type: "onsite",
          address: {
            street: jobData.address || "",
            city: jobData.districtLabel,
            state: jobData.stateLabel,
            pincode: "",
            coordinates: {
              lat: 0,
              lng: 0,
            },
          },
        },
        employment: {
          type: jobData.workType || "full-time",
          shifts: {
            type: "day",
            timings: "9:00 AM - 6:00 PM",
          },
        },
        compensation: {
          type: jobData.salaryType,
          amount: Number.parseInt(jobData.salaryMax || jobData.salaryMin || "0"),
          currency: "INR",
          benefits: jobData.benefits.split('\n').filter(benefit => benefit.trim()),
        },
        positions: 1,
        urgency: jobData.urgency,
        status: status,
        visibility: "public",
        applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        startDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        tags: [],
      }

      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jobPayload),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to create job")
      }

      console.log("Job created successfully:", data)
      // Redirect to jobs list or show success message
      window.location.href = "/dashboard/jobs"
    } catch (error) {
      console.error("Job submission error:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to create job")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/dashboard/jobs">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Jobs
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Post New Job</h1>
            <p className="text-muted-foreground">Create a job posting to find the right workers</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="details" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="template">Templates</TabsTrigger>
                <TabsTrigger value="details">Job Details</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
              </TabsList>

              <TabsContent value="template" className="space-y-4">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-blue-400" />
                      Smart Job Templates
                    </CardTitle>
                    <CardDescription>Choose from pre-filled templates to get started quickly</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {jobTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedTemplate === template.id
                            ? "border-blue-600 bg-blue-600/5"
                            : "border-border hover:bg-accent"
                        }`}
                        onClick={() => handleTemplateSelect(template)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-foreground">{template.title}</h3>
                          <Badge variant="secondary" className="text-xs">
                            {template.workType}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                        <div className="text-xs text-blue-400">
                          ₹{template.salaryRange.replace("-", " - ")} per {template.salaryType}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Provide the essential details about the job</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Job Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Construction Workers, Warehouse Staff"
                        value={jobData.title}
                        onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Job Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the job role, responsibilities, and what you're looking for..."
                        rows={4}
                        value={jobData.description}
                        onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Job Location</Label>
                        <LocationSelector
                          onLocationChange={(location) => 
                            setJobData({ 
                              ...jobData, 
                              state: location.state,
                              district: location.district,
                              stateLabel: location.stateLabel,
                              districtLabel: location.districtLabel
                            })
                          }
                          initialState={jobData.state}
                          initialDistrict={jobData.district}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="address">Specific Address (Optional)</Label>
                        <div className="relative">
                          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            id="address"
                            placeholder="Street address, landmark, etc."
                            value={jobData.address}
                            onChange={(e) => setJobData({ ...jobData, address: e.target.value })}
                            className="pl-10 bg-background border-border"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="workType">Work Type</Label>
                        <Select
                          value={jobData.workType}
                          onValueChange={(value) => setJobData({ ...jobData, workType: value })}
                        >
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Select work type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="full-time">Full-time</SelectItem>
                            <SelectItem value="part-time">Part-time</SelectItem>
                            <SelectItem value="shift">Shift Work</SelectItem>
                            <SelectItem value="contract">Contract</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label>Salary Range</Label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Select
                          value={jobData.salaryType}
                          onValueChange={(value) => setJobData({ ...jobData, salaryType: value })}
                        >
                          <SelectTrigger className="bg-background border-border">
                            <SelectValue placeholder="Pay type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="daily">Per Day</SelectItem>
                            <SelectItem value="monthly">Per Month</SelectItem>
                            <SelectItem value="hourly">Per Hour</SelectItem>
                          </SelectContent>
                        </Select>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Min amount"
                            value={jobData.salaryMin}
                            onChange={(e) => setJobData({ ...jobData, salaryMin: e.target.value })}
                            className="pl-10 bg-background border-border"
                          />
                        </div>
                        <div className="relative">
                          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Max amount"
                            value={jobData.salaryMax}
                            onChange={(e) => setJobData({ ...jobData, salaryMax: e.target.value })}
                            className="pl-10 bg-background border-border"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="urgency">Priority Level</Label>
                      <Select
                        value={jobData.urgency}
                        onValueChange={(value) => setJobData({ ...jobData, urgency: value })}
                      >
                        <SelectTrigger className="bg-background border-border">
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low - Can wait a few days</SelectItem>
                          <SelectItem value="medium">Medium - Need within a week</SelectItem>
                          <SelectItem value="high">High - Need immediately</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="requirements" className="space-y-6">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle>Requirements & Benefits</CardTitle>
                    <CardDescription>Specify what you're looking for and what you offer</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="requirements">Requirements</Label>
                      <Textarea
                        id="requirements"
                        placeholder="• Experience level required&#10;• Skills needed&#10;• Physical requirements&#10;• Any certifications"
                        rows={6}
                        value={jobData.requirements}
                        onChange={(e) => setJobData({ ...jobData, requirements: e.target.value })}
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="benefits">Benefits & Perks</Label>
                      <Textarea
                        id="benefits"
                        placeholder="• Food provided&#10;• Transportation allowance&#10;• Health insurance&#10;• Performance bonuses"
                        rows={4}
                        value={jobData.benefits}
                        onChange={(e) => setJobData({ ...jobData, benefits: e.target.value })}
                        className="bg-background border-border"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="contactInfo">Contact Information</Label>
                      <Textarea
                        id="contactInfo"
                        placeholder="How should workers contact you?&#10;Phone, email, or specific instructions..."
                        rows={3}
                        value={jobData.contactInfo}
                        onChange={(e) => setJobData({ ...jobData, contactInfo: e.target.value })}
                        className="bg-background border-border"
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Job Preview</CardTitle>
                <CardDescription>How your job will appear to workers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{jobData.title || "Job Title"}</h3>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-3 h-3" />
                    {jobData.stateLabel && jobData.districtLabel 
                      ? `${jobData.districtLabel}, ${jobData.stateLabel}` 
                      : "Location"}
                  </div>
                  {jobData.salaryMin && jobData.salaryMax && (
                    <div className="text-sm text-blue-400 mb-2">
                      ₹{jobData.salaryMin} - ₹{jobData.salaryMax} per {jobData.salaryType}
                    </div>
                  )}
                  <Badge variant="secondary" className="text-xs">
                    {jobData.workType || "Work Type"}
                  </Badge>
                </div>

                {jobData.description && (
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {jobData.description.substring(0, 100)}
                      {jobData.description.length > 100 ? "..." : ""}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Publish Options</CardTitle>
                <CardDescription>Choose how to save or publish your job</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {submitError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{submitError}</AlertDescription>
                  </Alert>
                )}
                
                <Button
                  onClick={handleSaveDraft}
                  variant="outline"
                  className="w-full border-border hover:bg-accent bg-transparent"
                  disabled={isSubmitting || !jobData.title || !jobData.description}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4 mr-2" />
                  )}
                  Save as Draft
                </Button>
                <Button
                  onClick={handlePublish}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={isSubmitting || !jobData.title || !jobData.description || !jobData.state || !jobData.district}
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4 mr-2" />
                  )}
                  Publish Job
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  Job will be visible to workers immediately after publishing
                </p>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg">Tips for Better Results</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Be specific about requirements</li>
                  <li>• Mention salary range clearly</li>
                  <li>• Add location details</li>
                  <li>• Include contact information</li>
                  <li>• Use urgent priority for immediate needs</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
