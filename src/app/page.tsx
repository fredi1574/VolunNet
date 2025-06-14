"use client";

import LandingPage from "@/components/LandingPage";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();

  if (!session?.user) {
    return <LandingPage />;
  }

  return <div className="text-9xl">Homepage</div>;
}
