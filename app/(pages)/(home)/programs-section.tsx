import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calculator, Globe, Trophy } from "lucide-react";

export function ProgramsSection() {
  const programs = [
    {
      icon: Calculator,
      title: "Science & Mathematics",
      description:
        "Advanced courses in Physics, Chemistry, Biology, and Mathematics with hands-on laboratory experience.",
      subjects: [
        "Advanced Mathematics",
        "Physics & Chemistry Labs",
        "Biology & Life Sciences",
        "Computer Science",
      ],
    },
    {
      icon: Globe,
      title: "Arts & Humanities",
      description:
        "Comprehensive programs in literature, history, languages, and social sciences to develop critical thinking.",
      subjects: [
        "English Literature",
        "History & Geography",
        "Foreign Languages",
        "Social Studies",
      ],
    },
    {
      icon: Trophy,
      title: "Sports & Activities",
      description:
        "Extensive extracurricular programs including sports, arts, music, and leadership development activities.",
      subjects: [
        "Athletic Programs",
        "Music & Drama",
        "Student Council",
        "Community Service",
      ],
    },
  ];

  return (
    <section id="programs" className="py-16 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <Badge variant="secondary">Academic Programs</Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-3xl">
            Comprehensive <span className="text-primary">Education</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Our diverse academic programs are designed to cater to different
            interests and career paths, ensuring every student finds their
            passion and excels in their chosen field.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program, index) => (
            <Card
              key={index}
              className="h-full hover:shadow-lg transition-shadow"
            >
              <CardHeader className="space-y-4">
                <program.icon className="h-12 w-12 text-primary" />
                <div>
                  <CardTitle className="text-xl">{program.title}</CardTitle>
                  <CardDescription className="text-base mt-2">
                    {program.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {program.subjects.map((subject, subIndex) => (
                    <li key={subIndex} className="text-sm flex items-center">
                      <span className="w-2 h-2 bg-primary rounded-full mr-3 flex-shrink-0" />
                      {subject}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
