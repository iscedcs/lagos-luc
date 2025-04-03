import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import SystemInfo from "./system-info"
import AppearanceSettings from "./appearance-settings"
import LocalizationSettings from "./localization-settings"

export const metadata = {
  title: "General Settings | Lagos Property Map",
  description: "Configure general system settings and preferences",
}

export default function GeneralSettingsPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">General Settings</h1>
        <p className="text-muted-foreground mt-2">Configure system-wide settings and preferences</p>
      </div>

      <Tabs defaultValue="system-info" className="w-full">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="system-info">System Info</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="localization">Localization</TabsTrigger>
        </TabsList>

        <TabsContent value="system-info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Information</CardTitle>
              <CardDescription>View system version, environment details, and license information</CardDescription>
            </CardHeader>
            <CardContent>
              <SystemInfo />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>Customize the system's look and feel</CardDescription>
            </CardHeader>
            <CardContent>
              <AppearanceSettings />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="localization" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Localization Settings</CardTitle>
              <CardDescription>Configure language, date/time formats, and regional preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <LocalizationSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

