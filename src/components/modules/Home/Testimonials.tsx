import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Music Lover",
      image: "https://i.pravatar.cc/150?img=1",
      rating: 5,
      text: "I've attended 5 concerts through Meet & Go and made amazing friends each time. Never going to events alone again!",
    },
    {
      name: "Michael Chen",
      role: "Hiking Enthusiast",
      image: "https://i.pravatar.cc/150?img=3",
      rating: 5,
      text: "Found the perfect hiking group! The platform made it so easy to connect with people who share my passion for the outdoors.",
    },
    {
      name: "Emily Rodriguez",
      role: "Board Game Fan",
      image: "https://i.pravatar.cc/150?img=5",
      rating: 5,
      text: "As someone new to the city, Meet & Go helped me build a social circle quickly. The game nights are my favorite!",
    },
  ];

  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            What Our Members Say
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Real stories from people who found their tribe
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardContent className="p-6">
                {/* Quote Icon */}
                <Quote className="mb-4 h-10 w-10 text-blue-200" />

                {/* Rating */}
                <div className="mb-4 flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="mb-6 text-gray-700">{testimonial.text}</p>

                {/* User Info */}
                <div className="flex items-center gap-3">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="h-12 w-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
