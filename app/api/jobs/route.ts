import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db-utils"
import { verifyAuth } from "@/lib/auth-utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const status = searchParams.get("status")
    const category = searchParams.get("category")
    const search = searchParams.get("search")

    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const filters: any = {}
    if (status) filters.status = status
    if (category) filters.category = category
    if (search) filters.query = search

    const skip = (page - 1) * limit
    const jobs = await db.findJobsByEmployer(user.userId, filters)

    return NextResponse.json({
      jobs: jobs.slice(skip, skip + limit),
      total: jobs.length,
      page,
      totalPages: Math.ceil(jobs.length / limit),
    })
  } catch (error) {
    console.error("[v0] Get jobs error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const jobData = await request.json()

    // Validate required fields
    if (!jobData.title || !jobData.description || !jobData.category) {
      return NextResponse.json({ error: "Title, description, and category are required" }, { status: 400 })
    }

    // Create job with employer ID
    const job = await db.createJob({
      ...jobData,
      employerId: user.userId,
      tags: jobData.tags || [],
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    return NextResponse.json({
      message: "Job created successfully",
      job,
    })
  } catch (error) {
    console.error("[v0] Create job error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
