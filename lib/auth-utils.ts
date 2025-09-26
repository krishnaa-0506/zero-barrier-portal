import type { NextRequest } from "next/server"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import { getDatabase } from "./mongodb"
import { ObjectId } from "mongodb"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export interface AuthUser {
  userId: string
  email: string
  role: string
}

export async function verifyAuth(request: NextRequest): Promise<AuthUser | null> {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return null
    }

    const decoded = jwt.verify(token, JWT_SECRET) as any

    if (!decoded || typeof decoded !== 'object' || !decoded.userId || !decoded.email || !decoded.role) {
      console.error("[Auth] Invalid token payload:", decoded)
      return null
    }

    // Verify the user still exists in the database
    const db = await getDatabase()
    const user = await db.collection("users").findOne({ _id: new ObjectId(decoded.userId) })

    if (!user) {
      console.error("[Auth] User not found in database:", decoded.userId)
      return null
    }

    return {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
    }
  } catch (error) {
    console.error("[Auth] Verification error:", error)
    return null
  }
}

export function generateVerificationToken(): string {
  return crypto.randomBytes(32).toString("hex")
}
