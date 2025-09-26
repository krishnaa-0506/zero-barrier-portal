import { type NextRequest, NextResponse } from "next/server"
import { verifyAuth } from "@/lib/auth-utils"
import { getDatabase } from "@/lib/mongodb"
import type { Notification } from "@/lib/types"
import { ObjectId } from "mongodb"

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const db = await getDatabase()
    const notifications = await db.collection<Notification>("notifications")
      .find({ userId: new ObjectId(user.userId) })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray()

    return NextResponse.json(notifications)
  } catch (error) {
    console.error("[Notifications API Error]:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "Notification ID is required" }, { status: 400 })
    }

    const db = await getDatabase()
    const result = await db.collection("notifications").updateOne(
      { _id: new ObjectId(id), userId: new ObjectId(user.userId) },
      { $set: { isRead: true } }
    )

    if (result.modifiedCount === 0) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Notifications API Error]:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await verifyAuth(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "Notification ID is required" }, { status: 400 })
    }

    const db = await getDatabase()
    const result = await db.collection("notifications").deleteOne({
      _id: new ObjectId(id),
      userId: new ObjectId(user.userId)
    })

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[Notifications API Error]:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}