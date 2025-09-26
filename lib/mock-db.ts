// Mock database service for development when MongoDB is not available
import type { User, Job, Application } from "./types"
import type { ObjectId } from "mongodb"

let mockUsers: User[] = []
let mockJobs: Job[] = []
let mockApplications: Application[] = []
let isInitialized = false

export class MockDatabaseService {
  private static instance: MockDatabaseService

  static getInstance(): MockDatabaseService {
    if (!MockDatabaseService.instance) {
      MockDatabaseService.instance = new MockDatabaseService()
      MockDatabaseService.instance.initializeSampleData()
    }
    return MockDatabaseService.instance
  }

  private async initializeSampleData() {
    if (isInitialized) return
    isInitialized = true
    console.log("[Mock DB] Initialized - ready for real data")
  }

  // User operations
  async createUser(userData: Omit<User, "_id" | "createdAt" | "updatedAt">): Promise<User> {
    const now = new Date()
    const user: User = {
      ...userData,
      _id: `user_${Date.now()}` as any,
      createdAt: now,
      updatedAt: now,
    }
    mockUsers.push(user)
    return user
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return mockUsers.find(user => user.email === email) || null
  }

  async findUserById(id: string | ObjectId): Promise<User | null> {
    const idStr = typeof id === 'string' ? id : id.toString()
    return mockUsers.find(user => user._id?.toString() === idStr) || null
  }

  async updateUser(id: string | ObjectId, updates: Partial<User>): Promise<boolean> {
    const idStr = typeof id === 'string' ? id : id.toString()
    const index = mockUsers.findIndex(user => user._id?.toString() === idStr)
    if (index !== -1) {
      mockUsers[index] = { ...mockUsers[index], ...updates, updatedAt: new Date() }
      return true
    }
    return false
  }

  // Job operations
  async createJob(jobData: Omit<Job, "_id" | "createdAt" | "updatedAt" | "stats">): Promise<Job> {
    const now = new Date()
    const job: Job = {
      ...jobData,
      _id: `job_${Date.now()}` as any,
      createdAt: now,
      updatedAt: now,
      stats: {
        views: 0,
        applications: 0,
        shortlisted: 0,
        hired: 0,
      },
    }
    mockJobs.push(job)
    return job
  }

  async findJobsByEmployer(employerId: string | ObjectId, filters?: any): Promise<Job[]> {
    const idStr = typeof employerId === 'string' ? employerId : employerId.toString()
    return mockJobs.filter(job => job.employerId?.toString() === idStr)
  }

  async findJobById(id: string | ObjectId): Promise<Job | null> {
    const idStr = typeof id === 'string' ? id : id.toString()
    return mockJobs.find(job => job._id?.toString() === idStr) || null
  }

  async updateJob(id: string | ObjectId, updates: Partial<Job>): Promise<boolean> {
    const idStr = typeof id === 'string' ? id : id.toString()
    const index = mockJobs.findIndex(job => job._id?.toString() === idStr)
    if (index !== -1) {
      mockJobs[index] = { ...mockJobs[index], ...updates, updatedAt: new Date() }
      return true
    }
    return false
  }

  async searchJobs(filters: any = {}, limit = 20, skip = 0): Promise<Job[]> {
    let filteredJobs = mockJobs.filter(job => job.status === "active")
    
    if (filters.query) {
      filteredJobs = filteredJobs.filter(job => 
        job.title.toLowerCase().includes(filters.query.toLowerCase()) ||
        job.description.toLowerCase().includes(filters.query.toLowerCase())
      )
    }

    return filteredJobs.slice(skip, skip + limit)
  }

  // Application operations
  async createApplication(applicationData: Omit<Application, "_id" | "appliedAt" | "updatedAt">): Promise<Application> {
    const now = new Date()
    const application: Application = {
      ...applicationData,
      _id: `app_${Date.now()}` as any,
      appliedAt: now,
      updatedAt: now,
    }
    mockApplications.push(application)
    return application
  }

  async findApplicationsByJob(jobId: string | ObjectId): Promise<Application[]> {
    const idStr = typeof jobId === 'string' ? jobId : jobId.toString()
    return mockApplications.filter(app => app.jobId?.toString() === idStr)
  }

  async findApplicationsByEmployer(employerId: string | ObjectId, filters?: any): Promise<Application[]> {
    const idStr = typeof employerId === 'string' ? employerId : employerId.toString()
    return mockApplications.filter(app => app.employerId?.toString() === idStr)
  }

  async updateApplication(id: string | ObjectId, updates: Partial<Application>): Promise<boolean> {
    const idStr = typeof id === 'string' ? id : id.toString()
    const index = mockApplications.findIndex(app => app._id?.toString() === idStr)
    if (index !== -1) {
      mockApplications[index] = { ...mockApplications[index], ...updates, updatedAt: new Date() }
      return true
    }
    return false
  }

  async getEmployerAnalytics(employerId: string | ObjectId, period = "monthly"): Promise<any> {
    const idStr = typeof employerId === 'string' ? employerId : employerId.toString()
    const employerJobs = mockJobs.filter(job => job.employerId?.toString() === idStr)
    const employerApplications = mockApplications.filter(app => app.employerId?.toString() === idStr)

    return {
      jobs: {
        totalJobs: employerJobs.length,
        activeJobs: employerJobs.filter(job => job.status === "active").length,
        totalViews: employerJobs.reduce((sum, job) => sum + job.stats.views, 0),
        totalApplications: employerJobs.reduce((sum, job) => sum + job.stats.applications, 0),
        totalHires: employerJobs.reduce((sum, job) => sum + job.stats.hired, 0),
      },
      applications: employerApplications.reduce((acc, app) => {
        acc[app.status] = (acc[app.status] || 0) + 1
        return acc
      }, {} as Record<string, number>),
    }
  }

  async updateJobStats(jobId: string | ObjectId, increment: Partial<Job["stats"]>): Promise<void> {
    const idStr = typeof jobId === 'string' ? jobId : jobId.toString()
    const job = mockJobs.find(j => j._id?.toString() === idStr)
    if (job) {
      Object.entries(increment).forEach(([key, value]) => {
        if (key in job.stats) {
          (job.stats as any)[key] += value
        }
      })
    }
  }

  async createIndexes(): Promise<void> {
    // Mock implementation - no actual indexes needed
    console.log("[Mock DB] Indexes created (mock)")
  }
}