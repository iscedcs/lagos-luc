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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AlertCircle, Send, CheckCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SendNotification() {
  const [notificationType, setNotificationType] = useState("email");
  const [recipientType, setRecipientType] = useState("individual");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [selectedProperties, setSelectedProperties] = useState<string[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [propertyId, setPropertyId] = useState("");
  const [userName, setUserName] = useState("");
  const [propertyAddress, setPropertyAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [paymentDate, setPaymentDate] = useState("");
  const [transactionId, setTransactionId] = useState("");

  const templates = [
    { id: "1", name: "Property Registration Confirmation", type: "email" },
    { id: "2", name: "Payment Receipt", type: "email" },
    { id: "3", name: "Tax Due Reminder", type: "sms" },
    { id: "4", name: "Document Verification", type: "email" },
    { id: "5", name: "Property Inspection Notification", type: "sms" },
  ];

  const users = [
    { id: "1", name: "John Doe", email: "john.doe@example.com" },
    { id: "2", name: "Sarah Johnson", email: "sarah.j@example.com" },
    { id: "3", name: "Michael Brown", email: "michael.b@example.com" },
    { id: "4", name: "Emma Wilson", email: "emma.w@example.com" },
    { id: "5", name: "David Lee", email: "david.l@example.com" },
  ];

  const groups = [
    { id: "1", name: "Property Owners" },
    { id: "2", name: "Administrators" },
    { id: "3", name: "LUC Agents" },
    { id: "4", name: "New Registrants" },
    { id: "5", name: "Overdue Payments" },
  ];

  const properties = [
    { id: "LPM-001", address: "123 Main Street, Ikoyi" },
    { id: "LPM-002", address: "45 Victoria Island Drive" },
    { id: "LPM-003", address: "78 Lekki Phase 1" },
    { id: "LPM-004", address: "12 Ikeja GRA" },
    { id: "LPM-005", address: "56 Surulere Avenue" },
  ];

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      if (template.id === "1") {
        setSubject("Your Property Registration is Confirmed");
        setMessage(
          "Dear {{user_name}},\n\nThank you for registering your property with Lagos Property Map. Your property at {{property_address}} has been successfully registered with ID: {{property_id}}.\n\nYou can view your property details and certificate by logging into your account.\n\nRegards,\nLagos Property Map Team"
        );
      } else if (template.id === "2") {
        setSubject("Payment Receipt for {{property_id}}");
        setMessage(
          "Dear {{user_name}},\n\nWe have received your payment of {{amount}} for property ID: {{property_id}}.\n\nPayment Details:\nTransaction ID: {{transaction_id}}\nDate: {{payment_date}}\nAmount: {{amount}}\nProperty: {{property_address}}\n\nYou can download your receipt from your account dashboard.\n\nRegards,\nLagos Property Map Team"
        );
      } else if (template.id === "3") {
        setSubject("");
        setMessage(
          "LPM REMINDER: Your property tax of {{amount}} for {{property_id}} is due on {{due_date}}. Please make payment to avoid penalties. Login to lagos-property-map.com"
        );
      } else if (template.id === "4") {
        setSubject("Document Verification Required");
        setMessage(
          "Dear {{user_name}},\n\nWe need additional documentation to verify your property at {{property_address}}.\n\nPlease login to your account and upload the following documents within 7 days:\n- {{document_1}}\n- {{document_2}}\n\nFailure to provide these documents may result in delays processing your registration.\n\nRegards,\nLagos Property Map Team"
        );
      } else if (template.id === "5") {
        setSubject("");
        setMessage(
          "LPM NOTICE: Your property at {{property_address}} is scheduled for inspection on {{inspection_date}} at {{inspection_time}}. Please ensure access is available."
        );
      }
    }
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleGroupSelection = (groupId: string) => {
    setSelectedGroups((prev) =>
      prev.includes(groupId)
        ? prev.filter((id) => id !== groupId)
        : [...prev, groupId]
    );
  };

  const togglePropertySelection = (propertyId: string) => {
    setSelectedProperties((prev) =>
      prev.includes(propertyId)
        ? prev.filter((id) => id !== propertyId)
        : [...prev, propertyId]
    );
  };

  const sendNotification = () => {
    setIsSending(true);

    // Simulate API call
    setTimeout(() => {
      setIsSending(false);
      setIsSuccess(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
        setSelectedTemplate("");
        setSubject("");
        setMessage("");
        setSelectedUsers([]);
        setSelectedGroups([]);
        setSelectedProperties([]);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {isSuccess && (
        <Alert className="bg-green-50 text-green-800 border-green-200">
          <CheckCircle className="h-4 w-4" />
          <AlertTitle>Success</AlertTitle>
          <AlertDescription>
            Your notification has been sent successfully.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Type</h3>

            <RadioGroup
              value={notificationType}
              onValueChange={setNotificationType}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="email" id="email" />
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sms" id="sms" />
                <Label htmlFor="sms">SMS</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="push" id="push" />
                <Label htmlFor="push">Push Notification</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="in-app" id="in-app" />
                <Label htmlFor="in-app">In-App Notification</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Notification Content</h3>

            <div className="space-y-2">
              <Label htmlFor="template">Use Template (Optional)</Label>
              <Select
                value={selectedTemplate}
                onValueChange={handleTemplateChange}
              >
                <SelectTrigger id="template">
                  <SelectValue placeholder="Select a template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Template</SelectItem>
                  {templates
                    .filter((template) => template.type === notificationType)
                    .map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {notificationType === "email" && (
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                rows={6}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Enter your message"
              />
              <p className="text-xs text-muted-foreground">
                Available placeholders:
                {/* {{ user_name }}, {{ property_id }}, {{ property_address }},{{ amount }},{" "}
                {{ due_date }}, {{ payment_date }}, {{ transaction_id }} */}
              </p>
            </div>

            {message.includes("{{property_id}}") && (
              <div className="space-y-2">
                <Label htmlFor="property-id">Property ID</Label>
                <Input
                  id="property-id"
                  value={propertyId}
                  onChange={(e) => setPropertyId(e.target.value)}
                  placeholder="Enter property ID"
                />
                <p className="text-xs text-muted-foreground">
                  {/* This will replace {{ property_id }} in your message */}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Recipients</h3>

            <RadioGroup
              value={recipientType}
              onValueChange={setRecipientType}
              className="grid grid-cols-3 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="individual" id="individual" />
                <Label htmlFor="individual">Individual Users</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="group" id="group" />
                <Label htmlFor="group">User Groups</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="property" id="property" />
                <Label htmlFor="property">Property Owners</Label>
              </div>
            </RadioGroup>

            <Tabs value={recipientType} className="w-full">
              <TabsContent value="individual" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {users.map((user) => (
                        <div
                          key={user.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`user-${user.id}`}
                            checked={selectedUsers.includes(user.id)}
                            onCheckedChange={() => toggleUserSelection(user.id)}
                          />
                          <Label htmlFor={`user-${user.id}`} className="flex-1">
                            {user.name}{" "}
                            <span className="text-muted-foreground">
                              ({user.email})
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="group" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {groups.map((group) => (
                        <div
                          key={group.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`group-${group.id}`}
                            checked={selectedGroups.includes(group.id)}
                            onCheckedChange={() =>
                              toggleGroupSelection(group.id)
                            }
                          />
                          <Label
                            htmlFor={`group-${group.id}`}
                            className="flex-1"
                          >
                            {group.name}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="property" className="mt-0">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {properties.map((property) => (
                        <div
                          key={property.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`property-${property.id}`}
                            checked={selectedProperties.includes(property.id)}
                            onCheckedChange={() =>
                              togglePropertySelection(property.id)
                            }
                          />
                          <Label
                            htmlFor={`property-${property.id}`}
                            className="flex-1"
                          >
                            {property.id}{" "}
                            <span className="text-muted-foreground">
                              ({property.address})
                            </span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Delivery Options</h3>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="schedule" />
                <Label htmlFor="schedule">Schedule for later</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="priority" defaultChecked />
                <Label htmlFor="priority">High priority</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="track" defaultChecked />
                <Label htmlFor="track">Track delivery status</Label>
              </div>
            </div>
          </div>

          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Important</AlertTitle>
            <AlertDescription>
              Ensure all recipient information is correct before sending.
              Notifications cannot be recalled once sent.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      <Button
        onClick={sendNotification}
        disabled={
          isSending ||
          isSuccess ||
          (recipientType === "individual" && selectedUsers.length === 0) ||
          (recipientType === "group" && selectedGroups.length === 0) ||
          (recipientType === "property" && selectedProperties.length === 0) ||
          !message
        }
        className="w-full"
      >
        {isSending ? (
          <>Sending Notification...</>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Send Notification
          </>
        )}
      </Button>
    </div>
  );
}
