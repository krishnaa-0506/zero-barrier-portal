"use client"

import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { getStates, getDistricts } from "@/lib/location-data"

interface LocationSelectorProps {
  onLocationChange: (location: { state: string, district: string, stateLabel: string, districtLabel: string }) => void
  initialState?: string
  initialDistrict?: string
  className?: string
}

export function LocationSelector({ onLocationChange, initialState, initialDistrict, className }: LocationSelectorProps) {
  const [selectedState, setSelectedState] = useState(initialState || "")
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict || "")
  const [districts, setDistricts] = useState<Array<{value: string, label: string}>>([])

  const states = getStates()

  useEffect(() => {
    if (selectedState) {
      const districtList = getDistricts(selectedState)
      setDistricts(districtList)
      
      // Reset district if it's not valid for the new state
      if (selectedDistrict && !districtList.find(d => d.value === selectedDistrict)) {
        setSelectedDistrict("")
      }
    } else {
      setDistricts([])
      setSelectedDistrict("")
    }
  }, [selectedState])

  useEffect(() => {
    if (selectedState && selectedDistrict) {
      const stateLabel = states.find(s => s.value === selectedState)?.label || ""
      const districtLabel = districts.find(d => d.value === selectedDistrict)?.label || ""
      
      onLocationChange({
        state: selectedState,
        district: selectedDistrict,
        stateLabel,
        districtLabel
      })
    }
  }, [selectedState, selectedDistrict, states, districts, onLocationChange])

  const handleStateChange = (value: string) => {
    setSelectedState(value)
    setSelectedDistrict("") // Reset district when state changes
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="space-y-2">
        <Label htmlFor="state">State *</Label>
        <Select value={selectedState} onValueChange={handleStateChange}>
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {states.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="district">District *</Label>
        <Select 
          value={selectedDistrict} 
          onValueChange={setSelectedDistrict}
          disabled={!selectedState}
        >
          <SelectTrigger className="bg-background border-border">
            <SelectValue placeholder={selectedState ? "Select District" : "Select State first"} />
          </SelectTrigger>
          <SelectContent className="max-h-60">
            {districts.map((district) => (
              <SelectItem key={district.value} value={district.value}>
                {district.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}