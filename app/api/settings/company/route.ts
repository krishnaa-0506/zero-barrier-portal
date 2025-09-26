import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import jwt from "jsonwebtoken"
import type { EmployerProfile } from "@/lib/types"

interface CompanyData {
  name: string
  contactPerson: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    pincode: string
  }
  website?: string
  gstNumber?: string
  panNumber?: string
  description?: string
  employerType?: EmployerProfile["employerType"]
  companyType?: string
  industry?: string
  companySize?: EmployerProfile["companySize"]
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    const data: CompanyData = await request.json()

    // Validate required fields
    if (!data.name || !data.contactPerson || !data.email) {
      return NextResponse.json({ error: "Required fields are missing" }, { status: 400 })
    }

    const { db } = await connectToDatabase()

    // Update the employer profile with proper structure
    await db.collection("users").updateOne(
      { _id: new ObjectId(decoded.userId), role: "employer" },
      {
        $set: {
          "profile.companyName": data.name,
          "profile.contactPerson.name": data.contactPerson,
          "profile.contactPerson.phone": data.phone,
          email: data.email,
          phone: data.phone,
          "profile.address": data.address || { street: "", city: "", state: "", pincode: "" },
          "profile.website": data.website,
          "profile.documents.gst": data.gstNumber,
          "profile.documents.pan": data.panNumber,
          "profile.description": data.description,
          "profile.employerType": data.employerType || "company",
          "profile.companyType": data.companyType || "Private Limited",
          "profile.industry": data.industry || "Other",
          "profile.companySize": data.companySize || "2-10",
          updatedAt: new Date(),
        },
      }
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Company settings update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
