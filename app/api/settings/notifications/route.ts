import { type NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import jwt from "jsonwebtoken"

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
    const notificationSettings = await request.json()

    const { db } = await connectToDatabase()

    await db.collection("employers").updateOne(
      { _id: new ObjectId(decoded.userId) },
      {
        $set: {
          notifications: notificationSettings,
          updatedAt: new Date(),
        },
      },
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Notification settings update error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
