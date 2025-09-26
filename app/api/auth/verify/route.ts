import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/db-utils"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Find user by email
    const user = await db.findUserByEmail(email)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Update user verification status
    const updated = await db.updateUser(user._id!, { isVerified: true })
    
    if (!updated) {
      return NextResponse.json({ error: "Failed to verify user" }, { status: 500 })
    }

    return NextResponse.json({
      message: "User verified successfully",
      email: user.email
    })
  } catch (error) {
    console.error("[v0] Verification error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}