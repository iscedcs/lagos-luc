import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { FileText, User, CheckCircle, Clock, DollarSign, FileCheck, Edit, AlertTriangle } from "lucide-react"

interface PropertyActivityLogProps {
  property: any
}

export default function PropertyActivityLog({ property }: PropertyActivityLogProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Log</CardTitle>
        <CardDescription>History of all activities related to this property</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-4 p-4 before:absolute before:inset-y-0 before:left-[16px] before:border-l-2 before:border-dashed before:border-muted">
          {property.activityLog.map((activity: any) => (
            <ActivityItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface ActivityItemProps {
  activity: any
}

function ActivityItem({ activity }: ActivityItemProps) {
  // Get icon based on activity action
  const getActivityIcon = (action: string) => {
    switch (action) {
      case "Property Registered":
        return <FileText className="h-4 w-4" />
      case "Documents Uploaded":
        return <FileText className="h-4 w-4" />
      case "Verification Started":
        return <Clock className="h-4 w-4" />
      case "Property Verified":
        return <CheckCircle className="h-4 w-4" />
      case "Payment Received":
        return <DollarSign className="h-4 w-4" />
      case "Certificate Generated":
        return <FileCheck className="h-4 w-4" />
      case "Property Updated":
        return <Edit className="h-4 w-4" />
      default:
        return <AlertTriangle className="h-4 w-4" />
    }
  }

  // Get badge color based on activity action
  const getBadgeClass = (action: string) => {
    if (action.includes("Verified") || action.includes("Payment") || action.includes("Certificate")) {
      return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
    } else if (action.includes("Started") || action.includes("Uploaded")) {
      return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
    } else if (action.includes("Registered") || action.includes("Updated")) {
      return "bg-blue-100 text-blue-800 hover:bg-blue-200"
    } else {
      return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="relative flex gap-4 pl-8">
      <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full bg-background">
        <div className={`flex h-6 w-6 items-center justify-center rounded-full ${getBadgeClass(activity.action)}`}>
          {getActivityIcon(activity.action)}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <p className="font-medium">{activity.action}</p>
          <Badge variant="outline">{new Date(activity.date).toLocaleDateString()}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{activity.details}</p>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <User className="h-3 w-3" />
          <span>{activity.user}</span>
        </div>
      </div>
    </div>
  )
}

