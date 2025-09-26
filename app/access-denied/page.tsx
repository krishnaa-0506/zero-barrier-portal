import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AccessDenied() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full mx-auto p-6 space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Access Denied</h1>
        <p className="text-muted-foreground">
          This portal is only accessible to employer accounts. If you are an employer, please ensure you are logged in with the correct account.
        </p>
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link href="/login">Return to Login</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Go to Homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}