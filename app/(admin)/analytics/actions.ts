"use server"

import * as XLSX from "xlsx"

// Mock data for property values by zone
const propertyValueData = [
  { zone: "Ikoyi", residential: 120000000, commercial: 180000000, industrial: 150000000 },
  { zone: "Victoria Island", residential: 100000000, commercial: 160000000, industrial: 130000000 },
  { zone: "Lekki Phase 1", residential: 85000000, commercial: 120000000, industrial: 100000000 },
  { zone: "Ajah", residential: 45000000, commercial: 70000000, industrial: 60000000 },
  { zone: "Ikeja", residential: 60000000, commercial: 90000000, industrial: 75000000 },
  { zone: "Yaba", residential: 50000000, commercial: 75000000, industrial: 65000000 },
  { zone: "Surulere", residential: 40000000, commercial: 60000000, industrial: 50000000 },
  { zone: "Gbagada", residential: 35000000, commercial: 55000000, industrial: 45000000 },
]

// Mock data for property type distribution
const propertyTypeData = [
  { type: "Residential", count: 6500, percentage: "65%" },
  { type: "Commercial", count: 2500, percentage: "25%" },
  { type: "Industrial", count: 700, percentage: "7%" },
  { type: "Mixed Use", count: 300, percentage: "3%" },
]

// Mock data for property registration trends
const registrationTrendData = [
  { month: "Jan", registrations: 120 },
  { month: "Feb", registrations: 145 },
  { month: "Mar", registrations: 160 },
  { month: "Apr", registrations: 190 },
  { month: "May", registrations: 210 },
  { month: "Jun", registrations: 220 },
  { month: "Jul", registrations: 240 },
  { month: "Aug", registrations: 280 },
  { month: "Sep", registrations: 250 },
  { month: "Oct", registrations: 290 },
  { month: "Nov", registrations: 310 },
  { month: "Dec", registrations: 340 },
]

// Mock data for compliance rates by zone
const complianceRateData = [
  { zone: "Ikoyi", compliance: "92%" },
  { zone: "Victoria Island", compliance: "88%" },
  { zone: "Lekki Phase 1", compliance: "85%" },
  { zone: "Ajah", compliance: "76%" },
  { zone: "Ikeja", compliance: "82%" },
  { zone: "Yaba", compliance: "79%" },
  { zone: "Surulere", compliance: "74%" },
  { zone: "Gbagada", compliance: "71%" },
]

export async function exportAnalyticsToExcel(startDate?: string, endDate?: string) {
  try {
    // Format the date range for the filename
    const dateRange = startDate && endDate ? `${startDate.split("T")[0]}_to_${endDate.split("T")[0]}` : "all_time"

    // Create a new workbook
    const workbook = XLSX.utils.book_new()

    // Add property values sheet
    const propertyValueSheet = XLSX.utils.json_to_sheet(
      propertyValueData.map((item) => ({
        Zone: item.zone,
        "Residential (₦)": item.residential.toLocaleString(),
        "Commercial (₦)": item.commercial.toLocaleString(),
        "Industrial (₦)": item.industrial.toLocaleString(),
        "Average (₦)": ((item.residential + item.commercial + item.industrial) / 3).toLocaleString(),
      })),
    )
    XLSX.utils.book_append_sheet(workbook, propertyValueSheet, "Property Values")

    // Add property type distribution sheet
    const propertyTypeSheet = XLSX.utils.json_to_sheet(propertyTypeData)
    XLSX.utils.book_append_sheet(workbook, propertyTypeSheet, "Property Types")

    // Add registration trends sheet
    const registrationTrendSheet = XLSX.utils.json_to_sheet(registrationTrendData)
    XLSX.utils.book_append_sheet(workbook, registrationTrendSheet, "Registration Trends")

    // Add compliance rates sheet
    const complianceRateSheet = XLSX.utils.json_to_sheet(complianceRateData)
    XLSX.utils.book_append_sheet(workbook, complianceRateSheet, "Compliance Rates")

    // Generate summary sheet
    const summaryData = [
      { Metric: "Total Properties", Value: "10,000" },
      { Metric: "Average Property Value", Value: "₦45,750,000" },
      { Metric: "Total LUC Revenue", Value: "₦1,250,000,000" },
      { Metric: "Property Growth Rate", Value: "8.7%" },
      { Metric: "Overall Compliance Rate", Value: "83.2%" },
      { Metric: "Report Generated", Value: new Date().toLocaleString() },
      {
        Metric: "Date Range",
        Value:
          startDate && endDate
            ? `${new Date(startDate).toLocaleDateString()} to ${new Date(endDate).toLocaleDateString()}`
            : "All Time",
      },
    ]
    const summarySheet = XLSX.utils.json_to_sheet(summaryData)
    XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary")

    // Write the workbook to a buffer
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" })

    // Convert buffer to base64 for client-side download
    const base64 = Buffer.from(excelBuffer).toString("base64")

    return {
      success: true,
      data: base64,
      filename: `property_analytics_${dateRange}.xlsx`,
    }
  } catch (error) {
    console.error("Error exporting analytics to Excel:", error)
    return {
      success: false,
      error: "Failed to generate Excel report",
    }
  }
}

