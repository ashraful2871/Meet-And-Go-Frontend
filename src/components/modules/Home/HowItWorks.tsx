import {
  Search,
  UserPlus,
  PartyPopper,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Discover Events",
      description:
        "Browse hundreds of exciting events near you. Filter by your interests, location, and schedule to find the perfect match.",
      features: [
        "Live search filters",
        "Personalized recommendations",
        "Real-time availability",
      ],
      color: "from-blue-500 to-cyan-500",
      gradient: "from-blue-50 to-cyan-50",
    },
    {
      icon: UserPlus,
      title: "Join & Connect",
      description:
        "Reserve your spot instantly and connect with fellow attendees. See who's coming and start building connections before the event.",
      features: ["Instant booking", "Chat with attendees", "Verified profiles"],
      color: "from-purple-500 to-pink-500",
      gradient: "from-purple-50 to-pink-50",
    },
    {
      icon: PartyPopper,
      title: "Create Memories",
      description:
        "Attend amazing events, meet incredible people, and build lasting friendships. Share your experiences and plan your next adventure.",
      features: ["Safe meetups", "Photo sharing", "Rate & review"],
      color: "from-orange-500 to-amber-500",
      gradient: "from-orange-50 to-amber-50",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20 md:py-32">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute left-0 top-0 h-full w-full bg-[radial-gradient(circle_500px_at_50%_200px,#3b82f6,transparent)]" />
      </div>

      <div className="container relative mx-auto px-4">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
            <CheckCircle2 className="h-4 w-4" />
            How It Works
          </div>
          <h2 className="mb-6 text-4xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl">
            Start Your Journey in
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              3 Simple Steps
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
            Join thousands of people who have found their perfect activity
            companions. No complicated signup, no commitments—just real
            connections.
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Progress Line (Desktop) */}
          <div className="absolute left-0 right-0 top-24 z-0 hidden h-1 md:block">
            <div className="mx-auto h-full w-[80%] bg-gradient-to-r from-blue-200 via-purple-200 to-orange-200 opacity-30" />
          </div>

          {/* Steps Grid */}
          <div className="grid gap-12 md:grid-cols-3 md:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="group relative">
                {/* Step Card */}
                <div className="relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-8 shadow-lg transition-all duration-500 hover:scale-100 hover:shadow-2xl md:p-10">
                  {/* Gradient Background Effect */}
                  <div
                    className={`absolute right-0 top-0 h-32 w-32 bg-gradient-to-br ${step.gradient} opacity-50 blur-3xl transition-opacity group-hover:opacity-70`}
                  />

                  {/* Step Number */}
                  <div className="relative mb-6 flex items-start justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 text-xl font-bold text-gray-700">
                      {index + 1}
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="hidden h-6 w-6 text-gray-300 md:block" />
                    )}
                  </div>

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div
                      className={`inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${step.color} shadow-xl transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}
                    >
                      <step.icon
                        className="h-10 w-10 text-white"
                        strokeWidth={2.5}
                      />
                    </div>
                    {/* Glow Effect */}
                    <div
                      className={`absolute inset-0 -z-10 h-20 w-20 rounded-2xl bg-gradient-to-br ${step.color} opacity-0 blur-xl transition-opacity group-hover:opacity-30`}
                    />
                  </div>

                  {/* Title */}
                  <h3 className="mb-4 text-2xl font-bold text-gray-900">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="mb-6 leading-relaxed text-gray-600">
                    {step.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {step.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center gap-3 text-sm text-gray-700"
                      >
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br ${step.color}`}
                        >
                          <CheckCircle2
                            className="h-3 w-3 text-white"
                            strokeWidth={3}
                          />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* Hover Border Effect */}
                  <div
                    className={`absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r ${step.color} transition-all duration-500 group-hover:w-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 rounded-3xl border border-gray-200 bg-gradient-to-br from-gray-50 to-white p-10 text-center shadow-lg md:p-16">
          <h3 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl">
            Ready to Find Your Tribe?
          </h3>
          <p className="mb-8 text-lg text-gray-600">
            Join over 10,000+ members who are already making memories together
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-base font-semibold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl">
              Browse Events Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
            <button className="inline-flex items-center gap-2 rounded-full border-2 border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 transition-all hover:border-gray-400 hover:bg-gray-50">
              Learn More
            </button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Free to join</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Verified members</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
              <span>Safe & secure</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
