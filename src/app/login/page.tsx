"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react"; // Client-side signIn function
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email." }),
  password: z.string().min(1, { message: "Password is required." }), // Min 1 for login
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/"; // Redirect after login
  const error = searchParams.get("error"); // NextAuth error param
  const message = searchParams.get("message"); // Custom message (e.g., from registration)

  const [isLoading, setIsLoading] = useState(false);
  // The error from NextAuth will be in the URL query param, so we display that.
  // We can also have specific form errors if needed.
  const [loginError, setLoginError] = useState<string | null>(
    error ? getErrorMessage(error) : null,
  );

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const result = await signIn("credentials", {
        redirect: false, // We'll handle redirect manually
        email: data.email,
        password: data.password,
        // callbackUrl: callbackUrl // Can also pass callbackUrl here
      });

      setIsLoading(false);

      if (result?.error) {
        setLoginError(
          getErrorMessage(result.error) ||
            "Login failed. Please check your credentials.",
        );
      } else if (result?.ok) {
        // Successful login
        router.push(callbackUrl); // Redirect to the intended page or home
        router.refresh(); // Important to refresh server components and update session state
      } else {
        setLoginError("An unexpected error occurred during login.");
      }
    } catch (e) {
      setIsLoading(false);
      console.error("Login submission error:", e);
      setLoginError("An unexpected error occurred.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Log In</CardTitle>
          <CardDescription>
            Enter your credentials to access your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <p className="mb-4 rounded-md bg-green-100 p-3 text-sm text-green-600">
              {message}
            </p>
          )}
          {loginError &&
            !form.formState.isValid &&
            form.formState.isSubmitted && (
              <p className="text-destructive mb-4 rounded-md bg-red-100 p-3 text-sm font-medium">
                {loginError}
              </p>
            )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        {...field}
                      />
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
                        placeholder="••••••••"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {loginError &&
                (form.formState.isValid || !form.formState.isSubmitted) && (
                  <p className="text-destructive text-sm font-medium">
                    {loginError}
                  </p>
                )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
              </Button>
            </form>
          </Form>
          <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <a
              href="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

// Helper to make NextAuth errors more user-friendly
function getErrorMessage(error: string): string {
  switch (error) {
    case "CredentialsSignin":
      return "Invalid email or password. Please try again.";
    case "Callback":
    case "OAuthAccountNotLinked":
      return "There was an issue with your account. Try a different login method.";
    default:
      return "Login failed. An unexpected error occurred.";
  }
}
