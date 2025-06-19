"use server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getAllOpportunities() {
  return prisma.opportunity.findMany();
}

export async function postOpportunity(formData: FormData) {
  const session = await getServerSession(authOptions);

  const organizerId = session?.user.id;

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const dateString = formData.get("date") as string;
  const locationName = formData.get("locationName") as string;
  const address = formData.get("address") as string;
  const latitude = parseFloat(formData.get("latitude") as string);
  const longitude = parseFloat(formData.get("longitude") as string);

  if (
    !title ||
    !dateString ||
    !locationName ||
    isNaN(latitude) ||
    isNaN(longitude)
  ) {
    throw new Error("Missing required fields.");
  }

  try {
    const opportunity = await prisma.opportunities.create({
      data: {
        title,
        description,
        date: new Date(dateString),
        locationName,
        address,
        latitude,
        longitude,
        organizerId: organizerId,
      },
    });

    redirect(`/opportunities/${opportunity.id}`);
  } catch (error) {
    console.error("Failed to create opportunity", error);
    throw new Error("Failed to create opportunities");
  }
}
