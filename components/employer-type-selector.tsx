"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Building2, 
  Hammer, 
  User, 
  Rocket, 
  Store, 
  MoreHorizontal,
  Check
} from "lucide-react"

interface EmployerType {
  id: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  popular?: boolean
  examples: string[]
}

const employerTypes: EmployerType[] = [
  {
    id: "company",
    title: "Company/Corporation",
    description: "Established businesses with formal structure",
    icon: Building2,
    popular: true,
    examples: ["IT Companies", "Manufacturing", "Healthcare", "Retail Chains"]
  },
  {
    id: "contractor",
    title: "Contractor",
    description: "Independent contractors and freelance employers",
    icon: Hammer,
    popular: true,
    examples: ["Construction", "Event Management", "Consulting", "Project-based work"]
  },
  {
    id: "individual",
    title: "Individual Employer",
    description: "Personal hiring for homes or small projects",
    icon: User,
    examples: ["Household Staff", "Personal Drivers", "Caretakers", "Home Services"]
  },
  {
    id: "startup",
    title: "Startup",
    description: "Early-stage companies and new businesses",
    icon: Rocket,
    examples: ["Tech Startups", "Food Delivery", "App-based Services", "New Ventures"]
  },
  {
    id: "small_business",
    title: "Small Business",
    description: "Local shops, restaurants, and small enterprises",
    icon: Store,
    popular: true,
    examples: ["Restaurants", "Local Shops", "Service Centers", "Workshops"]
  },
  {
    id: "other",
    title: "Other",
    description: "NGOs, cooperatives, and other organizations",
    icon: MoreHorizontal,
    examples: ["NGOs", "Cooperatives", "Associations", "Clubs"]
  }
]

interface EmployerTypeSelectorProps {
  selectedType: string
  onTypeSelect: (type: string) => void
}

export function EmployerTypeSelector({ selectedType, onTypeSelect }: EmployerTypeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">What type of employer are you?</h3>
        <p className="text-sm text-muted-foreground">
          This helps us customize your experience and connect you with the right workers
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employerTypes.map((type) => {
          const Icon = type.icon
          const isSelected = selectedType === type.id
          
          return (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all border-2 ${
                isSelected
                  ? "border-blue-500 bg-blue-50/10 ring-2 ring-blue-500/20"
                  : "border-border hover:border-blue-300 bg-card"
              }`}
              onClick={() => onTypeSelect(type.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      isSelected ? "bg-blue-500/10" : "bg-muted/50"
                    }`}>
                      <Icon className={`w-5 h-5 ${
                        isSelected ? "text-blue-500" : "text-muted-foreground"
                      }`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold text-foreground text-sm">{type.title}</h4>
                        {type.popular && (
                          <Badge variant="secondary" className="text-xs bg-green-600/10 text-green-400 border-green-600/20">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{type.description}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="p-1 bg-blue-500 rounded-full">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Examples:</p>
                  <div className="flex flex-wrap gap-1">
                    {type.examples.slice(0, 3).map((example, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="text-xs px-2 py-0 border-border text-muted-foreground"
                      >
                        {example}
                      </Badge>
                    ))}
                    {type.examples.length > 3 && (
                      <Badge
                        variant="outline"
                        className="text-xs px-2 py-0 border-border text-muted-foreground"
                      >
                        +{type.examples.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}