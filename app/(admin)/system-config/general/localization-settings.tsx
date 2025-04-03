"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export default function LocalizationSettings() {
  const [language, setLanguage] = useState("en-NG")
  const [dateFormat, setDateFormat] = useState("DD/MM/YYYY")
  const [timeFormat, setTimeFormat] = useState("12h")
  const [timezone, setTimezone] = useState("Africa/Lagos")
  const [currency, setCurrency] = useState("NGN")
  const [currencySymbol, setCurrencySymbol] = useState("₦")
  const [currencyPosition, setCurrencyPosition] = useState("before")
  const [decimalSeparator, setDecimalSeparator] = useState(".")
  const [thousandsSeparator, setThousandsSeparator] = useState(",")
  const [autoDetect, setAutoDetect] = useState(true)
  const [state, setState] = useState("lagos")

  const handleSave = () => {
    // Save localization settings
    console.log({
      language,
      dateFormat,
      timeFormat,
      timezone,
      currency,
      currencySymbol,
      currencyPosition,
      decimalSeparator,
      thousandsSeparator,
      autoDetect,
      state,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="auto-detect">Auto-detect Localization</Label>
          <p className="text-sm text-muted-foreground">
            Automatically detect and apply localization settings based on user's browser
          </p>
        </div>
        <Switch id="auto-detect" checked={autoDetect} onCheckedChange={setAutoDetect} />
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="date-time">Date & Time</TabsTrigger>
          <TabsTrigger value="numbers">Numbers & Currency</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="language">Default Language</Label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger id="language">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-NG">English (Nigeria)</SelectItem>
                <SelectItem value="en-US">English (United States)</SelectItem>
                <SelectItem value="en-GB">English (United Kingdom)</SelectItem>
                <SelectItem value="fr-FR">French</SelectItem>
                <SelectItem value="yo-NG">Yoruba</SelectItem>
                <SelectItem value="ha-NG">Hausa</SelectItem>
                <SelectItem value="ig-NG">Igbo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">State/Region</Label>
            <Select value={state} onValueChange={setState}>
              <SelectTrigger id="state">
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lagos">Lagos</SelectItem>
                <SelectItem value="abuja">Abuja</SelectItem>
                <SelectItem value="kano">Kano</SelectItem>
                <SelectItem value="rivers">Rivers</SelectItem>
                <SelectItem value="oyo">Oyo</SelectItem>
                <SelectItem value="kaduna">Kaduna</SelectItem>
                <SelectItem value="anambra">Anambra</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-sm text-muted-foreground">
              Changing the state will update tax rates, zoning rules, and valuation parameters
            </p>
          </div>
        </TabsContent>

        <TabsContent value="date-time" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="date-format">Date Format</Label>
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger id="date-format">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="DD/MM/YYYY">DD/MM/YYYY (31/12/2023)</SelectItem>
                <SelectItem value="MM/DD/YYYY">MM/DD/YYYY (12/31/2023)</SelectItem>
                <SelectItem value="YYYY-MM-DD">YYYY-MM-DD (2023-12-31)</SelectItem>
                <SelectItem value="DD-MMM-YYYY">DD-MMM-YYYY (31-Dec-2023)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time-format">Time Format</Label>
            <Select value={timeFormat} onValueChange={setTimeFormat}>
              <SelectTrigger id="time-format">
                <SelectValue placeholder="Select time format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12h">12-hour (2:30 PM)</SelectItem>
                <SelectItem value="24h">24-hour (14:30)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="timezone">Timezone</Label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger id="timezone">
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Africa/Lagos">Africa/Lagos (GMT+1)</SelectItem>
                <SelectItem value="Europe/London">Europe/London (GMT+0/+1)</SelectItem>
                <SelectItem value="America/New_York">America/New_York (GMT-5/-4)</SelectItem>
                <SelectItem value="Asia/Dubai">Asia/Dubai (GMT+4)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="numbers" className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="currency">Currency</Label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger id="currency">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NGN">Nigerian Naira (NGN)</SelectItem>
                <SelectItem value="USD">US Dollar (USD)</SelectItem>
                <SelectItem value="EUR">Euro (EUR)</SelectItem>
                <SelectItem value="GBP">British Pound (GBP)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency-symbol">Currency Symbol</Label>
            <Input
              id="currency-symbol"
              value={currencySymbol}
              onChange={(e) => setCurrencySymbol(e.target.value)}
              maxLength={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="currency-position">Currency Symbol Position</Label>
            <Select value={currencyPosition} onValueChange={setCurrencyPosition}>
              <SelectTrigger id="currency-position">
                <SelectValue placeholder="Select position" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="before">Before amount (₦1,000.00)</SelectItem>
                <SelectItem value="after">After amount (1,000.00₦)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="decimal-separator">Decimal Separator</Label>
              <Select value={decimalSeparator} onValueChange={setDecimalSeparator}>
                <SelectTrigger id="decimal-separator">
                  <SelectValue placeholder="Select separator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=".">Period (.)</SelectItem>
                  <SelectItem value=",">Comma (,)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thousands-separator">Thousands Separator</Label>
              <Select value={thousandsSeparator} onValueChange={setThousandsSeparator}>
                <SelectTrigger id="thousands-separator">
                  <SelectValue placeholder="Select separator" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=",">Comma (,)</SelectItem>
                  <SelectItem value=".">Period (.)</SelectItem>
                  <SelectItem value=" ">Space ( )</SelectItem>
                  <SelectItem value="none">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSave}>Save Changes</Button>
    </div>
  )
}

