import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-20">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center text-white">
          {/* Icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
            <Sparkles className="h-8 w-8" />
          </div>

          {/* Heading */}
          <h2 className="mb-4 max-w-3xl text-3xl font-bold md:text-5xl">
            Ready to Start Your Next Adventure?
          </h2>

          {/* Subheading */}
          <p className="mb-8 max-w-2xl text-lg text-blue-100 md:text-xl">
            Join Meet & Go today and discover amazing events and people in your
            area. Your next great experience is just a click away!
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-base font-semibold"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-white bg-transparent text-base font-semibold text-white hover:bg-white/10"
            >
              Browse Events
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="mt-10 text-sm text-blue-100">
            ✓ No credit card required · ✓ Free to join · ✓ Cancel anytime
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
    </section>
  );
}
