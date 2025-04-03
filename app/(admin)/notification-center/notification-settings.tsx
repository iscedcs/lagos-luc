"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function NotificationSettings() {
  const [emailSettings, setEmailSettings] = useState({
    enabled: true,
    smtpServer: "smtp.lagospm.gov.ng",
    smtpPort: "587",
    smtpUsername: "notifications@lagospm.gov.ng",
    smtpPassword: "••••••••••••",
    senderName: "Lagos Property Map",
    senderEmail: "notifications@lagospm.gov.ng",
    maxRetries: 3,
    batchSize: 50,
  })

  const [smsSettings, setSmsSettings] = useState({
    enabled: true,
    provider: "twilio",
    apiKey: "••••••••••••••••••••••••••••••••",
    senderId: "LagosPM",
    maxLength: 160,
    maxRetries: 2,
  })

  const [pushSettings, setPushSettings] = useState({
    enabled: false,
    provider: "firebase",
    apiKey: "",
    projectId: "",
    appId: "",
  })

  const [generalSettings, setGeneralSettings] = useState({
    dailyLimit: 1000,
    throttleRate: 5, // per second
    logRetention: 30, // days
    defaultChannel: "email",
    sendWelcomeMessage: true,
    sendPaymentConfirmation: true,
    sendPaymentReminder: true,
    sendDocumentVerification: true,
    sendPropertyInspection: true,
  })

  const updateEmailSetting = (key: keyof typeof emailSettings, value: any) => {
    setEmailSettings((prev) => ({ ...prev, [key]: value }))
  }

  const updateSmsSetting = (key: keyof typeof smsSettings, value: any) => {
    setSmsSettings((prev) => ({ ...prev, [key]: value }))
  }

  const updatePushSetting = (key: keyof typeof pushSettings, value: any) => {
    setPushSettings((prev) => ({ ...prev, [key]: value }))
  }

  const updateGeneralSetting = (key: keyof typeof generalSettings, value: any) => {
    setGeneralSettings((prev) => ({ ...prev, [key]: value }))
  }

  const saveSettings = () => {
    // Save notification settings
    console.log({
      emailSettings,
      smsSettings,
      pushSettings,
      generalSettings,
    })
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="push">Push</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-6 pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="daily-limit">Daily Notification Limit</Label>
                    <Input
                      id="daily-limit"
                      type="number"
                      value={generalSettings.dailyLimit}
                      onChange={(e) => updateGeneralSetting("dailyLimit", Number.parseInt(e.target.value))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="log-retention">Log Retention (Days)</Label>
                    <Input
                      id="log-retention"
                      type="number"
                      value={generalSettings.logRetention}
                      onChange={(e) => updateGeneralSetting("logRetention", Number.parseInt(e.target.value))}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="throttle-rate">Throttle Rate (notifications per second)</Label>
                  <Slider
                    id="throttle-rate"
                    min={1}
                    max={20}
                    step={1}
                    value={[generalSettings.throttleRate]}
                    onValueChange={(value) => updateGeneralSetting("throttleRate", value[0])}
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="default-channel">Default Notification Channel</Label>
                  <Select
                    value={generalSettings.defaultChannel}
                    onValueChange={(value) => updateGeneralSetting("defaultChannel", value)}
                  >
                    <SelectTrigger id="default-channel">
                      <SelectValue placeholder="Select default channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="push">Push Notification</SelectItem>
                      <SelectItem value="in-app">In-App Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="text-lg font-medium mb-4">Notification Types</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor="welcome-message">Welcome Message</Label>
                  <Switch
                    id="welcome-message"
                    checked={generalSettings.sendWelcomeMessage}
                    onCheckedChange={(checked) => updateGeneralSetting("sendWelcomeMessage", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="payment-confirmation">Payment Confirmation</Label>
                  <Switch
                    id="payment-confirmation"
                    checked={generalSettings.sendPaymentConfirmation}
                    onCheckedChange={(checked) => updateGeneralSetting("sendPaymentConfirmation", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="payment-reminder">Payment Reminder</Label>
                  <Switch
                    id="payment-reminder"
                    checked={generalSettings.sendPaymentReminder}
                    onCheckedChange={(checked) => updateGeneralSetting("sendPaymentReminder", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="document-verification">Document Verification</Label>
                  <Switch
                    id="document-verification"
                    checked={generalSettings.sendDocumentVerification}
                    onCheckedChange={(checked) => updateGeneralSetting("sendDocumentVerification", checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="property-inspection">Property Inspection</Label>
                  <Switch
                    id="property-inspection"
                    checked={generalSettings.sendPropertyInspection}
                    onCheckedChange={(checked) => updateGeneralSetting("sendPropertyInspection", checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="email" className="space-y-6 pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <Label htmlFor="email-enabled">Enable Email Notifications</Label>
                <Switch
                  id="email-enabled"
                  checked={emailSettings.enabled}
                  onCheckedChange={(checked) => updateEmailSetting("enabled", checked)}
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-server">SMTP Server</Label>
                    <Input
                      id="smtp-server"
                      value={emailSettings.smtpServer}
                      onChange={(e) => updateEmailSetting("smtpServer", e.target.value)}
                      disabled={!emailSettings.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-port">SMTP Port</Label>
                    <Input
                      id="smtp-port"
                      value={emailSettings.smtpPort}
                      onChange={(e) => updateEmailSetting("smtpPort", e.target.value)}
                      disabled={!emailSettings.enabled}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="smtp-username">SMTP Username</Label>
                    <Input
                      id="smtp-username"
                      value={emailSettings.smtpUsername}
                      onChange={(e) => updateEmailSetting("smtpUsername", e.target.value)}
                      disabled={!emailSettings.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="smtp-password">SMTP Password</Label>
                    <Input
                      id="smtp-password"
                      type="password"
                      value={emailSettings.smtpPassword}
                      onChange={(e) => updateEmailSetting("smtpPassword", e.target.value)}
                      disabled={!emailSettings.enabled}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sender-name">Sender Name</Label>
                    <Input
                      id="sender-name"
                      value={emailSettings.senderName}
                      onChange={(e) => updateEmailSetting("senderName", e.target.value)}
                      disabled={!emailSettings.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sender-email">Sender Email</Label>
                    <Input
                      id="sender-email"
                      type="email"
                      value={emailSettings.senderEmail}
                      onChange={(e) => updateEmailSetting("senderEmail", e.target.value)}
                      disabled={!emailSettings.enabled}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-retries">Max Retries</Label>
                    <Input
                      id="max-retries"
                      type="number"
                      value={emailSettings.maxRetries}
                      onChange={(e) => updateEmailSetting("maxRetries", Number.parseInt(e.target.value))}
                      disabled={!emailSettings.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="batch-size">Batch Size</Label>
                    <Input
                      id="batch-size"
                      type="number"
                      value={emailSettings.batchSize}
                      onChange={(e) => updateEmailSetting("batchSize", Number.parseInt(e.target.value))}
                      disabled={!emailSettings.enabled}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sms" className="space-y-6 pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <Label htmlFor="sms-enabled">Enable SMS Notifications</Label>
                <Switch
                  id="sms-enabled"
                  checked={smsSettings.enabled}
                  onCheckedChange={(checked) => updateSmsSetting("enabled", checked)}
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sms-provider">SMS Provider</Label>
                  <Select
                    value={smsSettings.provider}
                    onValueChange={(value) => updateSmsSetting("provider", value)}
                    disabled={!smsSettings.enabled}
                  >
                    <SelectTrigger id="sms-provider">
                      <SelectValue placeholder="Select SMS provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="twilio">Twilio</SelectItem>
                      <SelectItem value="nexmo">Nexmo</SelectItem>
                      <SelectItem value="africastalking">Africa's Talking</SelectItem>
                      <SelectItem value="custom">Custom API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sms-api-key">API Key</Label>
                  <Input
                    id="sms-api-key"
                    type="password"
                    value={smsSettings.apiKey}
                    onChange={(e) => updateSmsSetting("apiKey", e.target.value)}
                    disabled={!smsSettings.enabled}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sms-sender-id">Sender ID</Label>
                    <Input
                      id="sms-sender-id"
                      value={smsSettings.senderId}
                      onChange={(e) => updateSmsSetting("senderId", e.target.value)}
                      disabled={!smsSettings.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sms-max-length">Max Message Length</Label>
                    <Input
                      id="sms-max-length"
                      type="number"
                      value={smsSettings.maxLength}
                      onChange={(e) => updateSmsSetting("maxLength", Number.parseInt(e.target.value))}
                      disabled={!smsSettings.enabled}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sms-max-retries">Max Retries</Label>
                  <Input
                    id="sms-max-retries"
                    type="number"
                    value={smsSettings.maxRetries}
                    onChange={(e) => updateSmsSetting("maxRetries", Number.parseInt(e.target.value))}
                    disabled={!smsSettings.enabled}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="push" className="space-y-6 pt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-6">
                <Label htmlFor="push-enabled">Enable Push Notifications</Label>
                <Switch
                  id="push-enabled"
                  checked={pushSettings.enabled}
                  onCheckedChange={(checked) => updatePushSetting("enabled", checked)}
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="push-provider">Push Provider</Label>
                  <Select
                    value={pushSettings.provider}
                    onValueChange={(value) => updatePushSetting("provider", value)}
                    disabled={!pushSettings.enabled}
                  >
                    <SelectTrigger id="push-provider">
                      <SelectValue placeholder="Select push provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="firebase">Firebase Cloud Messaging</SelectItem>
                      <SelectItem value="onesignal">OneSignal</SelectItem>
                      <SelectItem value="pusher">Pusher</SelectItem>
                      <SelectItem value="custom">Custom API</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="push-api-key">API Key</Label>
                  <Input
                    id="push-api-key"
                    type="password"
                    value={pushSettings.apiKey}
                    onChange={(e) => updatePushSetting("apiKey", e.target.value)}
                    disabled={!pushSettings.enabled}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="push-project-id">Project ID</Label>
                    <Input
                      id="push-project-id"
                      value={pushSettings.projectId}
                      onChange={(e) => updatePushSetting("projectId", e.target.value)}
                      disabled={!pushSettings.enabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="push-app-id">App ID</Label>
                    <Input
                      id="push-app-id"
                      value={pushSettings.appId}
                      onChange={(e) => updatePushSetting("appId", e.target.value)}
                      disabled={!pushSettings.enabled}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={saveSettings}>Save Settings</Button>
    </div>
  )
}

