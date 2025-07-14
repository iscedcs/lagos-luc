"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { loginUser } from "../../actions/actions";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  rememberMe: z.boolean().default(false),
  userType: z.enum(["admin", "superadmin", "agent", "owner", "guest"]),
});

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
      userType: "owner",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const result = await loginUser(values);

      if (result.success) {
        // Redirect based on user type
        switch (values.userType) {
          case "superadmin":
            router.push("/dashboard");
            break;
          case "admin":
            router.push("/dashboard");
            break;
          case "agent":
            router.push("/agent/dashboard");
            break;
          case "owner":
            router.push("/owner/dashboard");
            break;
          default:
            router.push("/");
        }
      } else {
        // Handle error
        form.setError("root", {
          message: result.message || "Invalid credentials. Please try again.",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      form.setError("root", {
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {form.formState.errors.root && (
          <div className="bg-red-50 p-3 rounded-md text-red-600 text-sm">
            {form.formState.errors.root.message}
          </div>
        )}

        <FormField
          control={form.control}
          name="userType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>User Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your user type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="owner">Property Owner</SelectItem>
                  <SelectItem value="agent">LUC Agent</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="superadmin">Super Admin</SelectItem>
                  <SelectItem value="guest">Guest</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                For demo purposes - select your role
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rememberMe"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Remember me</FormLabel>
                <FormDescription>Stay logged in on this device</FormDescription>
              </div>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full bg-emerald-600 hover:bg-emerald-700"
          disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Log In
        </Button>
      </form>
    </Form>
  );
}
