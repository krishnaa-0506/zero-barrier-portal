import { getDatabase } from "./mongodb"
import { ObjectId } from "mongodb"
import type { User, Job, Application } from "./types"
import { MockDatabaseService } from "./mock-db"

// Collection names
export const COLLECTIONS = {
  USERS: "users",
  JOBS: "jobs",
  APPLICATIONS: "applications",
  JOB_ANALYTICS: "job_analytics",
  EMPLOYER_ANALYTICS: "employer_analytics",
  NOTIFICATIONS: "notifications",
} as const

// Database utility functions
export class DatabaseService {
  private static instance: DatabaseService

  static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService()
    }
    return DatabaseService.instance
  }

  // User operations
  async createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User> {
    const db = await getDatabase()
    const now = new Date()

    const user: User = {
      ...userData,
      createdAt: now,
      updatedAt: now,
    }

    const result = await db.collection(COLLECTIONS.USERS).insertOne(user)
    return { ...user, _id: result.insertedId }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const db = await getDatabase()
    return (await db.collection(COLLECTIONS.USERS).findOne({ email })) as User | null
  }

  async findUserById(id: string | ObjectId): Promise<User | null> {
    const db = await getDatabase()
    const objectId = typeof id === "string" ? new ObjectId(id) : id
    return (await db.collection(COLLECTIONS.USERS).findOne({ _id: objectId })) as User | null
  }

  async updateUser(id: string | ObjectId, updates: Partial<User>): Promise<boolean> {
    const db = await getDatabase()
    const objectId = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection(COLLECTIONS.USERS).updateOne(
      { _id: objectId },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  }

  // Job operations
  async createJob(jobData: Omit<Job, "_id" | "createdAt" | "updatedAt" | "stats">): Promise<Job> {
    const db = await getDatabase()
    const now = new Date()

    const job: Job = {
      ...jobData,
      createdAt: now,
      updatedAt: now,
      stats: {
        views: 0,
        applications: 0,
        shortlisted: 0,
        hired: 0,
      },
    }

    const result = await db.collection(COLLECTIONS.JOBS).insertOne(job)
    return { ...job, _id: result.insertedId }
  }

  async findJobsByEmployer(employerId: string | ObjectId, filters?: any): Promise<Job[]> {
    const db = await getDatabase()
    const objectId = typeof employerId === "string" ? new ObjectId(employerId) : employerId

    const query = { employerId: objectId, ...filters }
    return (await db.collection(COLLECTIONS.JOBS).find(query).sort({ createdAt: -1 }).toArray()) as Job[]
  }

  async findJobById(id: string | ObjectId): Promise<Job | null> {
    const db = await getDatabase()
    const objectId = typeof id === "string" ? new ObjectId(id) : id
    return (await db.collection(COLLECTIONS.JOBS).findOne({ _id: objectId })) as Job | null
  }

  async updateJob(id: string | ObjectId, updates: Partial<Job>): Promise<boolean> {
    const db = await getDatabase()
    const objectId = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection(COLLECTIONS.JOBS).updateOne(
      { _id: objectId },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  }

  async searchJobs(filters: any = {}, limit = 20, skip = 0): Promise<Job[]> {
    const db = await getDatabase()

    const pipeline = []

    // Match stage
    const matchStage: any = { status: "active" }

    if (filters.query) {
      matchStage.$text = { $search: filters.query }
    }

    if (filters.category) {
      matchStage.category = filters.category
    }

    if (filters.location?.city) {
      matchStage["location.address.city"] = new RegExp(filters.location.city, "i")
    }

    if (filters.salary?.min || filters.salary?.max) {
      matchStage["compensation.amount"] = {}
      if (filters.salary.min) matchStage["compensation.amount"].$gte = filters.salary.min
      if (filters.salary.max) matchStage["compensation.amount"].$lte = filters.salary.max
    }

    pipeline.push({ $match: matchStage })

    // Sort stage
    const sortStage: any = {}
    if (filters.sortBy === "date") {
      sortStage.createdAt = filters.sortOrder === "asc" ? 1 : -1
    } else if (filters.sortBy === "salary") {
      sortStage["compensation.amount"] = filters.sortOrder === "asc" ? 1 : -1
    } else {
      sortStage.createdAt = -1 // Default sort by newest
    }

    pipeline.push({ $sort: sortStage })
    pipeline.push({ $skip: skip })
    pipeline.push({ $limit: limit })

    return (await db.collection(COLLECTIONS.JOBS).aggregate(pipeline).toArray()) as Job[]
  }

  // Application operations
  async createApplication(applicationData: Omit<Application, "_id" | "appliedAt" | "updatedAt">): Promise<Application> {
    const db = await getDatabase()
    const now = new Date()

    const application: Application = {
      ...applicationData,
      appliedAt: now,
      updatedAt: now,
    }

    const result = await db.collection(COLLECTIONS.APPLICATIONS).insertOne(application)

    // Update job stats
    await this.updateJobStats(applicationData.jobId, { applications: 1 })

    return { ...application, _id: result.insertedId }
  }

  async findApplicationsByJob(jobId: string | ObjectId): Promise<Application[]> {
    const db = await getDatabase()
    const objectId = typeof jobId === "string" ? new ObjectId(jobId) : jobId

    return (await db
      .collection(COLLECTIONS.APPLICATIONS)
      .find({ jobId: objectId })
      .sort({ appliedAt: -1 })
      .toArray()) as Application[]
  }

  async findApplicationsByEmployer(employerId: string | ObjectId, filters?: any): Promise<Application[]> {
    const db = await getDatabase()
    const objectId = typeof employerId === "string" ? new ObjectId(employerId) : employerId

    const query = { employerId: objectId, ...filters }
    return (await db
      .collection(COLLECTIONS.APPLICATIONS)
      .find(query)
      .sort({ appliedAt: -1 })
      .toArray()) as Application[]
  }

  async updateApplication(id: string | ObjectId, updates: Partial<Application>): Promise<boolean> {
    const db = await getDatabase()
    const objectId = typeof id === "string" ? new ObjectId(id) : id

    const result = await db.collection(COLLECTIONS.APPLICATIONS).updateOne(
      { _id: objectId },
      {
        $set: {
          ...updates,
          updatedAt: new Date(),
        },
      },
    )

    return result.modifiedCount > 0
  }

  // Analytics operations
  async getEmployerAnalytics(employerId: string | ObjectId, period = "monthly"): Promise<any> {
    const db = await getDatabase()
    const objectId = typeof employerId === "string" ? new ObjectId(employerId) : employerId

    const pipeline = [
      { $match: { employerId: objectId } },
      {
        $group: {
          _id: null,
          totalJobs: { $sum: 1 },
          activeJobs: {
            $sum: { $cond: [{ $eq: ["$status", "active"] }, 1, 0] },
          },
          totalViews: { $sum: "$stats.views" },
          totalApplications: { $sum: "$stats.applications" },
          totalHires: { $sum: "$stats.hired" },
        },
      },
    ]

    const jobStats = await db.collection(COLLECTIONS.JOBS).aggregate(pipeline).toArray()

    // Get application stats
    const applicationStats = await db
      .collection(COLLECTIONS.APPLICATIONS)
      .aggregate([
        { $match: { employerId: objectId } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ])
      .toArray()

    return {
      jobs: jobStats[0] || {
        totalJobs: 0,
        activeJobs: 0,
        totalViews: 0,
        totalApplications: 0,
        totalHires: 0,
      },
      applications: applicationStats.reduce(
        (acc, stat) => {
          acc[stat._id] = stat.count
          return acc
        },
        {} as Record<string, number>,
      ),
    }
  }

  // Utility functions
  async updateJobStats(jobId: string | ObjectId, increment: Partial<Job["stats"]>): Promise<void> {
    const db = await getDatabase()
    const objectId = typeof jobId === "string" ? new ObjectId(jobId) : jobId

    const updateDoc: any = {}
    Object.entries(increment).forEach(([key, value]) => {
      updateDoc[`stats.${key}`] = value
    })

    await db.collection(COLLECTIONS.JOBS).updateOne({ _id: objectId }, { $inc: updateDoc })
  }

  async createIndexes(): Promise<void> {
    const db = await getDatabase()

    // User indexes
    await db.collection(COLLECTIONS.USERS).createIndex({ email: 1 }, { unique: true })
    await db.collection(COLLECTIONS.USERS).createIndex({ phone: 1 })
    await db.collection(COLLECTIONS.USERS).createIndex({ role: 1 })

    // Job indexes
    await db.collection(COLLECTIONS.JOBS).createIndex({ employerId: 1 })
    await db.collection(COLLECTIONS.JOBS).createIndex({ status: 1 })
    await db.collection(COLLECTIONS.JOBS).createIndex({ category: 1 })
    await db.collection(COLLECTIONS.JOBS).createIndex({ createdAt: -1 })
    await db.collection(COLLECTIONS.JOBS).createIndex({
      title: "text",
      description: "text",
      "requirements.skills": "text",
    })
    await db.collection(COLLECTIONS.JOBS).createIndex({
      "location.address.city": 1,
      "location.address.state": 1,
    })

    // Application indexes
    await db.collection(COLLECTIONS.APPLICATIONS).createIndex({ jobId: 1 })
    await db.collection(COLLECTIONS.APPLICATIONS).createIndex({ workerId: 1 })
    await db.collection(COLLECTIONS.APPLICATIONS).createIndex({ employerId: 1 })
    await db.collection(COLLECTIONS.APPLICATIONS).createIndex({ status: 1 })
    await db.collection(COLLECTIONS.APPLICATIONS).createIndex({ appliedAt: -1 })
  }
}

export const db = DatabaseService.getInstance()
