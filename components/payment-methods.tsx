"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreditCard,
  Smartphone,
  Link,
  CreditCardIcon as CardIcon,
  Copy,
  CheckCircle2,
} from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import type { Property } from "@/lib/types";

interface PaymentMethodsProps {
  property: Property;
}

export function PaymentMethods({ property }: PaymentMethodsProps) {
  const [copied, setCopied] = useState(false);
  const [processing, setProcessing] = useState(false);
  const accountNumber = "0123456789";

  const handleCopy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
    }, 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">
          <CreditCard className="h-4 w-4 mr-2" />
          Process Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Methods</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-2">
            Property: {property.address}
          </p>
          <p className="text-lg font-semibold">
            {formatCurrency(property.amountDue)}
          </p>
        </div>

        <Tabs defaultValue="ussd">
          <TabsList className="grid grid-cols-4 w-full">
            <TabsTrigger value="ussd">USSD</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="nfc">NFC Card</TabsTrigger>
            <TabsTrigger value="link">Link</TabsTrigger>
          </TabsList>

          <TabsContent value="ussd" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">USSD Payment</CardTitle>
                <CardDescription>
                  Pay using your bank's USSD code
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <p className="text-xl font-mono font-bold">
                    *737*8*{property.id}#
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Dial the code above on your phone
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Smartphone className="h-4 w-4 mr-2" />
                      I've Completed Payment
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">One-Time Account</CardTitle>
                <CardDescription>
                  Transfer to this dedicated account number
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Bank Name</Label>
                    <div className="p-2 bg-muted rounded-md">
                      Lagos State Revenue Bank
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Account Number</Label>
                    <div className="flex">
                      <div className="flex-1 p-2 bg-muted rounded-l-md font-mono">
                        {accountNumber}
                      </div>
                      <Button
                        variant="outline"
                        className="rounded-l-none"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This account is valid for 24 hours
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="h-4 w-4 mr-2" />
                      I've Completed Payment
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="nfc" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">NFC Property Card</CardTitle>
                <CardDescription>
                  Use your property NFC card to pay
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-6 space-y-4">
                  <div className="mx-auto w-24 h-16 bg-gradient-to-r from-primary/20 to-primary/40 rounded-md flex items-center justify-center">
                    <CardIcon className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-sm">
                    Tap your property card on an NFC-enabled terminal
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CardIcon className="h-4 w-4 mr-2" />
                      I've Completed Payment
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="link" className="space-y-4 mt-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Payment Link</CardTitle>
                <CardDescription>
                  Receive a payment link via email or SMS
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      placeholder="your@email.com"
                      defaultValue={property.ownerContact}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+234 800 000 0000" />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={handlePayment}
                  disabled={processing}
                >
                  {processing ? (
                    <>
                      <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Link className="h-4 w-4 mr-2" />
                      Send Payment Link
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
