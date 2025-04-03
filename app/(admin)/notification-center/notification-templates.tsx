"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Edit2, Plus, Save, X, Copy } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Template = {
  id: string;
  name: string;
  type: string;
  subject: string;
  body: string;
  isActive: boolean;
  isEditing?: boolean;
};

export default function NotificationTemplates() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState<
    Omit<Template, "id" | "isEditing" | "isActive">
  >({
    name: "",
    type: "Email",
    subject: "",
    body: "",
  });

  const [templates, setTemplates] = useState<Template[]>([
    {
      id: "1",
      name: "Property Registration Confirmation",
      type: "Email",
      subject: "Your Property Registration is Confirmed",
      body: "Dear {{user_name}},\n\nThank you for registering your property with Lagos Property Map. Your property at {{property_address}} has been successfully registered with ID: {{property_id}}.\n\nYou can view your property details and certificate by logging into your account.\n\nRegards,\nLagos Property Map Team",
      isActive: true,
    },
    {
      id: "2",
      name: "Payment Receipt",
      type: "Email",
      subject: "Payment Receipt for {{property_id}}",
      body: "Dear {{user_name}},\n\nWe have received your payment of {{amount}} for property ID: {{property_id}}.\n\nPayment Details:\nTransaction ID: {{transaction_id}}\nDate: {{payment_date}}\nAmount: {{amount}}\nProperty: {{property_address}}\n\nYou can download your receipt from your account dashboard.\n\nRegards,\nLagos Property Map Team",
      isActive: true,
    },
    {
      id: "3",
      name: "Tax Due Reminder",
      type: "SMS",
      subject: "",
      body: "LPM REMINDER: Your property tax of {{amount}} for {{property_id}} is due on {{due_date}}. Please make payment to avoid penalties. Login to lagos-property-map.com",
      isActive: true,
    },
    {
      id: "4",
      name: "Document Verification",
      type: "Email",
      subject: "Document Verification Required",
      body: "Dear {{user_name}},\n\nWe need additional documentation to verify your property at {{property_address}}.\n\nPlease login to your account and upload the following documents within 7 days:\n- {{document_1}}\n- {{document_2}}\n\nFailure to provide these documents may result in delays processing your registration.\n\nRegards,\nLagos Property Map Team",
      isActive: false,
    },
    {
      id: "5",
      name: "Property Inspection Notification",
      type: "SMS",
      subject: "",
      body: "LPM NOTICE: Your property at {{property_address}} is scheduled for inspection on {{inspection_date}} at {{inspection_time}}. Please ensure access is available.",
      isActive: true,
    },
  ]);

  const toggleEdit = (id: string) => {
    setTemplates((templates) =>
      templates.map((template) =>
        template.id === id
          ? { ...template, isEditing: !template.isEditing }
          : template
      )
    );
  };

  const updateTemplate = (id: string, field: keyof Template, value: any) => {
    setTemplates((templates) =>
      templates.map((template) =>
        template.id === id ? { ...template, [field]: value } : template
      )
    );
  };

  const toggleActive = (id: string) => {
    setTemplates((templates) =>
      templates.map((template) =>
        template.id === id
          ? { ...template, isActive: !template.isActive }
          : template
      )
    );
  };

  const handleNewTemplateChange = (
    field: keyof Omit<Template, "id" | "isEditing" | "isActive">,
    value: any
  ) => {
    setNewTemplate((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addNewTemplate = () => {
    const newId = (templates.length + 1).toString();
    setTemplates([...templates, { id: newId, ...newTemplate, isActive: true }]);
    setNewTemplate({
      name: "",
      type: "Email",
      subject: "",
      body: "",
    });
    setIsAddDialogOpen(false);
  };

  const duplicateTemplate = (template: Template) => {
    const newId = (templates.length + 1).toString();
    setTemplates([
      ...templates,
      {
        ...template,
        id: newId,
        name: `${template.name} (Copy)`,
        isActive: false,
      },
    ]);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium">Notification Templates</h3>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a notification template with placeholders for dynamic
                content
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="template-name">Template Name</Label>
                  <Input
                    id="template-name"
                    value={newTemplate.name}
                    onChange={(e) =>
                      handleNewTemplateChange("name", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="template-type">Template Type</Label>
                  <Select
                    value={newTemplate.type}
                    onValueChange={(value) =>
                      handleNewTemplateChange("type", value)
                    }
                  >
                    <SelectTrigger id="template-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Email">Email</SelectItem>
                      <SelectItem value="SMS">SMS</SelectItem>
                      <SelectItem value="Push">Push Notification</SelectItem>
                      <SelectItem value="In-App">
                        In-App Notification
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {newTemplate.type === "Email" && (
                <div className="space-y-2">
                  <Label htmlFor="template-subject">Subject Line</Label>
                  <Input
                    id="template-subject"
                    value={newTemplate.subject}
                    onChange={(e) =>
                      handleNewTemplateChange("subject", e.target.value)
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="template-body">Template Content</Label>
                <Textarea
                  id="template-body"
                  rows={8}
                  value={newTemplate.body}
                  onChange={(e) =>
                    handleNewTemplateChange("body", e.target.value)
                  }
                  placeholder="Enter template content with placeholders like {{user_name}}"
                />
                <p className="text-sm text-muted-foreground">
                  Available placeholders:
                  {/* {{ user_name }}, {{ property_id }}, {{ property_address }},{{ amount }},{" "}
                  {{ due_date }}, {{ payment_date }}, {{ transaction_id }} */}
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsAddDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={addNewTemplate}>Create Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="email" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-md">
          <TabsTrigger value="email">Email</TabsTrigger>
          <TabsTrigger value="sms">SMS</TabsTrigger>
          <TabsTrigger value="push">Push</TabsTrigger>
          <TabsTrigger value="in-app">In-App</TabsTrigger>
        </TabsList>

        {["email", "sms", "push", "in-app"].map((tabValue) => (
          <TabsContent key={tabValue} value={tabValue} className="mt-6">
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template Name</TableHead>
                    {tabValue === "email" && <TableHead>Subject</TableHead>}
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates
                    .filter(
                      (template) => template.type.toLowerCase() === tabValue
                    )
                    .map((template) => (
                      <TableRow key={template.id}>
                        <TableCell className="font-medium">
                          {template.isEditing ? (
                            <Input
                              value={template.name}
                              onChange={(e) =>
                                updateTemplate(
                                  template.id,
                                  "name",
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            template.name
                          )}
                        </TableCell>
                        {tabValue === "email" && (
                          <TableCell>
                            {template.isEditing ? (
                              <Input
                                value={template.subject}
                                onChange={(e) =>
                                  updateTemplate(
                                    template.id,
                                    "subject",
                                    e.target.value
                                  )
                                }
                              />
                            ) : (
                              template.subject
                            )}
                          </TableCell>
                        )}
                        <TableCell>
                          <Badge
                            className={
                              template.isActive
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }
                            onClick={() => toggleActive(template.id)}
                          >
                            {template.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {template.isEditing ? (
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleEdit(template.id)}
                              >
                                <Save className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleEdit(template.id)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ) : (
                            <div className="flex justify-end space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleEdit(template.id)}
                              >
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => duplicateTemplate(template)}
                              >
                                <Copy className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>

            {templates.filter(
              (template) => template.type.toLowerCase() === tabValue
            ).length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <p>No {tabValue} templates found</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsAddDialogOpen(true)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Template
                </Button>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
