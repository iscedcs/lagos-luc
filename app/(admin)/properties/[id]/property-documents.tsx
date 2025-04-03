import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FileText, Download, Eye, Upload, Check, Clock, AlertTriangle } from "lucide-react"

interface PropertyDocumentsProps {
  property: any
}

export default function PropertyDocuments({ property }: PropertyDocumentsProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Property Documents</CardTitle>
            <CardDescription>View and manage documents related to this property</CardDescription>
          </div>
          <Button size="sm">
            <Upload className="mr-2 h-4 w-4" />
            Upload New Document
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {property.documents.map((document: any) => (
            <DocumentItem key={document.id} document={document} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface DocumentItemProps {
  document: any
}

function DocumentItem({ document }: DocumentItemProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 border rounded-lg">
      <div className="flex items-start gap-3">
        <div className="rounded-md bg-gray-100 p-2">
          <FileText className="h-6 w-6 text-blue-600" />
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <p className="font-medium">{document.name}</p>
            <Badge
              className={
                document.status === "verified"
                  ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                  : document.status === "pending"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    : "bg-red-100 text-red-800 hover:bg-red-200"
              }
            >
              {document.status === "verified" ? (
                <Check className="mr-1 h-3 w-3" />
              ) : document.status === "pending" ? (
                <Clock className="mr-1 h-3 w-3" />
              ) : (
                <AlertTriangle className="mr-1 h-3 w-3" />
              )}
              {document.status.charAt(0).toUpperCase() + document.status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground">
            Uploaded on {new Date(document.uploadDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-muted-foreground">File type: {document.type.toUpperCase()}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="outline">
          <Eye className="mr-2 h-4 w-4" />
          View
        </Button>
        <Button size="sm" variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>
    </div>
  )
}

