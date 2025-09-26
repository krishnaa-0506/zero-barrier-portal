import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ZB</span>
            </div>
            <span className="text-xl font-semibold text-foreground">Zero Barrier</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Sign In
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge variant="secondary" className="mb-4 bg-blue-600/10 text-blue-400 border-blue-600/20">
            Trusted by 500+ Companies
          </Badge>
          <h1 className="text-5xl font-bold mb-6 text-balance">
            Hire Verified Workers in <span className="text-blue-400">Minutes, Not Days</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Whether you're a company, contractor, or individual employer - connect with pre-verified, skilled workers instantly. 
            Our AI-powered platform matches you with the right talent for any job, from construction to hospitality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Start Hiring Today
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-border hover:bg-accent bg-transparent">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Zero Barrier?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether you're a large company, small contractor, or individual employer - skip the hassle of traditional hiring. 
              Get access to verified, reliable workers ready to start immediately.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-600/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-blue-400 text-xl">🛡️</div>
                </div>
                <CardTitle className="text-foreground">Verified Workers</CardTitle>
                <CardDescription>
                  All workers are Aadhaar verified with background checks and skill assessments completed.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-green-600/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-green-400 text-xl">⚡</div>
                </div>
                <CardTitle className="text-foreground">AI Matching</CardTitle>
                <CardDescription>
                  Our smart algorithm matches you with workers based on skills, location, and availability.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-600/10 rounded-lg flex items-center justify-center mb-4">
                  <div className="w-6 h-6 text-yellow-400 text-xl">👥</div>
                </div>
                <CardTitle className="text-foreground">Bulk Hiring</CardTitle>
                <CardDescription>
                  Need 50+ workers? Upload job requirements in bulk and hire entire teams at once.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything You Need to Hire Fast</h2>
            <p className="text-muted-foreground">Powerful tools designed for all types of employers - from contractors to corporations</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 text-sm">✓</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Real-time Availability</h3>
                <p className="text-sm text-muted-foreground">See which workers are available right now</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 text-sm">✓</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Smart Job Templates</h3>
                <p className="text-sm text-muted-foreground">Pre-filled job descriptions for common roles</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 text-sm">✓</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Multi-language Support</h3>
                <p className="text-sm text-muted-foreground">Auto-translate jobs to worker's preferred language</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 text-sm">✓</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Shift Scheduling</h3>
                <p className="text-sm text-muted-foreground">Assign shifts and notify workers instantly</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 text-sm">✓</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Location Mapping</h3>
                <p className="text-sm text-muted-foreground">Find workers near your job site</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 text-sm">✓</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Rating System</h3>
                <p className="text-sm text-muted-foreground">See worker ratings from previous employers</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 text-sm">✓</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Analytics Dashboard</h3>
                <p className="text-sm text-muted-foreground">Track hiring metrics and performance</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-5 h-5 text-green-400 mt-1 flex-shrink-0 text-sm">✓</div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Instant Notifications</h3>
                <p className="text-sm text-muted-foreground">Get notified when workers apply</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-card/50">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-2">50,000+</div>
              <div className="text-muted-foreground">Verified Workers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-2">500+</div>
              <div className="text-muted-foreground">Active Employers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400 mb-2">2 Hours</div>
              <div className="text-muted-foreground">Average Time to Hire</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-400 mb-2">98%</div>
              <div className="text-muted-foreground">Employer Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h2 className="text-4xl font-bold mb-6 text-balance">Ready to Transform Your Hiring?</h2>
          <p className="text-xl text-muted-foreground mb-8 text-pretty">
            Join hundreds of employers - companies, contractors, and individuals - already using Zero Barrier to hire faster and more efficiently.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8">
                Start Hiring Today
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-border hover:bg-accent bg-transparent">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">ZB</span>
                </div>
                <span className="text-xl font-semibold">Zero Barrier</span>
              </div>
              <p className="text-muted-foreground text-sm">Connecting verified workers with all types of employers across India - companies, contractors, and individuals.</p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/features" className="hover:text-foreground">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-foreground">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/integrations" className="hover:text-foreground">
                    Integrations
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-foreground">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="hover:text-foreground">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-foreground">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help" className="hover:text-foreground">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-foreground">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-foreground">
                    Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 Zero Barrier. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
