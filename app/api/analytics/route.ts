import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db-utils"
import { verifyAuth } from "@/lib/auth-utils"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get database instance
    const database = await getDatabase()

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30d"

    // Convert userId to ObjectId
    const userId = new ObjectId(user.userId)

    // Get employer analytics
    const analytics = await db.getEmployerAnalytics(userId, period)

    // Get jobs for this employer
    const jobs = await db.findJobsByEmployer(userId)
    
    // Get applications for this employer
    const applications = await db.findApplicationsByEmployer(userId)

    // Calculate metrics
    const totalJobs = jobs.length
    const activeJobs = jobs.filter(job => job.status === "active").length
    const totalApplications = applications.length
    const totalHires = applications.filter(app => app.status === "hired").length
    
    // Calculate average time to hire (simplified - using days between application and hire)
    const hiredApplications = applications.filter(app => app.status === "hired")
    const avgTimeToHire = hiredApplications.length > 0 
      ? hiredApplications.reduce((sum, app) => {
          const timeDiff = new Date(app.updatedAt).getTime() - new Date(app.appliedAt).getTime()
          return sum + (timeDiff / (1000 * 60 * 60)) // Convert to hours
        }, 0) / hiredApplications.length
      : 0

    // Group applications by status
    const applicationsByStatus = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Calculate hire rate
    const hireRate = totalApplications > 0 ? (totalHires / totalApplications) * 100 : 0

    // Get job categories distribution
    const jobCategories = jobs.reduce((acc, job) => {
      acc[job.category] = (acc[job.category] || 0) + 1
      return acc
    }, {} as Record<string, number>)

    // Get location distribution
    const locations = jobs.reduce((acc, job) => {
      const city = job.location?.address?.city || "Unknown"
      if (!acc[city]) {
        acc[city] = { applications: 0, hires: 0 }
      }
      
      const jobApplications = applications.filter(app => app.jobId.toString() === job._id?.toString())
      acc[city].applications += jobApplications.length
      acc[city].hires += jobApplications.filter(app => app.status === "hired").length
      
      return acc
    }, {} as Record<string, { applications: number, hires: number }>)

    const response = {
      metrics: {
        totalJobs,
        activeJobs,
        totalApplications,
        totalHires,
        avgTimeToHire: Math.round(avgTimeToHire * 10) / 10, // Round to 1 decimal
        hireRate: Math.round(hireRate * 10) / 10,
        applicationRate: totalJobs > 0 ? Math.round((totalApplications / totalJobs) * 10) / 10 : 0
      },
      applicationsByStatus,
      jobCategories,
      locations,
      jobs: jobs.slice(0, 5), // Top 5 recent jobs
      recentApplications: applications.slice(0, 10) // Recent 10 applications
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("[v0] Analytics error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}