import Link from "next/link";
import Image from "next/image";
import { MapPin, Home, CreditCard, BarChart3, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 bg-gradient-to-b from-emerald-50 to-white">
          <div className="mx-auto container flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                Lagos State Property Profiling System
              </h1>
              <p className="text-lg text-muted-foreground max-w-[600px]">
                A comprehensive digital solution for property management, land
                use charge administration, and geospatial visualization of
                properties across Lagos State.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                  asChild
                >
                  <Link href="/map-view">
                    Explore Map <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/register-property">Register Property</Link>
                </Button>
              </div>
            </div>
            <div className="flex-1 w-full max-w-[500px] aspect-square relative rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/luc-property-map.png?height=500&width=500"
                alt="Lagos Property Map Preview"
                width={500}
                height={500}
                className="object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button
                  variant="secondary"
                  className="bg-white/80 backdrop-blur-sm hover:bg-white/90"
                >
                  View Interactive Map
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Key Features</h2>
              <p className="text-muted-foreground max-w-[700px] mx-auto">
                Comprehensive tools for property management and administration
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-emerald-100">
                    <MapPin className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Interactive Property Map
                  </h3>
                  <p className="text-muted-foreground">
                    Visualize properties across Lagos with color-coded status
                    indicators, geospatial visualization, and property
                    clustering.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-emerald-100">
                    <Home className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Property Registration
                  </h3>
                  <p className="text-muted-foreground">
                    Streamlined process for registering and documenting
                    properties with simple form-based registration and automatic
                    certificate generation.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-emerald-100">
                    <CreditCard className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Payment Management</h3>
                  <p className="text-muted-foreground">
                    Multiple payment options including USSD and bank transfer
                    with automatic receipt generation and certificate issuance.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 rounded-full w-12 h-12 flex items-center justify-center bg-emerald-100">
                    <BarChart3 className="h-6 w-6 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">System Performance</h3>
                  <p className="text-muted-foreground">
                    Tracking property registration and payment statistics to
                    monitor compliance and system effectiveness.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-emerald-50">
          <div className="mx-auto container">
            <h2 className="text-3xl font-bold text-center mb-12">
              System Performance
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bold text-emerald-600 mb-2">
                    15,432
                  </p>
                  <p className="text-lg font-medium">Registered Properties</p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bold text-emerald-600 mb-2">
                    65%
                  </p>
                  <p className="text-lg font-medium">Payment Compliance</p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bold text-emerald-600 mb-2">
                    58%
                  </p>
                  <p className="text-lg font-medium">Residential Properties</p>
                </CardContent>
              </Card>

              <Card className="bg-white">
                <CardContent className="pt-6 text-center">
                  <p className="text-4xl font-bold text-emerald-600 mb-2">
                    12,500+
                  </p>
                  <p className="text-lg font-medium">Certificates Issued</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 md:py-24">
          <div className="mx-auto container">
            <div className="max-w-[800px] mx-auto">
              <h2 className="text-3xl font-bold mb-6 text-center">
                About the System
              </h2>
              <p className="text-lg text-center mb-8">
                The Lagos Property Map is an initiative of the Lagos State
                Government to digitize and streamline property registration,
                land use charge administration, and property visualization
                across the state. This system aims to improve revenue
                collection, enhance property documentation, and provide
                transparency in property management.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-emerald-600 hover:bg-emerald-700"
                >
                  Explore Map
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/register-property">Register Property</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
