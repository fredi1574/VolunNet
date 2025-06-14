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
      <h3 className="text-xl font-semibold">Create Your VolunNet account</h3>
      <div className="flex flex-col space-y-2">
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="Enter email..."
          required
        />
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
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="username">Username</label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Enter username..."
          required
        />
      </div>

      <Separator className="my-8" />
      <h2 className="text-muted-foreground text-center">
        Personal information
      </h2>

      <div className="flex flex-col space-y-2">
        <label htmlFor="firstName">First name</label>
        <Input
          type="text"
          id="firstName"
          name="firstName"
          placeholder="Enter your first name"
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="lastName">Last name</label>
        <Input
          type="text"
          id="lastName"
          name="lastName"
          placeholder="Enter your last name"
          required
        />
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="phoneNumber">Phone number</label>
        <Input
          type="phone"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
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
