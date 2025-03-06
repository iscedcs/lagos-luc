"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Home,
  Map,
  Filter,
  FileText,
  User,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`h-full bg-background border-r flex flex-col transition-all duration-300 ${
        collapsed ? "w-16" : "w-80"
      }`}
    >
      <div className="p-4 flex items-center justify-between border-b">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Home className="h-5 w-5 text-primary" />
            <h1 className="text-lg font-semibold">Lagos Property Map</h1>
          </div>
        )}
        {collapsed && <Home className="h-5 w-5 text-primary mx-auto" />}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="ml-auto"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {!collapsed ? (
        <div className="flex-1 overflow-auto p-4">
          <div className="mb-4">
            <Link href="/">
              <Button variant="outline" className="w-full">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <Tabs defaultValue="filter">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="filter">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </TabsTrigger>
              <TabsTrigger value="stats">
                <FileText className="h-4 w-4 mr-2" />
                Stats
              </TabsTrigger>
              <TabsTrigger value="account">
                <User className="h-4 w-4 mr-2" />
                Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="filter" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="area">Area</Label>
                <Select>
                  <SelectTrigger id="area">
                    <SelectValue placeholder="Select area" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ikeja">Ikeja</SelectItem>
                    <SelectItem value="lekki">Lekki</SelectItem>
                    <SelectItem value="victoria-island">
                      Victoria Island
                    </SelectItem>
                    <SelectItem value="ikoyi">Ikoyi</SelectItem>
                    <SelectItem value="surulere">Surulere</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="property-type">Property Type</Label>
                <Select>
                  <SelectTrigger id="property-type">
                    <SelectValue placeholder="Select property type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="industrial">Industrial</SelectItem>
                    <SelectItem value="mixed-use">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Payment Status</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="paid" defaultChecked />
                    <Label htmlFor="paid" className="text-sm">
                      Paid
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="owing" defaultChecked />
                    <Label htmlFor="owing" className="text-sm">
                      Owing
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Land Size (sqm)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Input type="number" placeholder="Min" />
                  <Input type="number" placeholder="Max" />
                </div>
              </div>

              <Button className="w-full">Apply Filters</Button>
              <div className="mt-4">
                <Link href="/properties/new" className="w-full">
                  <Button variant="outline" className="w-full">
                    <Home className="h-4 w-4 mr-2" />
                    Add New Property
                  </Button>
                </Link>
              </div>
            </TabsContent>

            <TabsContent value="stats" className="space-y-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Payment Summary</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-green-100 text-green-800 hover:bg-green-100"
                        >
                          <CheckCircle2 className="h-3 w-3 mr-1" />
                          Paid
                        </Badge>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-red-100 text-red-800 hover:bg-red-100"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Owing
                        </Badge>
                        <span className="text-sm font-medium">35%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-2">
                    <h3 className="font-medium">Property Distribution</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Residential</span>
                        <span className="text-sm font-medium">58%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "58%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Commercial</span>
                        <span className="text-sm font-medium">27%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "27%" }}
                        ></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Industrial</span>
                        <span className="text-sm font-medium">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: "15%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="account" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value="admin" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" value="Administrator" readOnly />
              </div>
              <div className="space-y-2">
                <Label htmlFor="department">Department</Label>
                <Input id="department" value="Land Use Charge" readOnly />
              </div>
              <Separator />
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  Logout
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      ) : (
        <div className="flex-1 flex flex-col items-center pt-4 gap-4">
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10"
              title="Back to Home"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <Filter className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <FileText className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="w-10 h-10">
            <Map className="h-5 w-5" />
          </Button>
        </div>
      )}
    </div>
  );
}
