"use client"

import { Badge } from "@/components/ui/badge"
import { Building, User, FileText, DollarSign, Settings, AlertTriangle } from "lucide-react"

// Mock data for recent activity
const recentActivities = [
  {
    id: 1,
    type: "property",
    action: "Property Registered",
    details: "New property in Lekki Phase 1",
    user: "Agent: John Doe",
    time: "10 minutes ago",
    icon: <Building className="h-4 w-4" />,
  },
  {
    id: 2,
    type: "payment",
    action: "Payment Received",
    details: "₦245,000 for LGS-123456",
    user: "Owner: Sarah Johnson",
    time: "25 minutes ago",
    icon: <DollarSign className="h-4 w-4" />,
  },
  {
    id: 3,
    type: "user",
    action: "New User Created",
    details: "LUC Agent account created",
    user: "Admin: Michael Chen",
    time: "1 hour ago",
    icon: <User className="h-4 w-4" />,
  },
  {
    id: 4,
    type: "report",
    action: "Report Generated",
    details: "Monthly compliance report",
    user: "System",
    time: "2 hours ago",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    id: 5,
    type: "system",
    action: "System Configuration Updated",
    details: "Valuation parameters modified",
    user: "Superadmin: David Adeyemi",
    time: "3 hours ago",
    icon: <Settings className="h-4 w-4" />,
  },
  {
    id: 6,
    type: "alert",
    action: "System Alert",
    details: "Payment gateway connection issue",
    user: "System",
    time: "4 hours ago",
    icon: <AlertTriangle className="h-4 w-4" />,
  },
]

export default function RecentActivityList() {
  // Function to get badge variant based on activity type
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "property":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
      case "payment":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "user":
        return "bg-purple-100 text-purple-800 hover:bg-purple-200"
      case "report":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200"
      case "system":
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
      case "alert":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="space-y-4">
      {recentActivities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3 py-2">
          <div className={`mt-0.5 rounded-full p-1.5 ${getBadgeVariant(activity.type)}`}>{activity.icon}</div>
          <div className="space-y-1">
            <div className="flex items-center">
              <p className="text-sm font-medium">{activity.action}</p>
              <Badge variant="outline" className="ml-2 text-xs">
                {activity.type}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">{activity.details}</p>
            <div className="flex items-center text-xs text-muted-foreground">
              <span>{activity.user}</span>
              <span className="mx-1">•</span>
              <span>{activity.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

