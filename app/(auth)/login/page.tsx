import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { MapPin } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./login-form";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Login | Lagos Property Map",
  description: "Login to your Lagos Property Map account",
};

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center py-12 bg-gray-50">
      <div className="container flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 px-4">
        <div className="md:w-1/2 max-w-md space-y-6 text-center md:text-left">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-4">
            <MapPin className="h-10 w-10 text-emerald-600" />
            <h1 className="text-2xl font-bold">Lagos Property Map</h1>
          </div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome back</h2>
          <p className="text-lg text-muted-foreground">
            Access your account to manage properties, view the map, and use all
            features of the Lagos Property Map system.
          </p>
          <div className="hidden md:block">
            <Image
              src="/placeholder.svg?height=300&width=300"
              alt="Login"
              width={300}
              height={300}
              className="rounded-md mx-auto"
            />
          </div>
        </div>

        <Card className="md:w-1/2 max-w-md w-full">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                  Enter your email and password to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <div className="text-sm text-center text-muted-foreground">
                  <Link
                    href="/forgot-password"
                    className="underline underline-offset-4 hover:text-emerald-600">
                    Forgot your password?
                  </Link>
                </div>
              </CardFooter>
            </TabsContent>
            <TabsContent value="register">
              <CardHeader>
                <CardTitle>Create an account</CardTitle>
                <CardDescription>
                  Register to access the Lagos Property Map platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <p className="text-muted-foreground">
                    Registration is handled by authorized Lagos State officials.
                  </p>
                  <p className="text-muted-foreground mt-2">
                    Please contact the Lagos State Land Use Charge Department
                    for account creation.
                  </p>
                  <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">
                    Contact Support
                  </Button>
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}
