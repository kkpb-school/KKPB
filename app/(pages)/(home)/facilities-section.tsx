import { Badge } from "@/components/ui/badge";
import { BookOpen, Building, Microscope, Trophy } from "lucide-react";
import Image from "next/image";

export function FacilitiesSection() {
  const facilities = [
    {
      icon: Microscope,
      title: "Science Laboratories",
      description: "Fully equipped labs for Physics, Chemistry, and Biology",
    },
    {
      icon: BookOpen,
      title: "Digital Library",
      description: "Extensive collection of books and digital resources",
    },
    {
      icon: Building,
      title: "Smart Classrooms",
      description: "Interactive whiteboards and modern teaching aids",
    },
    {
      icon: Trophy,
      title: "Sports Complex",
      description: "Multi-purpose courts and athletic facilities",
    },
  ];

  return (
    <section id="facilities" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="outline">Our Facilities</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl">
            World-Class <span className="text-primary">Infrastructure</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Our state-of-the-art facilities provide students with the best
            learning environment to explore, discover, and excel in their
            academic journey.
          </p>
        </div>
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-6">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-xl border bg-card hover:shadow-md transition-shadow"
              >
                <facility.icon className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">
                    {facility.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {facility.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="relative">
            <Image
              src="/placeholder.svg?height=400&width=500"
              width="500"
              height="400"
              alt="School facilities"
              className="aspect-video overflow-hidden rounded-2xl object-cover shadow-xl"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-tl from-primary/10 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
