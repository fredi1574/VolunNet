import LandingPage from "@/components/LandingPage";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";

function DashBoard() {
  return <div className="text-5xl">Dashboard Content</div>;
}

export default async function Home() {
  const session = await getServerSession(authOptions);

  return session?.user ? <DashBoard /> : <LandingPage />;
}
