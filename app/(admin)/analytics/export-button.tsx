"use client"

import { useState } from "react"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { exportAnalyticsToExcel } from "./actions"
import { useToast } from "@/components/ui/use-toast"

interface ExportButtonProps {
  startDate?: string
  endDate?: string
}

export default function ExportButton({ startDate, endDate }: ExportButtonProps) {
  const [isExporting, setIsExporting] = useState(false)
  const { toast } = useToast()

  const handleExport = async () => {
    try {
      setIsExporting(true)
      const result = await exportAnalyticsToExcel(startDate, endDate)

      if (result.success && result.data) {
        // Create a download link
        const link = document.createElement("a")
        link.href = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${result.data}`
        link.download = result.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        toast({
          title: "Export Successful",
          description: "Analytics report has been downloaded",
          variant: "default",
        })
      } else {
        throw new Error(result.error || "Export failed")
      }
    } catch (error) {
      console.error("Error exporting:", error)
      toast({
        title: "Export Failed",
        description: "There was an error generating the report",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Button variant="outline" size="sm" className="h-9" onClick={handleExport} disabled={isExporting}>
      <Download className="mr-2 h-4 w-4" />
      {isExporting ? "Exporting..." : "Export Report"}
    </Button>
  )
}

