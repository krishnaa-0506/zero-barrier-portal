"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

interface Skill {
  name: string
}

interface ApplicantProps {
  id: string
  name: string
  photo?: string
  isVerified: boolean
  status: 'new' | 'reviewed' | 'hired' | 'rejected'
  jobTitle: string
  location: string
  experience: number
  rating: number
  distance: number
  skillMatch: number
  skills: Skill[]
  onMessage: (id: string) => void
  onCall: (id: string) => void
  onShortlist?: (id: string) => void
  onReject?: (id: string) => void
  onViewProfile: (id: string) => void
}

export function ApplicantCard({
  id,
  name,
  photo,
  isVerified,
  status,
  jobTitle,
  location,
  experience,
  rating,
  distance,
  skillMatch,
  skills,
  onMessage,
  onCall,
  onShortlist,
  onReject,
  onViewProfile,
}: ApplicantProps) {
  const statusColors = {
    new: "bg-blue-500",
    reviewed: "bg-yellow-500",
    hired: "bg-green-500",
    rejected: "bg-red-500"
  }

  return (
    <Card className="p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback>{name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{name}</h3>
              {isVerified && (
                <Badge variant="secondary">Verified</Badge>
              )}
              <Badge className={statusColors[status]}>{status}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">Applied for: {jobTitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">{location}</p>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-sm">{experience} years exp.</span>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">{rating} rating</span>
            </div>
            <span className="text-sm">{distance} km away</span>
          </div>
        </div>
        <div>
          <div className="flex items-center justify-end gap-2">
            <span className="text-sm font-medium">Skill Match</span>
            <Badge variant="outline" className="bg-green-500/10">
              {skillMatch}%
            </Badge>
          </div>
          <div className="flex flex-wrap gap-2 mt-2 justify-end">
            {skills.slice(0, 3).map((skill) => (
              <Badge key={skill.name} variant="secondary">
                {skill.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 justify-between pt-2 border-t">
        <Button variant="ghost" onClick={() => onViewProfile(id)}>
          View Profile
        </Button>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => onMessage(id)}>
            Message
          </Button>
          <Button variant="outline" onClick={() => onCall(id)}>
            Call
          </Button>
          {status === 'new' && (
            <>
              <Button variant="default" onClick={() => onShortlist?.(id)}>
                Shortlist
              </Button>
              <Button variant="destructive" onClick={() => onReject?.(id)}>
                Reject
              </Button>
            </>
          )}
        </div>
      </div>
    </Card>
  )
}