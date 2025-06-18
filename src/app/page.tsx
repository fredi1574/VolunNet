import LandingPage from "@/components/LandingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import DashBoard from "@/components/Dashboard";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return session?.user ? <DashBoard /> : <LandingPage />;
}
