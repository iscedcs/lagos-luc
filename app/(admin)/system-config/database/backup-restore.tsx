"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Download, Upload, RotateCw, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type Backup = {
  id: string
  name: string
  date: string
  size: string
  type: string
  status: string
}

export default function BackupRestore() {
  const [isCreatingBackup, setIsCreatingBackup] = useState(false)
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false)
  const [selectedBackupId, setSelectedBackupId] = useState<string | null>(null)
  const [backupType, setBackupType] = useState("full")
  const [backupName, setBackupName] = useState("")

  const [backups, setBackups] = useState<Backup[]>([
    {
      id: "1",
      name: "Daily Automated Backup",
      date: "April 2, 2025 02:00 AM",
      size: "1.2 GB",
      type: "Full",
      status: "Completed",
    },
    {
      id: "2",
      name: "Pre-Update Backup",
      date: "April 1, 2025 10:15 AM",
      size: "1.2 GB",
      type: "Full",
      status: "Completed",
    },
    {
      id: "3",
      name: "Weekly Backup",
      date: "March 30, 2025 01:00 AM",
      size: "1.1 GB",
      type: "Full",
      status: "Completed",
    },
    {
      id: "4",
      name: "Property Data Only",
      date: "March 28, 2025 03:45 PM",
      size: "450 MB",
      type: "Partial",
      status: "Completed",
    },
    {
      id: "5",
      name: "User Data Only",
      date: "March 25, 2025 11:30 AM",
      size: "120 MB",
      type: "Partial",
      status: "Completed",
    },
  ])

  const createBackup = () => {
    setIsCreatingBackup(true)
    // Simulate backup creation
    setTimeout(() => {
      const newBackup: Backup = {
        id: (backups.length + 1).toString(),
        name: backupName || `Manual Backup ${new Date().toLocaleString()}`,
        date: new Date().toLocaleString(),
        size: "1.2 GB",
        type: backupType === "full" ? "Full" : "Partial",
        status: "Completed",
      }

      setBackups([newBackup, ...backups])
      setIsCreatingBackup(false)
      setBackupName("")
    }, 3000)
  }

  const downloadBackup = (id: string) => {
    // Simulate download
    console.log(`Downloading backup ${id}`)
  }

  const initiateRestore = () => {
    // Simulate restore
    console.log(`Restoring from backup ${selectedBackupId}`)
    setIsRestoreDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <Alert>
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Important</AlertTitle>
        <AlertDescription>
          Creating a backup or restoring from a backup may temporarily affect system performance. Schedule these
          operations during off-peak hours when possible.
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Create Backup</h3>

          <div className="space-y-2">
            <Label htmlFor="backup-name">Backup Name (Optional)</Label>
            <Input
              id="backup-name"
              placeholder="e.g., Pre-Update Backup"
              value={backupName}
              onChange={(e) => setBackupName(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="backup-type">Backup Type</Label>
            <Select value={backupType} onValueChange={setBackupType}>
              <SelectTrigger id="backup-type">
                <SelectValue placeholder="Select backup type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="full">Full Backup</SelectItem>
                <SelectItem value="properties">Properties Only</SelectItem>
                <SelectItem value="users">Users Only</SelectItem>
                <SelectItem value="payments">Payments Only</SelectItem>
                <SelectItem value="documents">Documents Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="compress" />
              <Label htmlFor="compress">Compress Backup</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="encrypt" />
              <Label htmlFor="encrypt">Encrypt Backup</Label>
            </div>
          </div>

          <Button onClick={createBackup} disabled={isCreatingBackup} className="w-full">
            {isCreatingBackup ? (
              <>
                <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                Creating Backup...
              </>
            ) : (
              <>
                <Download className="mr-2 h-4 w-4" />
                Create Backup
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Restore from File</h3>

          <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center">
            <Upload className="h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Drag and drop a backup file, or click to browse</p>
            <Button variant="outline" size="sm">
              Browse Files
            </Button>
            <p className="text-xs text-muted-foreground mt-4">Supported formats: .sql, .dump, .bak, .zip</p>
          </div>

          <Dialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Confirm Database Restore</DialogTitle>
                <DialogDescription>
                  This action will replace your current database with the selected backup. This cannot be undone. Are
                  you sure you want to proceed?
                </DialogDescription>
              </DialogHeader>
              <Alert variant="destructive" className="mt-2">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Warning</AlertTitle>
                <AlertDescription>All current data will be overwritten by the backup data.</AlertDescription>
              </Alert>
              <DialogFooter className="mt-4">
                <Button variant="outline" onClick={() => setIsRestoreDialogOpen(false)}>
                  Cancel
                </Button>
                <Button variant="destructive" onClick={initiateRestore}>
                  Yes, Restore Database
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Backup History</h3>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {backups.map((backup) => (
                <TableRow key={backup.id}>
                  <TableCell className="font-medium">{backup.name}</TableCell>
                  <TableCell>{backup.date}</TableCell>
                  <TableCell>{backup.size}</TableCell>
                  <TableCell>{backup.type}</TableCell>
                  <TableCell>{backup.status}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => downloadBackup(backup.id)}>
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setSelectedBackupId(backup.id)
                          setIsRestoreDialogOpen(true)
                        }}
                      >
                        <RotateCw className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

