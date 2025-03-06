import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  MapPin,
  Home,
  FileText,
  CreditCard,
  BarChart3,
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-bold">Lagos Property Map</h1>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/map"
              className="text-sm font-medium hover:text-primary"
            >
              Map View
            </Link>
            <Link
              href="/properties/new"
              className="text-sm font-medium hover:text-primary"
            >
              Register Property
            </Link>
            <Link
              href="#features"
              className="text-sm font-medium hover:text-primary"
            >
              Features
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/map">
              <Button variant="outline" size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                View Map
              </Button>
            </Link>
            <Link href="/properties">
              <Button size="sm">Properties</Button>
            </Link>
            <Link href="/properties/new">
              <Button size="sm">Register Property</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Lagos State Property Profiling System
            </h1>
            <p className="text-lg text-gray-600">
              A comprehensive digital solution for property management, land use
              charge administration, and geospatial visualization of properties
              across Lagos State.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link href="/map">
                <Button size="lg" className="w-full sm:w-auto">
                  <MapPin className="h-5 w-5 mr-2" />
                  Explore Map
                </Button>
              </Link>
              <Link href="/properties/new">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Home className="h-5 w-5 mr-2" />
                  Register Property
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="Lagos Property Map Preview"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
              <Link href="/map">
                <Button variant="secondary" size="lg" className="shadow-lg">
                  View Interactive Map
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Key Features</h2>
            <p className="text-gray-600 mt-2">
              Comprehensive tools for property management and administration
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <MapPin className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Interactive Property Map</CardTitle>
                <CardDescription>
                  Visualize properties across Lagos with color-coded status
                  indicators
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>
                      Geospatial visualization of all registered properties
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Color-coded property status (paid or owing)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Property clustering for better visualization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Property Registration</CardTitle>
                <CardDescription>
                  Streamlined process for registering and documenting properties
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Simple form-based property registration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Automatic certificate generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Downloadable property documentation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CreditCard className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Payment Management</CardTitle>
                <CardDescription>
                  Multiple payment options and receipt generation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>
                      Multiple payment methods (USSD, bank transfer, etc.)
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Automatic receipt generation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                    <span>Land Use Charge certificate issuance</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">System Performance</h2>
            <p className="text-gray-600 mt-2">
              Tracking property registration and payment statistics
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <BarChart3 className="h-10 w-10 text-primary mx-auto mb-4" />
              <div className="text-4xl font-bold">15,432</div>
              <p className="text-gray-600 mt-2">Registered Properties</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <CreditCard className="h-10 w-10 text-green-500 mx-auto mb-4" />
              <div className="text-4xl font-bold">65%</div>
              <p className="text-gray-600 mt-2">Payment Compliance</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <Home className="h-10 w-10 text-blue-500 mx-auto mb-4" />
              <div className="text-4xl font-bold">58%</div>
              <p className="text-gray-600 mt-2">Residential Properties</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm text-center">
              <FileText className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
              <div className="text-4xl font-bold">12,500+</div>
              <p className="text-gray-600 mt-2">Certificates Issued</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">About the System</h2>
            <p className="text-gray-600 mb-8">
              The Lagos Property Map is an initiative of the Lagos State
              Government to digitize and streamline property registration, land
              use charge administration, and property visualization across the
              state. This system aims to improve revenue collection, enhance
              property documentation, and provide transparency in property
              management.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/map">
                <Button>
                  <MapPin className="h-4 w-4 mr-2" />
                  Explore Map
                </Button>
              </Link>
              <Link href="/properties/new">
                <Button variant="outline">
                  <Home className="h-4 w-4 mr-2" />
                  Register Property
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Home className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold">Lagos Property Map</h2>
              </div>
              <p className="text-gray-400">
                A comprehensive property profiling system for Lagos State land
                use charge administration.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/map" className="text-gray-400 hover:text-white">
                    Map View
                  </Link>
                </li>
                <li>
                  <Link
                    href="/properties/new"
                    className="text-gray-400 hover:text-white"
                  >
                    Register Property
                  </Link>
                </li>
                <li>
                  <Link
                    href="#features"
                    className="text-gray-400 hover:text-white"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="text-gray-400 hover:text-white"
                  >
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Lagos State Government</li>
                <li>Land Use Charge Department</li>
                <li>Email: info@lasgpropertymap.gov.ng</li>
                <li>Phone: +234 (0) 700 LAGOS LUC</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-400 hover:text-white">
                    Data Protection
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Lagos State Government. All
              rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
