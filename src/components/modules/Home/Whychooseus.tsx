import { Shield, Heart, Clock, Star } from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: Shield,
      title: "Safe & Secure",
      description:
        "Verified profiles and secure payment processing ensure your safety and peace of mind.",
    },
    {
      icon: Heart,
      title: "Build Connections",
      description:
        "Meet genuine people who share your interests and create lasting friendships.",
    },
    {
      icon: Clock,
      title: "Easy to Use",
      description:
        "Simple interface lets you find and join events in just a few clicks.",
    },
    {
      icon: Star,
      title: "Quality Events",
      description:
        "Curated experiences hosted by passionate individuals and verified organizers.",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 to-purple-600 py-20 text-white">
      <div className="container relative z-10 mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Why Choose Meet & Go?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Join thousands of people who have found their perfect activity
            companions
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              {/* Icon */}
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
                <feature.icon className="h-10 w-10" />
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>

              {/* Description */}
              <p className="text-blue-100">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 gap-8 border-t border-white/20 pt-12 md:grid-cols-4">
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold">10K+</div>
            <div className="text-blue-100">Active Members</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold">500+</div>
            <div className="text-blue-100">Monthly Events</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold">50+</div>
            <div className="text-blue-100">Cities Covered</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-4xl font-bold">4.9★</div>
            <div className="text-blue-100">Average Rating</div>
          </div>
        </div>
      </div>

      {/* Decorative Background */}
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
    </section>
  );
}
