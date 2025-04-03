"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Building,
  ChevronDown,
  FileText,
  LayoutDashboard,
  LogOut,
  MapPin,
  Settings,
  Users,
  Wallet,
  Bell,
  FileCode,
  Database,
  ClipboardCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export default function AdminSidebar() {
  const pathname = usePathname();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({
    properties: false,
    users: false,
    reports: false,
    settings: false,
  });

  const toggleItem = (item: string) => {
    setOpenItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(path + "/");
  };

  return (
    <div className="hidden md:flex h-screen w-64 flex-col border-r bg-white">
      <div className="flex h-14 items-center border-b px-4">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-bold text-lg"
        >
          <MapPin className="h-5 w-5 text-emerald-600" />
          <span>LPM Admin</span>
        </Link>
      </div>
      <ScrollArea className="flex-1 px-2">
        <div className="space-y-1 py-2">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-emerald-50 text-emerald-700": isActive("/dashboard"),
              })}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          <Collapsible
            open={openItems.properties}
            onOpenChange={() => toggleItem("properties")}
            className="space-y-1"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                  <Building className="mr-2 h-4 w-4" />
                  Properties
                </span>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", {
                    "rotate-180": openItems.properties,
                  })}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pl-6">
              <Link href="/properties">
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", {
                    "bg-emerald-50 text-emerald-700": isActive("/properties"),
                  })}
                >
                  All Properties
                </Button>
              </Link>
              <Link href="/properties/verification">
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", {
                    "bg-emerald-50 text-emerald-700": isActive(
                      "/properties/verification"
                    ),
                  })}
                >
                  Verification Queue
                </Button>
              </Link>
              <Link href="/properties/disputes">
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", {
                    "bg-emerald-50 text-emerald-700": isActive(
                      "/properties/disputes"
                    ),
                  })}
                >
                  Disputed Properties
                </Button>
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Link href="/zones">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-emerald-50 text-emerald-700": isActive("/zones"),
              })}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Zone Management
            </Button>
          </Link>

          <Link href="/map-view">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-emerald-50 text-emerald-700": isActive("/map-view"),
              })}
            >
              <MapPin className="mr-2 h-4 w-4" />
              Map View
            </Button>
          </Link>

          <Link href="/users">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-emerald-50 text-emerald-700": isActive("/zones"),
              })}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
          </Link>

          <Link href="/payments">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-emerald-50 text-emerald-700": isActive("/payments"),
              })}
            >
              <Wallet className="mr-2 h-4 w-4" />
              Payments
            </Button>
          </Link>

          <Collapsible
            open={openItems.reports}
            onOpenChange={() => toggleItem("reports")}
            className="space-y-1"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Reports & Analytics
                </span>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", {
                    "rotate-180": openItems.reports,
                  })}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pl-6">
              <Link href="/reports/compliance">
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", {
                    "bg-emerald-50 text-emerald-700": isActive(
                      "/reports/compliance"
                    ),
                  })}
                >
                  Compliance Reports
                </Button>
              </Link>
              <Link href="/reports/revenue">
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", {
                    "bg-emerald-50 text-emerald-700":
                      isActive("/reports/revenue"),
                  })}
                >
                  Revenue Reports
                </Button>
              </Link>
              <Link href="/reports/custom">
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", {
                    "bg-emerald-50 text-emerald-700":
                      isActive("/reports/custom"),
                  })}
                >
                  Custom Reports
                </Button>
              </Link>
            </CollapsibleContent>
          </Collapsible>

          <Link href="/audit-compliance">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-emerald-50 text-emerald-700": isActive("/audit-compliance"),
              })}
            >
              <ClipboardCheck className="mr-2 h-4 w-4" />
              Audit & Compliance
            </Button>
          </Link>

          <Link href="/documents">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-emerald-50 text-emerald-700": isActive("/documents"),
              })}
            >
              <FileText className="mr-2 h-4 w-4" />
              Document Management
            </Button>
          </Link>

          <Link href="/notification-center">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-emerald-50 text-emerald-700": isActive(
                  "/notification-center"
                ),
              })}
            >
              <Bell className="mr-2 h-4 w-4" />
              Notification Center
            </Button>
          </Link>

          <Link href="/integrations">
            <Button
              variant="ghost"
              className={cn("w-full justify-start", {
                "bg-emerald-50 text-emerald-700": isActive("/integrations"),
              })}
            >
              <FileCode className="mr-2 h-4 w-4" />
              Integration Management
            </Button>
          </Link>

          <Collapsible
            open={openItems.settings}
            onOpenChange={() => toggleItem("settings")}
            className="space-y-1"
          >
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between">
                <span className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  System Configuration
                </span>
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform", {
                    "rotate-180": openItems.settings,
                  })}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1 pl-6">
              <Link href="/system-config/general">
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", {
                    "bg-emerald-50 text-emerald-700": isActive(
                      "/system-config/general"
                    ),
                  })}
                >
                  General Settings
                </Button>
              </Link>
              <Link href="/system-config/valuation">
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", {
                    "bg-emerald-50 text-emerald-700": isActive(
                      "/system-config/valuation"
                    ),
                  })}
                >
                  Valuation Parameters
                </Button>
              </Link>
              <Link href="/system-config/database">
                <Button
                  variant="ghost"
                  className={cn("w-full justify-start", {
                    "bg-emerald-50 text-emerald-700": isActive(
                      "/system-config/database"
                    ),
                  })}
                >
                  <Database className="mr-2 h-4 w-4" />
                  Database Management
                </Button>
              </Link>
            </CollapsibleContent>
          </Collapsible>
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <Button
          variant="outline"
          className="w-full justify-start text-red-600"
          asChild
        >
          <Link href="/login">
            <LogOut className="mr-2 h-4 w-4" />
            Log Out
          </Link>
        </Button>
      </div>
    </div>
  );
}
