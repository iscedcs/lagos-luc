"use client"

import { useState } from "react"
import { Trash2, AlertTriangle, Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { softDeleteProperty, deleteProperty } from "@/actions/properties"

interface DeletePropertyDialogProps {
  propertyId: string
  propertyCode: string
}

export default function DeletePropertyDialog({ propertyId, propertyCode }: DeletePropertyDialogProps) {
  const router = useRouter()
  const [isArchiving, setIsArchiving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [deleteStep, setDeleteStep] = useState<"action" | "archive" | "delete">("action")

  const handleSoftDelete = async () => {
    setIsArchiving(true)
    try {
      const result = await softDeleteProperty(propertyId)
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Property archived successfully",
        })
        // Redirect back to properties list
        router.push("/properties")
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to archive property",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to archive property",
        variant: "destructive",
      })
    } finally {
      setIsArchiving(false)
      setDeleteStep("action")
    }
  }

  const handleHardDelete = async () => {
    setIsDeleting(true)
    try {
      const result = await deleteProperty(propertyId)
      
      if (result.success) {
        toast({
          title: "Success",
          description: "Property permanently deleted",
        })
        // Redirect back to properties list
        router.push("/properties")
        router.refresh()
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to delete property",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to delete property",
        variant: "destructive",
      })
    } finally {
      setIsDeleting(false)
      setDeleteStep("action")
    }
  }

  return (
    <AlertDialog open={deleteStep !== "action"} onOpenChange={(open) => !open && setDeleteStep("action")}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </AlertDialogTrigger>

      {/* First dialog - Choose action */}
      {deleteStep === "action" && (
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
              Delete Property
            </AlertDialogTitle>
            <AlertDialogDescription>
              What would you like to do with property <strong>{propertyCode}</strong>?
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="space-y-3 py-4">
            <Button
              onClick={() => setDeleteStep("archive")}
              variant="outline"
              className="w-full justify-start text-left"
            >
              <div className="space-y-1 text-sm">
                <div className="font-medium">Archive Property</div>
                <div className="text-xs text-muted-foreground">
                  Soft delete - property will be hidden but data is preserved
                </div>
              </div>
            </Button>

            <Button
              onClick={() => setDeleteStep("delete")}
              variant="outline"
              className="w-full justify-start text-left text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <div className="space-y-1 text-sm">
                <div className="font-medium">Permanently Delete</div>
                <div className="text-xs text-muted-foreground">
                  Hard delete - property cannot be recovered
                </div>
              </div>
            </Button>
          </div>

          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogContent>
      )}

      {/* Archive confirmation dialog */}
      {deleteStep === "archive" && (
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Archive Property?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Property <strong>{propertyCode}</strong> will be archived. You can restore it later.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
            <strong>This action:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Hides the property from active listings</li>
              <li>Preserves all property data</li>
              <li>Can be reversed anytime</li>
            </ul>
          </div>

          <div className="flex gap-2 justify-end">
            <AlertDialogCancel onClick={() => setDeleteStep("action")}>Go Back</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSoftDelete}
              disabled={isArchiving}
              className="bg-yellow-600 hover:bg-yellow-700"
            >
              {isArchiving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Archive
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      )}

      {/* Hard delete confirmation dialog */}
      {deleteStep === "delete" && (
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Permanently Delete Property?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Property <strong>{propertyCode}</strong> will be permanently deleted. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-800">
            <strong>Warning - This will:</strong>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Permanently remove all property data</li>
              <li>Delete associated documents and history</li>
              <li>Cannot be recovered or restored</li>
            </ul>
          </div>

          <div className="flex gap-2 justify-end">
            <AlertDialogCancel onClick={() => setDeleteStep("action")}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleHardDelete}
              disabled={isDeleting}
              className="bg-red-600 hover:bg-red-700"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Permanently Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      )}
    </AlertDialog>
  )
}
