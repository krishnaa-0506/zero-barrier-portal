import { getDatabase } from "../lib/mongodb"

async function initializeNotifications() {
  try {
    console.log("Initializing notifications collection...")
    const db = await getDatabase()

    // Create notifications collection if it doesn't exist
    await db.createCollection("notifications")

    // Create indexes
    await db.collection("notifications").createIndexes([
      { key: { userId: 1 }, name: "userId_idx" },
      { key: { createdAt: -1 }, name: "createdAt_idx" },
      { key: { isRead: 1 }, name: "isRead_idx" },
      { key: { type: 1 }, name: "type_idx" }
    ])

    console.log("Notifications collection initialized successfully")

  } catch (error) {
    console.error("Failed to initialize notifications:", error)
    process.exit(1)
  }
}

initializeNotifications()
  .then(() => process.exit(0))
  .catch(() => process.exit(1))