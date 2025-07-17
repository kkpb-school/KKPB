import { Badge } from "@/components/ui/badge";
import { Award, Star, Trophy } from "lucide-react";

export function AchievementsSection() {
  const achievements = [
    {
      icon: Award,
      title: "Best School Award",
      description:
        "Recognized as the Best Secondary School in the district for 3 consecutive years",
    },
    {
      icon: Trophy,
      title: "Academic Excellence",
      description:
        "Top performance in state board examinations with 95% pass rate",
    },
    {
      icon: Star,
      title: "Innovation Award",
      description:
        "Excellence in implementing modern teaching methodologies and technology",
    },
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="secondary">Our Achievements</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Recognition & <span className="text-primary">Awards</span>
          </h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center space-y-4 p-6"
            >
              <div className="p-4 rounded-full bg-primary/10">
                <achievement.icon className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-bold">{achievement.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
