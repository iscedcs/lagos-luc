import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { AlertTriangle, CheckCircle, FileText, XCircle } from "lucide-react"

interface ComplianceItem {
  name: string
  status: "compliant" | "at-risk" | "non-compliant"
}

interface ComplianceReportCardProps {
  title: string
  status: "compliant" | "at-risk" | "non-compliant"
  lastAudit: string
  nextAudit: string
  score: number
  items: ComplianceItem[]
}

export function ComplianceReportCard({ title, status, lastAudit, nextAudit, score, items }: ComplianceReportCardProps) {
  const getStatusBadge = () => {
    switch (status) {
      case "compliant":
        return <Badge className="bg-green-500 hover:bg-green-600">Compliant</Badge>
      case "at-risk":
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">At Risk</Badge>
      case "non-compliant":
        return <Badge className="bg-red-500 hover:bg-red-600">Non-Compliant</Badge>
    }
  }

  const getStatusIcon = (itemStatus: string) => {
    switch (itemStatus) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "at-risk":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "non-compliant":
        return <XCircle className="h-4 w-4 text-red-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{title}</CardTitle>
          {getStatusBadge()}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <div>
              <span className="text-muted-foreground">Last Audit:</span> {lastAudit}
            </div>
            <div>
              <span className="text-muted-foreground">Next Audit:</span> {nextAudit}
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">Compliance Score</span>
              <span className="text-sm font-medium">{score}%</span>
            </div>
            <Progress
              value={score}
              className={`h-2 ${score >= 90 ? "bg-green-500" : score >= 75 ? "bg-yellow-500" : "bg-red-500"}`}
            />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Compliance Items</h4>
            <ul className="space-y-1">
              {items.map((item, index) => (
                <li key={index} className="flex items-center gap-2 text-sm">
                  {getStatusIcon(item.status)}
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex justify-between pt-2">
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              View Report
            </Button>
            <Button variant="outline" size="sm">
              Action Plan
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

