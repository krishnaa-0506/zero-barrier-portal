import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { verifyAuth } from "@/lib/auth-utils"
import { handleApplicationEvent } from "@/lib/notification-helpers"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get("status")
    const jobId = searchParams.get("jobId")

    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { db } = await connectToDatabase()
    const applications = await db.collection('applications').find({
      ...(status && { status }),
      ...(jobId && { jobId: new ObjectId(jobId) }),
      employerId: new ObjectId(user.userId)
    }).toArray()

    // Populate with worker and job details
    const populatedApplications = await Promise.all(
      applications.map(async (app: any) => {
        const worker = await db.collection('users').findOne({ _id: new ObjectId(app.workerId) })
        const job = await db.collection('jobs').findOne({ _id: new ObjectId(app.jobId) })

        return {
          ...app,
          worker: worker
            ? {
                id: worker._id,
                profile: worker.profile,
                email: worker.email,
              }
            : null,
          job: job
            ? {
                id: job._id,
                title: job.title,
                category: job.category,
              }
            : null,
        }
      }),
    )

    return NextResponse.json({ applications: populatedApplications })
  } catch (error) {
    console.error("[Applications] Get applications error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { jobId } = data

    const { db } = await connectToDatabase()
    
    // Check if job exists
    const job = await db.collection('jobs').findOne({ _id: new ObjectId(jobId) })
    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Create application
    const application = {
      jobId: new ObjectId(jobId),
      workerId: new ObjectId(user.userId),
      employerId: job.employerId,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    const result = await db.collection('applications').insertOne(application)
    
    // Create notification for new application
    await handleApplicationEvent({ 
      ...application, 
      _id: result.insertedId 
    }, 'new')

    return NextResponse.json({ 
      application: { 
        ...application, 
        _id: result.insertedId 
      }
    })

  } catch (error) {
    console.error("[Applications] Create application error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()
    const { applicationId, status } = data

    const { db } = await connectToDatabase()
    
    // Update application
    const application = await db.collection('applications').findOneAndUpdate(
      { _id: new ObjectId(applicationId), employerId: new ObjectId(user.userId) },
      { 
        $set: { 
          status,
          updatedAt: new Date()
        }
      },
      { returnDocument: 'after' }
    )

    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 })
    }

    // Create notification for status change
    await handleApplicationEvent(application, 'status_change')

    return NextResponse.json({ application })

  } catch (error) {
    console.error("[Applications] Update application error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
