import Link from "next/link";
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileNav from "./mobile-nav";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2 font-bold text-xl">
          <MapPin className="h-5 w-5 text-emerald-600" />
          <Link href="/">Lagos Property Map</Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/map-view"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Map View
          </Link>
          <Link
            href="/register-property"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Register Property
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            Features
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-emerald-600 transition-colors"
          >
            About
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="hidden md:flex" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href="/register-property">Register Property</Link>
          </Button>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
