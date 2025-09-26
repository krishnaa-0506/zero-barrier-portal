"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Upload, Download, FileSpreadsheet, CheckCircle, AlertCircle, X, Eye } from "lucide-react"
import Link from "next/link"
import { DashboardLayout } from "@/components/dashboard-layout"

export default function BulkUploadPage() {
  const [uploadStep, setUploadStep] = useState<"upload" | "validate" | "review" | "complete">("upload")
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const sampleData = [
    {
      id: 1,
      title: "Construction Workers",
      location: "Mumbai, Maharashtra",
      salary: "₹500-700/day",
      workType: "Full-time",
      status: "valid",
      errors: [],
    },
    {
      id: 2,
      title: "Warehouse Staff",
      location: "Pune, Maharashtra",
      salary: "₹18000-22000/month",
      workType: "Full-time",
      status: "valid",
      errors: [],
    },
    {
      id: 3,
      title: "Security Guards",
      location: "",
      salary: "₹15000/month",
      workType: "Shift",
      status: "error",
      errors: ["Location is required", "Salary range missing"],
    },
    {
      id: 4,
      title: "Delivery Drivers",
      location: "Bangalore, Karnataka",
      salary: "₹400-600/day",
      workType: "Part-time",
      status: "warning",
      errors: ["Description is too short"],
    },
  ]

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      setUploadStep("validate")
      // Simulate upload progress
      let progress = 0
      const interval = setInterval(() => {
        progress += 10
        setUploadProgress(progress)
        if (progress >= 100) {
          clearInterval(interval)
          setTimeout(() => setUploadStep("review"), 500)
        }
      }, 200)
    }
  }

  const handlePublishAll = () => {
    setUploadStep("complete")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "valid":
        return "bg-green-600/10 text-green-400 border-green-600/20"
      case "warning":
        return "bg-yellow-600/10 text-yellow-400 border-yellow-600/20"
      case "error":
        return "bg-red-600/10 text-red-400 border-red-600/20"
      default:
        return "bg-gray-600/10 text-gray-400 border-gray-600/20"
    }
  }

  const validJobs = sampleData.filter((job) => job.status === "valid").length
  const warningJobs = sampleData.filter((job) => job.status === "warning").length
  const errorJobs = sampleData.filter((job) => job.status === "error").length

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
            <h1 className="text-3xl font-bold text-foreground">Bulk Job Upload</h1>
            <p className="text-muted-foreground">Upload multiple jobs at once using Excel or CSV files</p>
          </div>
        </div>

        {/* Progress Steps */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    uploadStep === "upload" ? "bg-blue-600 text-white" : "bg-green-600 text-white"
                  }`}
                >
                  {uploadStep === "upload" ? "1" : <CheckCircle className="w-4 h-4" />}
                </div>
                <span className={uploadStep === "upload" ? "text-foreground font-medium" : "text-muted-foreground"}>
                  Upload File
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    uploadStep === "validate"
                      ? "bg-blue-600 text-white"
                      : uploadStep === "review" || uploadStep === "complete"
                        ? "bg-green-600 text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {uploadStep === "validate" ? (
                    "2"
                  ) : uploadStep === "review" || uploadStep === "complete" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    "2"
                  )}
                </div>
                <span className={uploadStep === "validate" ? "text-foreground font-medium" : "text-muted-foreground"}>
                  Validate Data
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    uploadStep === "review"
                      ? "bg-blue-600 text-white"
                      : uploadStep === "complete"
                        ? "bg-green-600 text-white"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  {uploadStep === "review" ? (
                    "3"
                  ) : uploadStep === "complete" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    "3"
                  )}
                </div>
                <span className={uploadStep === "review" ? "text-foreground font-medium" : "text-muted-foreground"}>
                  Review & Publish
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    uploadStep === "complete" ? "bg-green-600 text-white" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {uploadStep === "complete" ? <CheckCircle className="w-4 h-4" /> : "4"}
                </div>
                <span className={uploadStep === "complete" ? "text-foreground font-medium" : "text-muted-foreground"}>
                  Complete
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Step */}
        {uploadStep === "upload" && (
          <div className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Upload Your Job File</CardTitle>
                <CardDescription>
                  Upload an Excel (.xlsx) or CSV file with your job listings. Maximum 100 jobs per upload.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Drop your file here</h3>
                  <p className="text-muted-foreground mb-4">or click to browse</p>
                  <input
                    type="file"
                    accept=".xlsx,.xls,.csv"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer">Choose File</Button>
                  </label>
                  <p className="text-xs text-muted-foreground mt-2">Supports .xlsx, .xls, .csv files up to 10MB</p>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Download Template</CardTitle>
                <CardDescription>
                  Use our template to ensure your data is formatted correctly for upload.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <FileSpreadsheet className="w-8 h-8 text-green-400" />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">Job Upload Template</h3>
                    <p className="text-sm text-muted-foreground">
                      Excel template with all required columns and sample data
                    </p>
                  </div>
                  <Button variant="outline" className="border-border hover:bg-accent bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Validation Step */}
        {uploadStep === "validate" && (
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Validating Your Data</CardTitle>
              <CardDescription>Please wait while we process and validate your job listings...</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <FileSpreadsheet className="w-8 h-8 text-blue-400" />
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{uploadedFile?.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {uploadedFile ? Math.round(uploadedFile.size / 1024) : 0} KB
                    </p>
                  </div>
                </div>
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-muted-foreground">Processing... {uploadProgress}%</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Review Step */}
        {uploadStep === "review" && (
          <div className="space-y-6">
            {/* Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Valid Jobs</p>
                      <p className="text-2xl font-bold text-green-400">{validJobs}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Warnings</p>
                      <p className="text-2xl font-bold text-yellow-400">{warningJobs}</p>
                    </div>
                    <AlertCircle className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Errors</p>
                      <p className="text-2xl font-bold text-red-400">{errorJobs}</p>
                    </div>
                    <X className="h-8 w-8 text-red-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Job List */}
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Review Jobs</CardTitle>
                    <CardDescription>Review and fix any issues before publishing</CardDescription>
                  </div>
                  <Button
                    onClick={handlePublishAll}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    disabled={errorJobs > 0}
                  >
                    Publish {validJobs + warningJobs} Jobs
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {sampleData.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground">{job.title}</h3>
                          <Badge variant="secondary" className={getStatusColor(job.status)}>
                            {job.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <span>{job.location || "No location"}</span>
                          <span>{job.salary}</span>
                          <span>{job.workType}</span>
                        </div>
                        {job.errors.length > 0 && (
                          <div className="mt-2">
                            {job.errors.map((error, index) => (
                              <p key={index} className="text-xs text-red-400">
                                • {error}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {job.status === "error" && (
                          <Button variant="outline" size="sm" className="border-border hover:bg-accent bg-transparent">
                            Fix
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Complete Step */}
        {uploadStep === "complete" && (
          <Card className="bg-card border-border">
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-2">Upload Complete!</h2>
                <p className="text-muted-foreground mb-6">
                  Successfully published {validJobs + warningJobs} jobs. They are now live and visible to workers.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/dashboard/jobs">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">View All Jobs</Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={() => setUploadStep("upload")}
                    className="border-border hover:bg-accent bg-transparent"
                  >
                    Upload More Jobs
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
