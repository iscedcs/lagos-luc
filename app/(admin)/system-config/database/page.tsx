import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import DatabaseStatus from "./database-status"
import BackupRestore from "./backup-restore"
import DataMigration from "./data-migration"

export const metadata = {
  title: "Database Management | Lagos Property Map",
  description: "Manage database settings, backups, and migrations",
}

export default function DatabaseManagementPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Database Management</h1>
        <p className="text-muted-foreground mt-2">Manage database settings, backups, and data migrations</p>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Database Status</CardTitle>
            <CardDescription>View database connection status, performance metrics, and storage usage</CardDescription>
          </CardHeader>
          <CardContent>
            <DatabaseStatus />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup & Restore</CardTitle>
            <CardDescription>Create database backups and restore from previous backups</CardDescription>
          </CardHeader>
          <CardContent>
            <BackupRestore />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Migration</CardTitle>
            <CardDescription>Migrate data between environments or import external data</CardDescription>
          </CardHeader>
          <CardContent>
            <DataMigration />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

