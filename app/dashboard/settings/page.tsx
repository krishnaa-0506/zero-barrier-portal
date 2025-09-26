"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Building, Bell, CreditCard, Save, CheckCircle, Loader2, AlertCircle, Shield, Key } from "lucide-react"
import { DashboardLayout } from "@/components/dashboard-layout"

interface CompanyData {
  name: string
  contactPerson: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    pincode: string
  }
  website: string
  gstNumber: string
  panNumber: string
  description: string
  employerType: "company" | "contractor" | "individual" | "startup" | "small_business" | "other"
  companyType: string
  industry: string
  companySize: "individual" | "2-10" | "11-50" | "51-200" | "201-500" | "500+"
  verificationStatus?: "pending" | "verified" | "rejected"
  logo?: string
}

interface NotificationSettings {
  newApplications: boolean
  jobExpiry: boolean
  workerMessages: boolean
  systemUpdates: boolean
  marketingEmails: boolean
  smsNotifications: boolean
  emailDigest: string
}

interface Preferences {
  language: string
  timezone: string
  currency: string
  autoTranslate: boolean
  aiSuggestions: boolean
  bulkOperations: boolean
}

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const [companyData, setCompanyData] = useState<CompanyData>({
    name: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    website: "",
    gstNumber: "",
    panNumber: "",
    description: "",
    employerType: "company",
    companyType: "",
    industry: "",
    companySize: "2-10",
  })

  const [notifications, setNotifications] = useState<NotificationSettings>({
    newApplications: true,
    jobExpiry: true,
    workerMessages: true,
    systemUpdates: false,
    marketingEmails: false,
    smsNotifications: true,
    emailDigest: "daily",
  })

  const [preferences, setPreferences] = useState<Preferences>({
    language: "english",
    timezone: "asia/kolkata",
    currency: "inr",
    autoTranslate: true,
    aiSuggestions: true,
    bulkOperations: true,
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setIsLoading(true)
      setError("")

      const response = await fetch("/api/settings")
      if (!response.ok) {
        throw new Error("Failed to fetch settings")
      }

      const data = await response.json()
      console.log("[v0] Settings loaded:", data)

      if (data.company) setCompanyData(data.company)
      if (data.notifications) setNotifications(data.notifications)
      if (data.preferences) setPreferences(data.preferences)
    } catch (err) {
      console.error("[v0] Settings fetch error:", err)
      setError(err instanceof Error ? err.message : "Failed to load settings")
    } finally {
      setIsLoading(false)
    }
  }

  const saveCompanySettings = async () => {
    try {
      setIsSaving(true)
      setError("")
      setSuccess("")

      const response = await fetch("/api/settings/company", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
      })

      if (!response.ok) {
        throw new Error("Failed to save company settings")
      }

      console.log("[v0] Company settings saved")
      setSuccess("Company settings saved successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("[v0] Save error:", err)
      setError(err instanceof Error ? err.message : "Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  const saveNotificationSettings = async () => {
    try {
      setIsSaving(true)
      setError("")
      setSuccess("")

      const response = await fetch("/api/settings/notifications", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notifications),
      })

      if (!response.ok) {
        throw new Error("Failed to save notification settings")
      }

      console.log("[v0] Notification settings saved")
      setSuccess("Notification preferences saved successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("[v0] Save error:", err)
      setError(err instanceof Error ? err.message : "Failed to save settings")
    } finally {
      setIsSaving(false)
    }
  }

  const changePassword = async () => {
    try {
      setIsSaving(true)
      setError("")
      setSuccess("")

      if (passwordData.newPassword !== passwordData.confirmPassword) {
        throw new Error("New passwords do not match")
      }

      if (passwordData.newPassword.length < 6) {
        throw new Error("Password must be at least 6 characters long")
      }

      const response = await fetch("/api/auth/change-password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || "Failed to change password")
      }

      console.log("[v0] Password changed successfully")
      setSuccess("Password changed successfully!")
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      console.error("[v0] Password change error:", err)
      setError(err instanceof Error ? err.message : "Failed to change password")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences</p>
        </div>

        {success && (
          <Alert className="border-green-600/20 bg-green-600/10">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-400">{success}</AlertDescription>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="company" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="company">Company</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="preferences">Preferences</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
          </TabsList>

          <TabsContent value="company" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Building className="w-5 h-5 text-blue-400" />
                  <div>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>Update your company details and verification status</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={companyData.name}
                      onChange={(e) => setCompanyData({ ...companyData, name: e.target.value })}
                      className="bg-background border-border"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contactPerson">Contact Person</Label>
                    <Input
                      id="contactPerson"
                      value={companyData.contactPerson}
                      onChange={(e) => setCompanyData({ ...companyData, contactPerson: e.target.value })}
                      className="bg-background border-border"
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={companyData.email}
                      onChange={(e) => setCompanyData({ ...companyData, email: e.target.value })}
                      className="bg-background border-border"
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={companyData.phone}
                      onChange={(e) => setCompanyData({ ...companyData, phone: e.target.value })}
                      className="bg-background border-border"
                      disabled={isSaving}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employerType">Company Type</Label>
                    <Select
                      defaultValue={companyData.employerType}
                      onValueChange={(value) => {
                        const employerType = value as CompanyData["employerType"]
                        setCompanyData((prev) => ({
                          ...prev,
                          employerType,
                        }))
                      }}
                      disabled={isSaving}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select company type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="company">Company</SelectItem>
                        <SelectItem value="contractor">Contractor</SelectItem>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="startup">Startup</SelectItem>
                        <SelectItem value="small_business">Small Business</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select
                      defaultValue={companyData.companySize}
                      onValueChange={(value) => {
                        const companySize = value as CompanyData["companySize"]
                        setCompanyData((prev) => ({
                          ...prev,
                          companySize,
                        }))
                      }}
                      disabled={isSaving}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select company size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="2-10">2-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="500+">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="industry">Industry</Label>
                    <Input
                      id="industry"
                      value={companyData.industry}
                      onChange={(e) => setCompanyData({ ...companyData, industry: e.target.value })}
                      className="bg-background border-border"
                      disabled={isSaving}
                      placeholder="e.g., Technology, Manufacturing"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold text-foreground">Company Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        value={companyData.address.street}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            address: { ...companyData.address, street: e.target.value },
                          })
                        }
                        className="bg-background border-border"
                        disabled={isSaving}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={companyData.address.city}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            address: { ...companyData.address, city: e.target.value },
                          })
                        }
                        className="bg-background border-border"
                        disabled={isSaving}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={companyData.address.state}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            address: { ...companyData.address, state: e.target.value },
                          })
                        }
                        className="bg-background border-border"
                        disabled={isSaving}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">PIN Code</Label>
                      <Input
                        id="pincode"
                        value={companyData.address.pincode}
                        onChange={(e) =>
                          setCompanyData({
                            ...companyData,
                            address: { ...companyData.address, pincode: e.target.value },
                          })
                        }
                        className="bg-background border-border"
                        disabled={isSaving}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website (Optional)</Label>
                  <Input
                    id="website"
                    value={companyData.website}
                    onChange={(e) => setCompanyData({ ...companyData, website: e.target.value })}
                    className="bg-background border-border"
                    disabled={isSaving}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    value={companyData.description}
                    onChange={(e) => setCompanyData({ ...companyData, description: e.target.value })}
                    className="bg-background border-border"
                    rows={4}
                    disabled={isSaving}
                  />
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Business Verification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="gstNumber">GST Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="gstNumber"
                          value={companyData.gstNumber}
                          onChange={(e) => setCompanyData({ ...companyData, gstNumber: e.target.value })}
                          className="bg-background border-border"
                          disabled={isSaving}
                        />
                        <Badge variant="secondary" className="bg-green-600/10 text-green-400 border-green-600/20">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="panNumber">PAN Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="panNumber"
                          value={companyData.panNumber}
                          onChange={(e) => setCompanyData({ ...companyData, panNumber: e.target.value })}
                          className="bg-background border-border"
                          disabled={isSaving}
                        />
                        <Badge variant="secondary" className="bg-green-600/10 text-green-400 border-green-600/20">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={saveCompanySettings}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-yellow-400" />
                  <div>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>Choose how you want to be notified about important updates</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">New Applications</h3>
                      <p className="text-sm text-muted-foreground">Get notified when workers apply to your jobs</p>
                    </div>
                    <Switch
                      checked={notifications.newApplications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, newApplications: checked })}
                      disabled={isSaving}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Job Expiry Alerts</h3>
                      <p className="text-sm text-muted-foreground">
                        Reminders when your job postings are about to expire
                      </p>
                    </div>
                    <Switch
                      checked={notifications.jobExpiry}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, jobExpiry: checked })}
                      disabled={isSaving}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Worker Messages</h3>
                      <p className="text-sm text-muted-foreground">Notifications for messages from workers</p>
                    </div>
                    <Switch
                      checked={notifications.workerMessages}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, workerMessages: checked })}
                      disabled={isSaving}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">System Updates</h3>
                      <p className="text-sm text-muted-foreground">Updates about new features and system maintenance</p>
                    </div>
                    <Switch
                      checked={notifications.systemUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, systemUpdates: checked })}
                      disabled={isSaving}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">Marketing Emails</h3>
                      <p className="text-sm text-muted-foreground">Tips, best practices, and promotional content</p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                      disabled={isSaving}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-foreground">SMS Notifications</h3>
                      <p className="text-sm text-muted-foreground">Urgent notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="emailDigest">Email Digest Frequency</Label>
                  <Select
                    defaultValue={notifications.emailDigest}
                    onValueChange={(value) => {
                      setNotifications((prev) => ({
                        ...prev,
                        emailDigest: value,
                      }))
                    }}
                    disabled={isSaving}
                  >
                    <SelectTrigger className="bg-background border-border">
                      <SelectValue placeholder="Select email frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily Summary</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={saveNotificationSettings}
                    disabled={isSaving}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Save Preferences
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-green-400" />
                  <div>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>Manage your account security and password</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                      className="bg-background border-border"
                      disabled={isSaving}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      className="bg-background border-border"
                      disabled={isSaving}
                      minLength={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      className="bg-background border-border"
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    onClick={changePassword}
                    disabled={
                      isSaving ||
                      !passwordData.currentPassword ||
                      !passwordData.newPassword ||
                      !passwordData.confirmPassword
                    }
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Changing...
                      </>
                    ) : (
                      <>
                        <Key className="w-4 h-4 mr-2" />
                        Change Password
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-green-400" />
                  <div>
                    <CardTitle>Billing & Subscription</CardTitle>
                    <CardDescription>Manage your subscription and payment methods</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-4 bg-green-600/10 border border-green-600/20 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-foreground">Current Plan: Professional</h3>
                      <p className="text-sm text-muted-foreground">₹2,999/month • Unlimited job postings</p>
                    </div>
                    <Badge variant="secondary" className="bg-green-600/10 text-green-400 border-green-600/20">
                      Active
                    </Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 border border-border rounded-lg">
                    <h3 className="font-semibold text-foreground">Jobs Posted</h3>
                    <p className="text-2xl font-bold text-blue-400">66</p>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <h3 className="font-semibold text-foreground">Workers Hired</h3>
                    <p className="text-2xl font-bold text-green-400">95</p>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </div>
                  <div className="text-center p-4 border border-border rounded-lg">
                    <h3 className="font-semibold text-foreground">Next Billing</h3>
                    <p className="text-2xl font-bold text-yellow-400">Feb 15</p>
                    <p className="text-sm text-muted-foreground">₹2,999</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Payment Method</h3>
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-600"></div>
                        <div className="text-foreground">Credit Card</div>
                      </div>
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">Update Payment Method</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Key className="w-5 h-5 text-blue-400" />
                  <div>
                    <CardTitle>Preferences</CardTitle>
                    <CardDescription>Customize your account settings</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      defaultValue={preferences.language}
                      onValueChange={(value) => {
                        setPreferences((prev) => ({
                          ...prev,
                          language: value,
                        }))
                      }}
                      disabled={isSaving}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      defaultValue={preferences.timezone}
                      onValueChange={(value) => {
                        setPreferences((prev) => ({
                          ...prev,
                          timezone: value,
                        }))
                      }}
                      disabled={isSaving}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asia/kolkata">Asia/Kolkata</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                        <SelectItem value="pst">America/Los_Angeles</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select
                      defaultValue={preferences.currency}
                      onValueChange={(value) => {
                        setPreferences((prev) => ({
                          ...prev,
                          currency: value,
                        }))
                      }}
                      disabled={isSaving}
                    >
                      <SelectTrigger className="bg-background border-border">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="inr">INR</SelectItem>
                        <SelectItem value="usd">USD</SelectItem>
                        <SelectItem value="eur">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="autoTranslate">Auto Translate</Label>
                    <Switch
                      checked={preferences.autoTranslate}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, autoTranslate: checked })}
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="aiSuggestions">AI Suggestions</Label>
                    <Switch
                      checked={preferences.aiSuggestions}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, aiSuggestions: checked })}
                      disabled={isSaving}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bulkOperations">Bulk Operations</Label>
                    <Switch
                      checked={preferences.bulkOperations}
                      onCheckedChange={(checked) => setPreferences({ ...preferences, bulkOperations: checked })}
                      disabled={isSaving}
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Preferences
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
