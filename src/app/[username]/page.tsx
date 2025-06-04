// app/profile/[username]/page.tsx
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"; // Adjust path
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    select: {
      // Select only the data you need to display
      username: true,
      email: true, // Be mindful of privacy if displaying email publicly
      image: true,
      role: true,
      createdAt: true,
      // Add other fields you want to display, e.g., bio, postedOpportunities, registrations
    },
  });

  if (!userProfile) {
    redirect("/404"); // Or a "user not found" page
  }

  // Optional: Check if the logged-in user is viewing their own profile
  const isOwnProfile = session?.user?.username === viewingUsername;

  return (
    <div className="container mx-auto py-8">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="flex flex-row items-center space-x-4">
          <Avatar className="h-20 w-20">
            <AvatarImage
              src={userProfile.image || undefined}
              alt={userProfile.name || userProfile.username || ""}
            />
            <AvatarFallback>
              {userProfile.name?.charAt(0) ||
                userProfile.username?.charAt(0) ||
                "U"}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-3xl">
              {userProfile.name || userProfile.username}
            </CardTitle>
            <p className="text-muted-foreground">@{userProfile.username}</p>
            <p className="text-muted-foreground text-sm">
              Role: {userProfile.role}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <h3 className="mb-2 text-lg font-semibold">User Details</h3>
          {userProfile.email && (
            <p>
              <strong>Email:</strong>{" "}
              {isOwnProfile ? userProfile.email : "Hidden"}
            </p>
          )}
          <p>
            <strong>Joined:</strong>{" "}
            {new Date(userProfile.createdAt).toLocaleDateString()}
          </p>

          {isOwnProfile && (
            <div className="mt-6">
              {/* Add link to edit profile, manage settings, etc. */}
              <p>
                This is your profile.{" "}
                <a
                  href="/profile/edit"
                  className="text-primary hover:underline"
                >
                  Edit Profile
                </a>
              </p>
            </div>
          )}

          {/* Here you could list opportunities posted by this user if they are an ORGANIZER,
              or opportunities they've registered for if they are a VOLUNTEER */}
        </CardContent>
      </Card>
    </div>
  );
}
