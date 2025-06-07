import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="h-[100vh] bg-[#f9f2e8]">
      <Card className="container mx-auto w-1/2 bg-[#c3e0d9] p-0 shadow-lg">
        <CardHeader className="m-0 rounded-b-lg bg-[#fafef5] p-0 text-center">
          <div className="flex justify-between px-4">
            <h1 className="text-xl font-bold">VolunNet</h1>
            <div className="space-x-4">
              <Button variant="link" className="cursor-pointer">
                Find Opportunities
              </Button>
              <Button variant="link" className="cursor-pointer">
                About
              </Button>
            </div>
          </div>

          <div className="relative h-[400px] w-full">
            <Image
              src="https://images.unsplash.com/photo-1652971876875-05db98fab376?q=80&w=2629&auto=format&fit=crop"
              alt="Volunteers Cleaning a River"
              fill
              className="object-cover"
              priority
            />
          </div>

          <h1 className="mt-6 text-4xl font-semibold">
            Make an Impact in Your Community
          </h1>
          <p className="mb-6 text-xl">
            Join thousands of volunteers and organizations making a difference
          </p>
          <div className="flex justify-center space-x-10 pb-10">
            <Button className="cursor-pointer bg-[#e97b3c] hover:bg-[#E76A23]">
              Find Opportunities Near You
            </Button>
            <Button className="cursor-pointer bg-[#bfe2cb] text-blue-950 hover:bg-[#ABD9BB]">
              Post a Volunteering Request
            </Button>
          </div>
        </CardHeader>

        <CardContent className="mx-12 mb-6 grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center justify-center rounded-lg bg-[#fef9f0] p-4 text-center shadow-md">
            <Image
              src="/pin.png"
              alt="pin"
              width={50}
              height={50}
              className="mb-2"
            />
            <h2 className="text-lg font-semibold">
              Discover Nearby Opportunities
            </h2>
            <p>Browse a map to find volunteering opportunities close to home</p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-[#fef9f0] p-4 text-center shadow-md">
            <Image
              src="/bar.png"
              alt="bar"
              width={50}
              height={50}
              className="mb-2"
            />
            <h2 className="text-lg font-semibold">
              Track Your Volunteering Impact
            </h2>
            <p>
              Log your hours and see the impact you&apos;re making over time
            </p>
          </div>
          <div className="flex flex-col items-center justify-center rounded-lg bg-[#fef9f0] p-4 text-center shadow-md">
            <Image
              src="/heart.png"
              alt="heart"
              width={50}
              height={50}
              className="mb-2"
            />
            <h2 className="text-lg font-semibold">
              Join a Supportive Community
            </h2>
            <p>Connect with like-minded individuals and organizations</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
