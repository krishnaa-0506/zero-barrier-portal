import { db } from "../lib/db-utils"

async function initializeDatabase() {
  try {
    console.log("[v0] Starting database initialization...")

    // Create indexes for better performance
    await db.createIndexes()
    console.log("[v0] Database indexes created successfully")

    // Seed initial data
    await seedInitialData()
    console.log("[v0] Initial data seeded successfully")

    console.log("[v0] Database initialization completed!")
  } catch (error) {
    console.error("[v0] Database initialization failed:", error)
    throw error
  }
}

async function seedInitialData() {
  // No mock data - real users will register themselves
  console.log("[v0] Database initialized - ready for real data")
}

// Run the initialization
initializeDatabase().catch(console.error)
