import type { ObjectId } from "mongodb"

// User and Company Types
export interface User {
  _id?: ObjectId
  email: string
  phone?: string
  password: string
  role: "employer" | "worker"
  isVerified: boolean
  verificationToken?: string
  resetPasswordToken?: string
  resetPasswordExpires?: Date
  createdAt: Date
  updatedAt: Date
  profile: EmployerProfile | WorkerProfile
}

export interface EmployerProfile {
  companyName: string
  employerType: "company" | "contractor" | "individual" | "startup" | "small_business" | "other"
  companyType?: string
  industry: string
  companySize: "individual" | "2-10" | "11-50" | "51-200" | "201-500" | "500+"
  website?: string
  description?: string
  logo?: string
  address: Address
  contactPerson: {
    name: string
    designation?: string
    phone: string
  }
  documents: {
    gst?: string
    pan?: string
    incorporation?: string
    aadhaar?: string // For individual contractors
    status: "pending" | "verified" | "rejected"
  }
  subscription: {
    plan: "free" | "basic" | "premium" | "enterprise"
    expiresAt?: Date
    jobPostsRemaining: number
  }
}

export interface WorkerProfile {
  firstName: string
  lastName: string
  dateOfBirth: Date
  gender: "male" | "female" | "other"
  avatar?: string
  address: Address
  skills: string[]
  experience: number
  education: string
  languages: string[]
  documents: {
    aadhaar: string
    pan?: string
    photo: string
    status: "pending" | "verified" | "rejected"
  }
  availability: {
    status: "available" | "busy" | "unavailable"
    workingHours: {
      start: string
      end: string
    }
    workingDays: string[]
  }
  rating: {
    average: number
    count: number
  }
  verificationBadges: string[]
}

export interface Address {
  street: string
  city: string
  state: string
  pincode: string
  coordinates?: {
    lat: number
    lng: number
  }
}

// Job Types
export interface Job {
  _id?: ObjectId
  employerId: ObjectId
  title: string
  description: string
  category: string
  subCategory?: string
  requirements: {
    skills: string[]
    experience: number
    education?: string
    languages?: string[]
    gender?: "male" | "female" | "any"
    ageRange?: {
      min: number
      max: number
    }
  }
  location: {
    type: "onsite" | "remote" | "hybrid"
    address?: Address
    radius?: number
  }
  employment: {
    type: "full-time" | "part-time" | "contract" | "temporary"
    duration?: string
    shifts?: {
      type: "day" | "night" | "rotational"
      timings: string
    }
  }
  compensation: {
    type: "hourly" | "daily" | "monthly" | "fixed"
    amount: number
    currency: string
    benefits?: string[]
  }
  positions: number
  urgency: "low" | "medium" | "high" | "urgent"
  status: "draft" | "active" | "paused" | "closed" | "expired"
  visibility: "public" | "private"
  applicationDeadline?: Date
  startDate?: Date
  tags: string[]
  createdAt: Date
  updatedAt: Date
  stats: {
    views: number
    applications: number
    shortlisted: number
    hired: number
  }
}

// Application Types
export interface Application {
  _id?: ObjectId
  jobId: ObjectId
  workerId: ObjectId
  employerId: ObjectId
  status: "applied" | "shortlisted" | "interviewed" | "selected" | "rejected" | "hired"
  appliedAt: Date
  updatedAt: Date
  coverLetter?: string
  expectedSalary?: number
  availability: {
    startDate: Date
    noticePeriod?: number
  }
  screening: {
    score?: number
    notes?: string
    questions?: {
      question: string
      answer: string
    }[]
  }
  interview: {
    scheduledAt?: Date
    type?: "phone" | "video" | "in-person"
    feedback?: string
    rating?: number
  }
  offer: {
    salary?: number
    startDate?: Date
    terms?: string
    status?: "pending" | "accepted" | "rejected" | "expired"
  }
}

// Analytics Types
export interface JobAnalytics {
  _id?: ObjectId
  jobId: ObjectId
  employerId: ObjectId
  date: Date
  metrics: {
    views: number
    applications: number
    uniqueViews: number
    conversionRate: number
    avgTimeToApply: number
  }
  demographics: {
    ageGroups: Record<string, number>
    genders: Record<string, number>
    locations: Record<string, number>
    skills: Record<string, number>
  }
}

export interface EmployerAnalytics {
  _id?: ObjectId
  employerId: ObjectId
  period: "daily" | "weekly" | "monthly"
  startDate: Date
  endDate: Date
  metrics: {
    jobsPosted: number
    totalApplications: number
    hires: number
    avgTimeToHire: number
    costPerHire: number
    applicationToHireRatio: number
  }
  topPerformingJobs: {
    jobId: ObjectId
    title: string
    applications: number
    hires: number
  }[]
  createdAt: Date
}

// Notification Types
export interface Notification {
  _id?: ObjectId
  userId: ObjectId
  type: "job_application" | "job_update" | "interview_scheduled" | "offer_received" | "system"
  title: string
  message: string
  data?: Record<string, any>
  isRead: boolean
  createdAt: Date
}

// Search and Filter Types
export interface JobSearchFilters {
  query?: string
  category?: string
  location?: {
    city?: string
    state?: string
    radius?: number
    coordinates?: {
      lat: number
      lng: number
    }
  }
  salary?: {
    min?: number
    max?: number
    type?: "hourly" | "daily" | "monthly"
  }
  employment?: {
    type?: string[]
    shifts?: string[]
  }
  experience?: {
    min?: number
    max?: number
  }
  skills?: string[]
  urgency?: string[]
  postedWithin?: number // days
  sortBy?: "relevance" | "date" | "salary" | "distance"
  sortOrder?: "asc" | "desc"
}

export interface WorkerSearchFilters {
  query?: string
  skills?: string[]
  location?: {
    city?: string
    state?: string
    radius?: number
    coordinates?: {
      lat: number
      lng: number
    }
  }
  experience?: {
    min?: number
    max?: number
  }
  availability?: string[]
  rating?: {
    min?: number
  }
  verification?: string[]
  sortBy?: "relevance" | "rating" | "experience" | "distance"
  sortOrder?: "asc" | "desc"
}
