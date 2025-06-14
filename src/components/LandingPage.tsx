import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { BarChart3, Heart, MapPin } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-b from-amber-50 via-emerald-50 to-teal-50">
      <nav className="flex items-center justify-between p-4">
        <h1 className="text-lg font-bold">VolunNet</h1>
        <div className="flex items-center space-x-6">
          <Button
            variant="link"
            className="text-gray-700 hover:text-emerald-600"
            asChild
          >
            <Link href="/login">Log in</Link>
          </Button>
          <Button
            variant="link"
            className="text-gray-700 hover:text-emerald-600"
            asChild
          >
            <Link href="/about">About</Link>
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href="/register">Get Started</Link>
          </Button>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-6 text-center">
        <div className="relative mx-auto mb-8 h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1652971876875-05db98fab376?q=80&w=2629&auto=format&fit=crop"
            alt="Volunteers Cleaning a River"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <div className="absolute right-8 bottom-8 left-8 text-white">
            <h1 className="mb-4 text-5xl leading-tight font-bold md:text-6xl">
              Make an{" "}
              <span className="bg-gradient-to-r from-emerald-200 to-teal-200 bg-clip-text text-transparent">
                Impact
              </span>{" "}
              in Your Community
            </h1>
            <p className="mb-8 text-xl text-gray-200 md:text-2xl">
              Join thousands of volunteers and organizations making a difference
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6">
        <Button className="cursor-pointer bg-gradient-to-r from-orange-400 to-orange-500 text-lg shadow-lg duration-300 hover:from-orange-500 hover:to-orange-600 hover:shadow-xl">
          Find Opporutunities Near You
        </Button>
        <Button
          variant="outline"
          className="cursor-pointer border-2 border-emerald-500 bg-white px-8 py-4 text-lg font-semibold text-emerald-700 shadow-md transition-all duration-300 hover:bg-emerald-50 hover:shadow-xl"
        >
          Post a Volunteering Request
        </Button>
      </div>

      <div className="mx-32 my-12 grid grid-cols-3 gap-6">
        <Card className="border-0 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-blue-200/40 hover:shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg">
              <MapPin className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Discover Nearby Opportunities
            </h3>
            <p className="leading-relaxed text-gray-600">
              Browse an interactive map to find volunteering opportunities close
              to home and make a local impact
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-emerald-200/40 hover:shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Track Your Volunteering Impact
            </h3>
            <p className="leading-relaxed text-gray-600">
              Log your volunteer hours and visualize the meaningful impact
              you&apos;re making in your community over time
            </p>
          </CardContent>
        </Card>

        <Card className="border-0 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:bg-rose-200/40 hover:shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-rose-500 shadow-lg">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Join a Supportive Community
            </h3>
            <p className="leading-relaxed text-gray-600">
              Connect with like-minded individuals and organizations who share
              your passion for making a difference
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
