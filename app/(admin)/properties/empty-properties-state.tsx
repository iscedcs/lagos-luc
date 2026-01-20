"use client"

import Link from "next/link"
import { Building, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function EmptyPropertiesState() {
  return (
    <Card className="border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-12">
        <div className="rounded-full bg-muted p-3 mb-4">
          <Building className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold mb-2">No Properties Found</h3>
        <p className="text-muted-foreground text-center mb-6 max-w-sm">
          There are no properties in the system yet. Get started by adding your first property.
        </p>
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          asChild
        >
          <Link href="/register-property" className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add Your First Property
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
