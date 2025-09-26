"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"

interface AuthGuardProps {
  children: React.ReactNode
  requireAuth?: boolean
}

export function AuthGuard({ children, requireAuth = true }: AuthGuardProps) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (requireAuth) {
        if (!user) {
          router.push("/login")
        } else if (user.role !== 'employer') {
          // If not an employer, redirect to a message page
          router.push("/access-denied")
        }
      } else if (!requireAuth && user) {
        router.push("/dashboard")
      }
    }
  }, [loading, user, requireAuth, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (requireAuth) {
    // Return null if user is not logged in or not an employer
    if (!user || user.role !== 'employer') {
      return null
    }
  } else if (user) {
    // Return null on auth-free pages if user is logged in
    return null
  }

  return <>{children}</>
}
