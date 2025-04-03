import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import NotificationList from "./notification-list"
import NotificationTemplates from "./notification-templates"
import NotificationSettings from "./notification-settings"
import SendNotification from "./send-notification"

export const metadata = {
  title: "Notification Center | Lagos Property Map",
  description: "Manage system notifications and communication templates",
}

export default function NotificationCenterPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Notification Center</h1>
        <p className="text-muted-foreground mt-2">Manage system notifications, templates, and communication settings</p>
      </div>

      <Tabs defaultValue="notifications" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="send">Send Notification</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification History</CardTitle>
              <CardDescription>View and manage all system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Templates</CardTitle>
              <CardDescription>Manage templates for different notification types</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationTemplates />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="send" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Send Notification</CardTitle>
              <CardDescription>Create and send notifications to users</CardDescription>
            </CardHeader>
            <CardContent>
              <SendNotification />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure notification delivery methods and preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <NotificationSettings />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

