"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Menu, Home, User, Map, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] sm:w-[385px]">
        <SheetHeader className="mb-6">
          <SheetTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-emerald-600" />
            <span>Lagos Property Map</span>
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-base font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors"
            onClick={() => setOpen(false)}
          >
            <Home className="h-5 w-5" />
            Home
          </Link>
          <Link
            href="/map-view"
            className="flex items-center gap-2 text-base font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors"
            onClick={() => setOpen(false)}
          >
            <Map className="h-5 w-5" />
            Map View
          </Link>
          <Link
            href="/register-property"
            className="flex items-center gap-2 text-base font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors"
            onClick={() => setOpen(false)}
          >
            <MapPin className="h-5 w-5" />
            Register Property
          </Link>
          <Link
            href="#"
            className="flex items-center gap-2 text-base font-medium py-2 px-3 rounded-md hover:bg-muted transition-colors"
            onClick={() => setOpen(false)}
          >
            <Info className="h-5 w-5" />
            About
          </Link>
          <div className="mt-4 space-y-2">
            <Button className="w-full" asChild>
              <Link href="/login" onClick={() => setOpen(false)}>
                <User className="mr-2 h-5 w-5" />
                Login
              </Link>
            </Button>
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700"
              asChild
            >
              <Link href="/register-property" onClick={() => setOpen(false)}>
                <MapPin className="mr-2 h-5 w-5" />
                Register Property
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
