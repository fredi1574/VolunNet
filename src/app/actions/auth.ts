"use server";

import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData): Promise<void> {
  const email = formData.get("email") as string;
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    throw new Error("email and password are required");
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        username,
        password: hashedPassword,
      },
    });
    redirect("/");
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    console.error("Error registering user:", error);
    redirect("/register?error=Registration failed");
  }
}

// Not needed right now as we are using NextAuth!
// export async function loginUser(formData: FormData): Promise<void> {
//   const email = formData.get("email") as string;
//   const password = formData.get("password") as string;

//   if (!email || !password) {
//     throw new Error("email and password are required");
//   }

//   try {
//     const user = await prisma.user.findUnique({
//       where: { email },
//     });

//     if (!user || !user.password) {
//       throw new Error("User not found");
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);

//     if (!isPasswordValid) {
//       throw new Error("Invalid password");
//     }

//     redirect("/");
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error;
//     }
//     console.error("Error logging in user:", error);
//     redirect("/login?error=Login failed");
//   }
// }
