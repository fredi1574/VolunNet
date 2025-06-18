import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ProfilePageProps {
  params: {
    username: string;
  };
}

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const session = await getServerSession(authOptions);
  const viewingUsername = params.username;

  const userProfile = await prisma.user.findUnique({
    where: { username: viewingUsername },
  });

  const isOwnProfile = session?.user?.username === viewingUsername;

  return (
    <Card className="mx-auto mt-28 max-w-3xl shadow-xl">
      <CardHeader className="flex flex-row items-center space-x-4">
        <Avatar className="h-30 w-30">
          <AvatarImage
            src={userProfile?.image}
            alt={userProfile?.firstName || userProfile?.username}
          />
          <AvatarFallback>
            {userProfile?.firstName?.charAt(0) ||
              userProfile?.username?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-3xl">
            {userProfile?.firstName + " " + userProfile?.lastName ||
              userProfile.username}
          </CardTitle>
          {userProfile?.username && (
            <p className="text-muted-foreground">@{userProfile.username}</p>
          )}
          <p className="text-muted-foreground text-sm">
            Role: {userProfile?.role}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="mb-2 text-lg font-semibold">User Details</h3>
        <p>
          <strong>Email:</strong> {isOwnProfile ? userProfile.email : "Hidden"}
        </p>

        <p>
          <strong>Phone:</strong> {userProfile?.phoneNumber}
        </p>

        <p>
          <strong>Joined:</strong>{" "}
          {new Date(userProfile?.createdAt).toLocaleDateString()}
        </p>
        {isOwnProfile && (
          <Button asChild variant="outline" className="">
            <Link href="/profile/edit">Edit Profile</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
