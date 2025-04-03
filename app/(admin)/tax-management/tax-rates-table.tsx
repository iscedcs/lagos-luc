"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Save, Info } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

// Mock data for tax rates
const initialTaxRates = [
  {
    id: "TR-001",
    category: "Residential",
    propertyType: "Single Family Home",
    zone: "Ikeja",
    baseRate: 0.005,
    minimumAmount: 25000,
    effectiveDate: "2023-01-01",
    status: "Active",
  },
  {
    id: "TR-002",
    category: "Residential",
    propertyType: "Apartment",
    zone: "Lekki",
    baseRate: 0.006,
    minimumAmount: 30000,
    effectiveDate: "2023-01-01",
    status: "Active",
  },
  {
    id: "TR-003",
    category: "Commercial",
    propertyType: "Office Building",
    zone: "Victoria Island",
    baseRate: 0.008,
    minimumAmount: 100000,
    effectiveDate: "2023-01-01",
    status: "Active",
  },
  {
    id: "TR-004",
    category: "Commercial",
    propertyType: "Retail Space",
    zone: "Ikoyi",
    baseRate: 0.007,
    minimumAmount: 75000,
    effectiveDate: "2023-01-01",
    status: "Active",
  },
  {
    id: "TR-005",
    category: "Industrial",
    propertyType: "Manufacturing",
    zone: "Apapa",
    baseRate: 0.009,
    minimumAmount: 150000,
    effectiveDate: "2023-01-01",
    status: "Active",
  },
  {
    id: "TR-006",
    category: "Special Purpose",
    propertyType: "Educational",
    zone: "Yaba",
    baseRate: 0.003,
    minimumAmount: 20000,
    effectiveDate: "2023-01-01",
    status: "Active",
  },
  {
    id: "TR-007",
    category: "Residential",
    propertyType: "Luxury Villa",
    zone: "Ikoyi",
    baseRate: 0.01,
    minimumAmount: 200000,
    effectiveDate: "2023-04-01",
    status: "Pending",
  },
];

const formSchema = z.object({
  category: z.string().min(1, { message: "Category is required" }),
  propertyType: z.string().min(1, { message: "Property type is required" }),
  zone: z.string().min(1, { message: "Zone is required" }),
  baseRate: z.coerce
    .number()
    .min(0.001, { message: "Base rate must be at least 0.001" })
    .max(0.05, { message: "Base rate cannot exceed 0.05" }),
  minimumAmount: z.coerce
    .number()
    .min(5000, { message: "Minimum amount must be at least ₦5,000" }),
  effectiveDate: z.string().min(1, { message: "Effective date is required" }),
  status: z.enum(["Active", "Pending", "Inactive"]),
});

type TaxRate = {
  id: string;
  category: string;
  propertyType: string;
  zone: string;
  baseRate: number;
  minimumAmount: number;
  effectiveDate: string;
  status: string;
};

