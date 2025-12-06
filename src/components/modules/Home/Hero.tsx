import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Users, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-[600px] overflow-hidden md:h-[700px] lg:h-[850px]">
      {/* Full Banner Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=1920&h=1080&fit=crop&q=80"
          alt="Group of people enjoying events together"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        {/* Dark Overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center pb-32 lg:pb-48">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
              <Users className="h-4 w-4" />
              Join 10,000+ active members
            </div>

            {/* Heading */}
            <h1 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
              Never Miss Out on
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Amazing Events
              </span>
              Again
            </h1>

            {/* Subheading */}
            <p className="mb-8 text-lg text-gray-200 md:text-xl lg:text-2xl">
              Connect with like-minded people for concerts, sports, hobbies, and
              adventures. Find your perfect activity companion today.
            </p>

            {/* CTA Buttons */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row lg:mb-12">
              <Button
                size="lg"
                className="gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-base hover:from-blue-700 hover:to-purple-700"
              >
                Explore Events
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-2 border-white bg-transparent text-base text-white hover:bg-white hover:text-gray-900"
              >
                <Calendar className="h-5 w-5" />
                Create Event
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-white/20 pt-6">
              <div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-white md:text-4xl">
                    10K+
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-300">Active Users</div>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-white md:text-4xl">
                    500+
                  </div>
                </div>
                <div className="mt-1 text-sm text-gray-300">Events Monthly</div>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <div className="text-3xl font-bold text-white md:text-4xl">
                    4.9
                  </div>
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                </div>
                <div className="mt-1 text-sm text-gray-300">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Preview Cards - Floating at bottom */}
      <div className="absolute bottom-6 left-0 right-0 z-20 hidden lg:block">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            {/* Card 1 */}
            <div className="group relative h-32 w-48 overflow-hidden rounded-xl shadow-2xl transition-transform hover:scale-105">
              <Image
                src="https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&h=300&fit=crop&q=80"
                alt="Music concerts and live events"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm font-bold text-white">Music & Concerts</p>
                <p className="text-xs text-gray-300">150+ events</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative h-32 w-48 overflow-hidden rounded-xl shadow-2xl transition-transform hover:scale-105">
              <Image
                src="https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop&q=80"
                alt="Outdoor adventures and hiking"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm font-bold text-white">
                  Outdoor & Adventure
                </p>
                <p className="text-xs text-gray-300">200+ events</p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group relative h-32 w-48 overflow-hidden rounded-xl shadow-2xl transition-transform hover:scale-105">
              <Image
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop&q=80"
                alt="Food and dining experiences"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm font-bold text-white">Food & Dining</p>
                <p className="text-xs text-gray-300">120+ events</p>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group relative h-32 w-48 overflow-hidden rounded-xl shadow-2xl transition-transform hover:scale-105">
              <Image
                src="https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop&q=80"
                alt="Sports and fitness activities"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 192px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-sm font-bold text-white">Sports & Fitness</p>
                <p className="text-xs text-gray-300">180+ events</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 lg:hidden">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-5 rounded-full border-2 border-white/50">
            <div className="mx-auto mt-2 h-2 w-1 animate-bounce rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </section>
  );
}
