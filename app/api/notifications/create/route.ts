import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getDatabase } from "@/lib/mongodb"
import { ObjectId } from "mongodb"
import type { Notification } from "@/lib/types"
import { verifyAuth } from "@/lib/auth-utils"

export async function POST(request: NextRequest) {
  try {
    const auth = await verifyAuth(request)
    if (!auth) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { type, title, message, data } = await request.json()

    const db = await getDatabase()
    
    const notification: Omit<Notification, "_id"> = {
      userId: new ObjectId(auth.userId),
      type,
      title,
      message,
      data,
      isRead: false,
      createdAt: new Date()
    }

    const result = await db.collection("notifications").insertOne(notification)

    return NextResponse.json({
      success: true,
      notificationId: result.insertedId
    })
  } catch (error) {
    console.error("[Notification Create Error]:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}