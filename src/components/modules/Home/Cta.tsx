import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 dark:from-gray-950 dark:to-black py-20 transition-colors duration-300">
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col items-center text-center text-white">
          {/* Icon */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-transparent dark:border-gray-800">
            <Sparkles className="h-8 w-8 text-white dark:text-gray-300" />
          </div>

          {/* Heading */}
          <h2 className="mb-4 max-w-3xl text-3xl font-bold text-white md:text-5xl">
            Ready to Start Your Next Adventure?
          </h2>

          {/* Subheading */}
          <p className="mb-8 max-w-2xl text-lg text-blue-100 dark:text-gray-400 md:text-xl">
            Join Meet & Go today and discover amazing events and people in your
            area. Your next great experience is just a click away!
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-base font-semibold dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-white dark:border-gray-700 bg-transparent text-base font-semibold text-white hover:bg-white/10 dark:hover:bg-white/5"
            >
              Browse Events
            </Button>
          </div>

          {/* Trust Badge */}
          <div className="mt-10 text-sm text-blue-100 dark:text-gray-500">
            ✓ No credit card required · ✓ Free to join · ✓ Cancel anytime
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute -left-32 top-0 h-64 w-64 rounded-full bg-white/10 dark:bg-purple-500/10 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-white/10 dark:bg-blue-500/10 blur-3xl" />
    </section>
  );
}
