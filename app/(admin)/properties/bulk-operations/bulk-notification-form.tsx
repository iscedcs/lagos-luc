"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, CheckCircle2, Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const formSchema = z.object({
  notificationType: z.enum(["email", "sms", "both"], {
    message: "Please select a notification type",
  }),
  recipientType: z.enum(["all", "zone", "status", "custom"], {
    message: "Please select recipient type",
  }),
  zone: z.string().optional(),
  status: z.string().optional(),
  customRecipients: z.string().optional(),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(20, { message: "Message must be at least 20 characters" }),
  template: z.string().optional(),
  includeAttachment: z.boolean().default(false),
  scheduleSend: z.boolean().default(false),
  scheduleDate: z.string().optional(),
  scheduleTime: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

// Mock notification templates
const notificationTemplates = [
  { id: "template-1", name: "Tax Payment Reminder" },
  { id: "template-2", name: "Property Verification Complete" },
  { id: "template-3", name: "Document Submission Request" },
  { id: "template-4", name: "Property Assessment Notice" },
  { id: "template-5", name: "System Maintenance Alert" },
];

export default function BulkNotificationForm() {
  const [isSending, setIsSending] = useState(false);
  const [sendProgress, setSendProgress] = useState(0);
  const [sendResult, setSendResult] = useState<{
    status: "success" | "error" | null;
    message: string;
    details?: {
      total: number;
      sent: number;
      failed: number;
    };
  }>({ status: null, message: "" });
  const [activeTab, setActiveTab] = useState("compose");

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema as any),
    defaultValues: {
      notificationType: "email",
      recipientType: "all",
      subject: "",
      message: "",
      includeAttachment: false,
      scheduleSend: false,
    },
  });

  const recipientType = form.watch("recipientType");
  const scheduleSend = form.watch("scheduleSend");
  const selectedTemplate = form.watch("template");

  // Handle template selection
  const handleTemplateSelect = (templateId: string) => {
    form.setValue("template", templateId);

    // In a real app, you would fetch the template content from the server
    // For this example, we'll just set some placeholder content
    if (templateId === "template-1") {
      form.setValue("subject", "Reminder: Property Tax Payment Due");
      form.setValue(
        "message",
        "Dear Property Owner,\n\nThis is a friendly reminder that your property tax payment is due on [DUE_DATE]. Please ensure timely payment to avoid any penalties.\n\nThank you,\nLagos Property Management"
      );
    } else if (templateId === "template-2") {
      form.setValue("subject", "Property Verification Complete");
      form.setValue(
        "message",
        "Dear Property Owner,\n\nWe are pleased to inform you that the verification process for your property has been completed successfully. You can now access your property certificate through your account dashboard.\n\nRegards,\nLagos Property Management"
      );
    }
  };

  async function onSubmit(data: FormValues) {
    setIsSending(true);
    setSendProgress(0);
    setSendResult({ status: null, message: "" });

    // Simulate sending process with progress
    const totalSteps = 10;
    for (let i = 1; i <= totalSteps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setSendProgress((i / totalSteps) * 100);
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Simulate successful sending
    setIsSending(false);
    setSendResult({
      status: "success",
      message: "Notifications sent successfully",
      details: {
        total: 125,
        sent: 123,
        failed: 2,
      },
    });

    // In a real implementation, you would:
    // 1. Send the form data to a server action
    // 2. Process the bulk notification on the server
    // 3. Return results and handle any errors
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Bulk Notifications</CardTitle>
        <CardDescription>
          Send notifications to multiple property owners at once.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="compose" onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="compose">Compose Message</TabsTrigger>
            <TabsTrigger value="templates">Use Template</TabsTrigger>
          </TabsList>
          <TabsContent value="compose">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6 mt-4"
              >
                <FormField
                  control={form.control}
                  name="notificationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notification Type</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-row space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="email" />
                            </FormControl>
                            <FormLabel className="font-normal">Email</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="sms" />
                            </FormControl>
                            <FormLabel className="font-normal">SMS</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="both" />
                            </FormControl>
                            <FormLabel className="font-normal">Both</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="recipientType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipients</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select recipients" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all">
                            All Property Owners
                          </SelectItem>
                          <SelectItem value="zone">By Zone</SelectItem>
                          <SelectItem value="status">
                            By Property Status
                          </SelectItem>
                          <SelectItem value="custom">Custom List</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {recipientType === "zone" && (
                  <FormField
                    control={form.control}
                    name="zone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zone</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select zone" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="zone-a">Zone A</SelectItem>
                            <SelectItem value="zone-b">Zone B</SelectItem>
                            <SelectItem value="zone-c">Zone C</SelectItem>
                            <SelectItem value="zone-d">Zone D</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Send to all property owners in the selected zone.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {recipientType === "status" && (
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Property Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="registered">
                              Registered
                            </SelectItem>
                            <SelectItem value="pending">
                              Pending Verification
                            </SelectItem>
                            <SelectItem value="verified">Verified</SelectItem>
                            <SelectItem value="tax-due">
                              Tax Payment Due
                            </SelectItem>
                            <SelectItem value="tax-overdue">
                              Tax Payment Overdue
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Send to all property owners with properties in the
                          selected status.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {recipientType === "custom" && (
                  <FormField
                    control={form.control}
                    name="customRecipients"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Custom Recipients</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Enter email addresses or property IDs separated by commas"
                            className="min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter email addresses or property IDs. For example:
                          john@example.com, LAG-001, LAG-002
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter notification subject"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter your notification message"
                          className="min-h-[200px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        You can use placeholders like [OWNER_NAME],
                        [PROPERTY_ID], [DUE_DATE] which will be replaced with
                        actual values.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="includeAttachment"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Include Property Certificate</FormLabel>
                        <FormDescription>
                          Attach the property certificate to the notification
                          (only applicable for verified properties).
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="scheduleSend"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Schedule Sending</FormLabel>
                        <FormDescription>
                          Schedule this notification to be sent at a later time.
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                {scheduleSend && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="scheduleDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="scheduleTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Time</FormLabel>
                          <FormControl>
                            <Input type="time" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {isSending && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Sending notifications...</span>
                      <span>{Math.round(sendProgress)}%</span>
                    </div>
                    <Progress value={sendProgress} className="h-2" />
                  </div>
                )}

                {sendResult.status && (
                  <Alert
                    variant={
                      sendResult.status === "success"
                        ? "default"
                        : "destructive"
                    }
                  >
                    {sendResult.status === "success" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>
                      {sendResult.status === "success"
                        ? "Notifications Sent"
                        : "Failed to Send"}
                    </AlertTitle>
                    <AlertDescription>
                      {sendResult.message}
                      {sendResult.details && (
                        <div className="mt-2 text-sm">
                          <p>Total recipients: {sendResult.details.total}</p>
                          <p>Successfully sent: {sendResult.details.sent}</p>
                          <p>Failed: {sendResult.details.failed}</p>
                        </div>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" type="button" disabled={isSending}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSending}>
                    {scheduleSend
                      ? "Schedule Notification"
                      : isSending
                      ? "Sending..."
                      : "Send Notification"}
                  </Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          <TabsContent value="templates">
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {notificationTemplates.map((template) => (
                  <div
                    key={template.id}
                    className={`border rounded-md p-4 cursor-pointer transition-colors ${
                      selectedTemplate === template.id
                        ? "bg-primary/10 border-primary"
                        : "hover:bg-gray-50"
                    }`}
                    onClick={() => handleTemplateSelect(template.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-gray-500" />
                        <span className="font-medium">{template.name}</span>
                      </div>
                      <Button variant="ghost" size="sm">
                        Use
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {selectedTemplate && (
                <div className="border rounded-md p-4 mt-6">
                  <h3 className="text-sm font-medium mb-2">Template Preview</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm font-medium">Subject:</p>
                      <p className="text-sm">{form.getValues("subject")}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Message:</p>
                      <p className="text-sm whitespace-pre-line">
                        {form.getValues("message")}
                      </p>
                    </div>
                    <Button
                      onClick={() => setActiveTab("compose")}
                      className="w-full"
                    >
                      Continue with this template
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="bg-gray-50 border-t px-6 py-3">
        <div className="text-xs text-gray-500">
          <p>
            All notifications are logged and can be reviewed in the notification
            center.
          </p>
        </div>
      </CardFooter>
    </Card>
  );
}

