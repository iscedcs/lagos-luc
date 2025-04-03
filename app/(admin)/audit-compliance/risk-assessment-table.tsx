import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for risk assessment
const riskData = [
  {
    id: 1,
    category: "Data Security",
    risk: "Unauthorized Data Access",
    likelihood: "Medium",
    impact: "High",
    level: "High",
    mitigation: "Implement role-based access controls and regular security audits",
    owner: "Security Team",
    status: "In Progress",
  },
  {
    id: 2,
    category: "Compliance",
    risk: "Non-compliance with Tax Regulations",
    likelihood: "Medium",
    impact: "High",
    level: "High",
    mitigation: "Regular compliance reviews and staff training",
    owner: "Legal Department",
    status: "Ongoing",
  },
  {
    id: 3,
    category: "Operational",
    risk: "System Downtime",
    likelihood: "Low",
    impact: "High",
    level: "Medium",
    mitigation: "Implement redundant systems and disaster recovery plan",
    owner: "IT Operations",
    status: "Implemented",
  },
  {
    id: 4,
    category: "Financial",
    risk: "Revenue Leakage",
    likelihood: "Medium",
    impact: "High",
    level: "High",
    mitigation: "Regular audits and reconciliation of payment records",
    owner: "Finance Team",
    status: "Ongoing",
  },
  {
    id: 5,
    category: "Data Quality",
    risk: "Inaccurate Property Valuation",
    likelihood: "Medium",
    impact: "Medium",
    level: "Medium",
    mitigation: "Implement validation rules and periodic data quality checks",
    owner: "Data Management",
    status: "Planned",
  },
  {
    id: 6,
    category: "Operational",
    risk: "Staff Turnover",
    likelihood: "Medium",
    impact: "Medium",
    level: "Medium",
    mitigation: "Documentation of processes and cross-training of staff",
    owner: "HR Department",
    status: "In Progress",
  },
  {
    id: 7,
    category: "Technology",
    risk: "Outdated Technology",
    likelihood: "Low",
    impact: "Medium",
    level: "Low",
    mitigation: "Regular technology assessment and upgrade planning",
    owner: "IT Department",
    status: "Ongoing",
  },
  {
    id: 8,
    category: "Security",
    risk: "Cyber Attack",
    likelihood: "Low",
    impact: "Critical",
    level: "High",
    mitigation: "Security monitoring, penetration testing, and incident response plan",
    owner: "Security Team",
    status: "Implemented",
  },
]

export function RiskAssessmentTable() {
  // Function to get risk level badge color
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "Critical":
      case "High":
        return "bg-red-500 hover:bg-red-600"
      case "Medium":
        return "bg-yellow-500 hover:bg-yellow-600"
      case "Low":
      default:
        return "bg-green-500 hover:bg-green-600"
    }
  }

  // Function to get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Implemented":
        return "bg-green-500 hover:bg-green-600"
      case "In Progress":
        return "bg-blue-500 hover:bg-blue-600"
      case "Planned":
        return "bg-purple-500 hover:bg-purple-600"
      case "Ongoing":
      default:
        return "bg-yellow-500 hover:bg-yellow-600"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Category</TableHead>
            <TableHead>Risk</TableHead>
            <TableHead className="hidden md:table-cell">Likelihood</TableHead>
            <TableHead className="hidden md:table-cell">Impact</TableHead>
            <TableHead>Risk Level</TableHead>
            <TableHead className="hidden lg:table-cell">Mitigation Strategy</TableHead>
            <TableHead className="hidden md:table-cell">Owner</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {riskData.map((risk) => (
            <TableRow key={risk.id}>
              <TableCell>{risk.category}</TableCell>
              <TableCell>{risk.risk}</TableCell>
              <TableCell className="hidden md:table-cell">{risk.likelihood}</TableCell>
              <TableCell className="hidden md:table-cell">{risk.impact}</TableCell>
              <TableCell>
                <Badge className={getRiskLevelColor(risk.level)}>{risk.level}</Badge>
              </TableCell>
              <TableCell className="hidden lg:table-cell max-w-[300px] truncate">{risk.mitigation}</TableCell>
              <TableCell className="hidden md:table-cell">{risk.owner}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(risk.status)}>{risk.status}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

