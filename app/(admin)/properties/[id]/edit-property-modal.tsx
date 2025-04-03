"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Edit } from "lucide-react"
import EditPropertyForm from "./edit-property-form"

interface EditPropertyModalProps {
  property: any
}

export default function EditPropertyModal({ property }: EditPropertyModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Edit className="mr-2 h-4 w-4" />
          Edit Property
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Property</DialogTitle>
          <DialogDescription>Update the details for property {property.propertyId}</DialogDescription>
        </DialogHeader>
        <EditPropertyForm property={property} onClose={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

