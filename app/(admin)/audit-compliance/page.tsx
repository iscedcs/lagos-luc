"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "./date-range-picker";
import { AuditLogTable } from "./audit-log-table";
import { UserActivityChart } from "./user-activity-chart";
import { ComplianceScorecard } from "./compliance-scorecard";
import { ComplianceReportCard } from "./compliance-report-card";
import { RiskAssessmentTable } from "./risk-assessment-table";

export default function AuditCompliancePage() {
  const [dateRange, setDateRange] = useState<
    { from: Date; to: Date } | undefined
  >({
    from: new Date(new Date().setDate(new Date().getDate() - 30)),
    to: new Date(),
  });

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Audit & Compliance
          </h1>
          <p className="text-muted-foreground">
            Monitor system activities, user actions, and regulatory compliance
          </p>
        </div>
        {/* @ts-expect-error: undefined issue */}
        <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
      </div>

      <ComplianceScorecard />

      <Tabs defaultValue="system-logs" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-fit">
          <TabsTrigger value="system-logs">System Logs</TabsTrigger>
          <TabsTrigger value="user-activity">User Activity</TabsTrigger>
          <TabsTrigger value="compliance-reports">
            Compliance Reports
          </TabsTrigger>
          <TabsTrigger value="risk-assessment">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="system-logs" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Audit Logs</CardTitle>
              <CardDescription>
                Comprehensive log of all system events and activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogTable dateRange={dateRange} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user-activity" className="mt-6">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>User Activity Overview</CardTitle>
              <CardDescription>
                Visualization of user actions over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserActivityChart dateRange={dateRange} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Activity Logs</CardTitle>
              <CardDescription>
                Detailed record of user actions and login events
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AuditLogTable dateRange={dateRange} userActivityOnly />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance-reports" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ComplianceReportCard
              title="Data Protection Compliance"
              status="compliant"
              lastAudit="2023-12-15"
              nextAudit="2024-06-15"
              score={92}
              items={[
                { name: "Data Encryption", status: "compliant" },
                { name: "Access Controls", status: "compliant" },
                { name: "Data Retention", status: "at-risk" },
                { name: "User Consent", status: "compliant" },
              ]}
            />

            <ComplianceReportCard
              title="Tax Regulation Compliance"
              status="at-risk"
              lastAudit="2023-11-10"
              nextAudit="2024-05-10"
              score={78}
              items={[
                { name: "Rate Calculation", status: "compliant" },
                { name: "Exemption Handling", status: "at-risk" },
                { name: "Payment Processing", status: "compliant" },
                { name: "Reporting", status: "at-risk" },
              ]}
            />

            <ComplianceReportCard
              title="System Security Compliance"
              status="compliant"
              lastAudit="2024-01-05"
              nextAudit="2024-07-05"
              score={95}
              items={[
                { name: "Authentication", status: "compliant" },
                { name: "Authorization", status: "compliant" },
                { name: "Vulnerability Scanning", status: "compliant" },
                { name: "Incident Response", status: "compliant" },
              ]}
            />

            <ComplianceReportCard
              title="Property Valuation Compliance"
              status="non-compliant"
              lastAudit="2023-10-20"
              nextAudit="2024-04-20"
              score={65}
              items={[
                { name: "Valuation Methods", status: "at-risk" },
                { name: "Documentation", status: "non-compliant" },
                { name: "Appeals Process", status: "at-risk" },
                { name: "Reassessment Timing", status: "compliant" },
              ]}
            />
          </div>
        </TabsContent>

        <TabsContent value="risk-assessment" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment Matrix</CardTitle>
              <CardDescription>
                Evaluation of potential risks and mitigation strategies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RiskAssessmentTable />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
