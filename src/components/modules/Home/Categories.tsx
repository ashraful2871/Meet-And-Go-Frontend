import {
  Music,
  Plane,
  Dumbbell,
  Palette,
  Utensils,
  Gamepad2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function Categories() {
  const categories = [
    {
      icon: Music,
      name: "Music & Concerts",
      count: 156,
      color: "from-pink-500 to-rose-500",
    },
    {
      icon: Plane,
      name: "Travel & Adventure",
      count: 89,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Dumbbell,
      name: "Sports & Fitness",
      count: 234,
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: Palette,
      name: "Arts & Culture",
      count: 67,
      color: "from-purple-500 to-violet-500",
    },
    {
      icon: Utensils,
      name: "Food & Dining",
      count: 123,
      color: "from-orange-500 to-amber-500",
    },
    {
      icon: Gamepad2,
      name: "Gaming & Tech",
      count: 98,
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section className="bg-white py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Explore Categories
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Find events that match your interests and passions
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Card
              key={index}
              className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  {/* Icon */}
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${category.color} text-white shadow-md transition-transform group-hover:scale-110`}
                  >
                    <category.icon className="h-8 w-8" />
                  </div>

                  {/* Info */}
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-gray-900">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {category.count} events
                    </p>
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
