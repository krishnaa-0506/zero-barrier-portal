import type { Notification } from "./types"
import { getDatabase } from "./mongodb"
import { ObjectId } from "mongodb"

export class NotificationService {
  static async getUserNotifications(userId: string | ObjectId): Promise<Notification[]> {
    const db = await getDatabase()
    const idObj = typeof userId === 'string' ? new ObjectId(userId) : userId
    
    return await db.collection<Notification>("notifications")
      .find({ userId: idObj })
      .sort({ createdAt: -1 })
      .limit(50)
      .toArray()
  }

  static async markAsRead(notificationId: string | ObjectId): Promise<boolean> {
    const db = await getDatabase()
    const idObj = typeof notificationId === 'string' ? new ObjectId(notificationId) : notificationId
    
    const result = await db.collection("notifications").updateOne(
      { _id: idObj },
      { $set: { isRead: true } }
    )
    
    return result.modifiedCount > 0
  }

  static async markAllAsRead(userId: string | ObjectId): Promise<boolean> {
    const db = await getDatabase()
    const idObj = typeof userId === 'string' ? new ObjectId(userId) : userId
    
    const result = await db.collection("notifications").updateMany(
      { userId: idObj, isRead: false },
      { $set: { isRead: true } }
    )
    
    return result.modifiedCount > 0
  }

  static async deleteNotification(notificationId: string | ObjectId): Promise<boolean> {
    const db = await getDatabase()
    const idObj = typeof notificationId === 'string' ? new ObjectId(notificationId) : notificationId
    
    const result = await db.collection("notifications").deleteOne({ _id: idObj })
    
    return result.deletedCount > 0
  }

  static async createNotification(notification: Omit<Notification, "_id" | "createdAt">): Promise<Notification> {
    const db = await getDatabase()
    
    const newNotification: Notification = {
      ...notification,
      createdAt: new Date()
    }
    
    const result = await db.collection<Notification>("notifications").insertOne(newNotification)
    return { ...newNotification, _id: result.insertedId }
  }
}