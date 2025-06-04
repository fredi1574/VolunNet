"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (status === "authenticated") {
    redirect("/");
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      setIsLoading(false);

      if (result?.error) {
        setError(
          result.error === "CredentialsSignin"
            ? "Invalid email or password"
            : result.error,
        );
      } else if (result?.ok) {
        router.push("/");
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error logging in user:", error);
      setError("Login failed");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-1/4 space-y-4 rounded-md border border-gray-300 bg-white p-4 px-10 shadow-lg"
    >
      <h3 className="text-lg font-semibold">Sign in to VolunNet</h3>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email..."
          required
          disabled={isLoading}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          required
          disabled={isLoading}
        />
      </div>

      {error && <p className="text-center text-sm text-red-500">{error}</p>}

      <Button
        type="submit"
        disabled={isLoading}
        className="hover:bg-muted-foreground mx-auto block w-1/2 cursor-pointer active:bg-blue-700/80"
      >
        Log in
      </Button>

      <Separator />
      <p className="text-center text-sm text-gray-700">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-blue-300 hover:underline">
          Register
        </Link>
      </p>
    </form>
  );
}
