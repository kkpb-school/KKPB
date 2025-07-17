import { Badge } from '@/components/ui/badge';
import { BookOpen, Building, Microscope, Trophy } from 'lucide-react';
import Image from 'next/image';

export function FacilitiesSection() {
  const facilities = [
    {
      icon: Microscope,
      title: 'Science Laboratories',
      description: 'Fully equipped labs for Physics, Chemistry, and Biology',
    },
    {
      icon: BookOpen,
      title: 'Digital Library',
      description: 'Extensive collection of books and digital resources',
    },
    {
      icon: Building,
      title: 'Smart Classrooms',
      description: 'Interactive whiteboards and modern teaching aids',
    },
    {
      icon: Trophy,
      title: 'Sports Complex',
      description: 'Multi-purpose courts and athletic facilities',
    },
  ];

  return (
    <section id="facilities" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-16 flex flex-col items-center space-y-4 text-center">
          <Badge variant="outline">Our Facilities</Badge>
          <h2 className="max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            World-Class <span className="text-primary">Infrastructure</span>
          </h2>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            Our state-of-the-art facilities provide students with the best
            learning environment to explore, discover, and excel in their
            academic journey.
          </p>
        </div>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            {facilities.map((facility, index) => (
              <div
                key={index}
                className="bg-card flex items-start gap-4 rounded-xl border p-6 transition-shadow hover:shadow-md"
              >
                <facility.icon className="text-primary mt-1 h-8 w-8 flex-shrink-0" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold">
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
            <div className="from-primary/10 absolute inset-0 rounded-2xl bg-gradient-to-tl to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
