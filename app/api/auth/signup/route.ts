import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { db } from "@/lib/db-utils"
import { generateVerificationToken } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const { email, password, companyName, contactPerson, phone } = await request.json()

    if (!email || !password || !companyName || !contactPerson) {
      return NextResponse.json({ error: "All required fields must be provided" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await db.findUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 409 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

    // Generate verification token
    const verificationToken = generateVerificationToken()

    // Create user with proper EmployerProfile structure
    const userData = {
      email,
      password: hashedPassword,
      phone,
      role: "employer" as const,
      isVerified: true, // Auto-verify for development
      verificationToken,
      profile: {
        companyName,
        employerType: "company" as const,
        companyType: "Private Limited",
        industry: "Other",
        companySize: "2-10" as const,
        website: "",
        description: "",
        logo: "",
        address: {
          street: "",
          city: "",
          state: "",
          pincode: "",
        },
        contactPerson: {
          name: contactPerson,
          designation: "Manager",
          phone: phone || "",
        },
        documents: {
          status: "pending" as const,
        },
        subscription: {
          plan: "free" as const,
          jobPostsRemaining: 3,
        },
      },
    }

    const user = await db.createUser(userData)

    // TODO: Send verification email
    console.log("[v0] Verification token for", email, ":", verificationToken)

    return NextResponse.json({
      message: "Account created successfully. Please check your email for verification.",
      userId: user._id,
    })
  } catch (error) {
    console.error("[v0] Signup error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
