import { Separator } from "@/components/ui/separator";
import { registerUser } from "@/app/actions/auth";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SubmitButton = () => {
  return (
    <Button
      type="submit"
      className="hover:bg-muted-foreground mx-auto block w-1/2 cursor-pointer active:bg-blue-700/80"
    >
      Create Account
    </Button>
  );
};

export default function RegisterPage() {
  return (
    <form
      action={registerUser}
      className="w-1/4 space-y-4 rounded-md border border-gray-300 bg-white p-4 px-10 shadow-lg"
    >
      <h3 className="text-lg font-semibold">Create an account</h3>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email..."
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Username</label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username..."
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="Enter password..."
          required
        />
      </div>

      <SubmitButton />

      <Separator />
      <p className="text-center text-sm text-gray-700">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-300 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
