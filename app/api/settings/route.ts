import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import jwt from "jsonwebtoken"
import type { EmployerProfile } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    const { db } = await connectToDatabase()

    const employer = await db.collection("users").findOne(
      { _id: new ObjectId(decoded.userId), role: "employer" }
    )

    if (!employer || !employer.profile) {
      return NextResponse.json({ error: "Employer profile not found" }, { status: 404 })
    }

    const profile = employer.profile as EmployerProfile
    
    return NextResponse.json({
      company: {
        name: profile.companyName,
        contactPerson: profile.contactPerson.name,
        email: employer.email,
        phone: profile.contactPerson.phone || employer.phone || "",
        address: profile.address,
        website: profile.website || "",
        gstNumber: profile.documents.gst || "",
        panNumber: profile.documents.pan || "",
        description: profile.description || "",
        employerType: profile.employerType,
        companyType: profile.companyType || "",
        industry: profile.industry,
        companySize: profile.companySize,
        verificationStatus: profile.documents.status,
        logo: profile.logo || "",
      },
      notifications: employer.notifications || {
        newApplications: true,
        jobExpiry: true,
        workerMessages: true,
        systemUpdates: false,
        marketingEmails: false,
        smsNotifications: true,
        emailDigest: "daily",
      },
      preferences: employer.preferences || {
        language: "english",
        timezone: "asia/kolkata",
        currency: "inr",
        autoTranslate: true,
        aiSuggestions: true,
        bulkOperations: true,
      },
    })
  } catch (error) {
    console.error("Settings fetch error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