export default function TaxRatesTable() {
  const [taxRates, setTaxRates] = useState<TaxRate[]>(initialTaxRates);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: "",
      propertyType: "",
      zone: "",
      baseRate: 0.005,
      minimumAmount: 25000,
      effectiveDate: new Date().toISOString().split("T")[0],
      status: "Pending",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    if (editingId) {
      // Update existing rate
      setTaxRates(
        taxRates.map((rate) =>
          rate.id === editingId ? { ...rate, ...values } : rate
        )
      );
      setEditingId(null);
    } else {
      // Add new rate
      const newRate = {
        id: `TR-${String(taxRates.length + 1).padStart(3, "0")}`,
        ...values,
      };
      setTaxRates([...taxRates, newRate]);
    }
    setIsAddDialogOpen(false);
    form.reset();
  };

  const handleEdit = (rate: TaxRate) => {
    // @ts-expect-error: expected error
    form.reset(rate);
    setEditingId(rate.id);
    setIsAddDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTaxRates(taxRates.filter((rate) => rate.id !== id));
  };

  const formatRate = (rate: number) => {
    return `${(rate * 100).toFixed(2)}%`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
            Active
          </Badge>
        );
      case "Pending":
        return (
          <Badge
            variant="outline"
            className="bg-yellow-50 text-yellow-700 border-yellow-200"
          >
            Pending
          </Badge>
        );
      case "Inactive":
        return (
          <Badge variant="outline" className="bg-gray-100 text-gray-800">
            Inactive
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Property Tax Rates</CardTitle>
            <CardDescription>
              Configure tax rates by property type and zone
            </CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  form.reset({
                    category: "",
                    propertyType: "",
                    zone: "",
                    baseRate: 0.005,
                    minimumAmount: 25000,
                    effectiveDate: new Date().toISOString().split("T")[0],
                    status: "Pending",
                  });
                  setEditingId(null);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Tax Rate
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[550px]">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? "Edit Tax Rate" : "Add New Tax Rate"}
                </DialogTitle>
                <DialogDescription>
                  {editingId
                    ? "Update the tax rate details below."
                    : "Configure a new property tax rate. This will be applied to matching properties."}
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Residential">
                                Residential
                              </SelectItem>
                              <SelectItem value="Commercial">
                                Commercial
                              </SelectItem>
                              <SelectItem value="Industrial">
                                Industrial
                              </SelectItem>
                              <SelectItem value="Special Purpose">
                                Special Purpose
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="propertyType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Property Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Single Family Home">
                                Single Family Home
                              </SelectItem>
                              <SelectItem value="Apartment">
                                Apartment
                              </SelectItem>
                              <SelectItem value="Luxury Villa">
                                Luxury Villa
                              </SelectItem>
                              <SelectItem value="Office Building">
                                Office Building
                              </SelectItem>
                              <SelectItem value="Retail Space">
                                Retail Space
                              </SelectItem>
                              <SelectItem value="Manufacturing">
                                Manufacturing
                              </SelectItem>
                              <SelectItem value="Educational">
                                Educational
                              </SelectItem>
                              <SelectItem value="Healthcare">
                                Healthcare
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
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
                              <SelectItem value="Ikeja">Ikeja</SelectItem>
                              <SelectItem value="Lekki">Lekki</SelectItem>
                              <SelectItem value="Victoria Island">
                                Victoria Island
                              </SelectItem>
                              <SelectItem value="Ikoyi">Ikoyi</SelectItem>
                              <SelectItem value="Surulere">Surulere</SelectItem>
                              <SelectItem value="Yaba">Yaba</SelectItem>
                              <SelectItem value="Apapa">Apapa</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="effectiveDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Effective Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="baseRate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Base Rate</FormLabel>
                          <FormControl>
                            <Input type="number" step="0.001" {...field} />
                          </FormControl>
                          <FormDescription>
                            Enter as decimal (e.g., 0.005 for 0.5%)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="minimumAmount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Minimum Amount (₦)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
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
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Pending">Pending</SelectItem>
                            <SelectItem value="Inactive">Inactive</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      {editingId ? "Update Rate" : "Save Rate"}
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Property Type</TableHead>
                <TableHead>Zone</TableHead>
                <TableHead>Base Rate</TableHead>
                <TableHead>Minimum Amount</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxRates.map((rate) => (
                <TableRow key={rate.id}>
                  <TableCell>{rate.category}</TableCell>
                  <TableCell>{rate.propertyType}</TableCell>
                  <TableCell>{rate.zone}</TableCell>
                  <TableCell>{formatRate(rate.baseRate)}</TableCell>
                  <TableCell>{formatCurrency(rate.minimumAmount)}</TableCell>
                  <TableCell>{rate.effectiveDate}</TableCell>
                  <TableCell>{getStatusBadge(rate.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(rate)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(rate.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="mt-4 p-4 bg-blue-50 rounded-md flex items-start gap-3">
          <Info className="h-5 w-5 text-blue-500 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800">
              Tax Rate Information
            </h4>
            <p className="text-sm text-blue-700 mt-1">
              Property tax is calculated as:{" "}
              <span className="font-semibold">Property Value × Base Rate</span>,
              with a minimum amount as specified. Changes to tax rates require
              approval and will be effective from the specified date.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
