import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth-utils"
import { db } from "@/lib/db-utils"

export async function GET(request: NextRequest) {
  try {
    const auth = await verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await db.findUserById(auth.userId)
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Return user without sensitive information
    const { password, verificationToken, resetPasswordToken, ...safeUser } = user

    return NextResponse.json({
      user: safeUser
    })
  } catch (error) {
    console.error("[Auth Check Error]:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}