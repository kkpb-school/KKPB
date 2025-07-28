import { Calculator, Globe, Trophy } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export function ProgramsSection() {
  const programs = [
    {
      icon: Calculator,
      title: 'Science & Mathematics',
      description:
        'Advanced courses in Physics, Chemistry, Biology, and Mathematics with hands-on laboratory experience.',
      subjects: [
        'Advanced Mathematics',
        'Physics & Chemistry Labs',
        'Biology & Life Sciences',
        'Computer Science',
      ],
    },
    {
      icon: Globe,
      title: 'Arts & Humanities',
      description:
        'Comprehensive programs in literature, history, languages, and social sciences to develop critical thinking.',
      subjects: [
        'English Literature',
        'History & Geography',
        'Foreign Languages',
        'Social Studies',
      ],
    },
    {
      icon: Trophy,
      title: 'Sports & Activities',
      description:
        'Extensive extracurricular programs including sports, arts, music, and leadership development activities.',
      subjects: [
        'Athletic Programs',
        'Music & Drama',
        'Student Council',
        'Community Service',
      ],
    },
  ];

  return (
    <section id='programs' className='bg-muted/30 py-16'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='mb-16 flex flex-col items-center space-y-4 text-center'>
          <Badge variant='secondary'>Academic Programs</Badge>
          <h2 className='max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
            Comprehensive <span className='text-primary'>Education</span>
          </h2>
          <p className='text-muted-foreground max-w-3xl text-lg leading-relaxed'>
            Our diverse academic programs are designed to cater to different
            interests and career paths, ensuring every student finds their
            passion and excels in their chosen field.
          </p>
        </div>
        <div className='grid gap-8 md:grid-cols-2 lg:grid-cols-3'>
          {programs.map((program) => (
            <Card
              key={program.title}
              className='h-full transition-shadow hover:shadow-lg'
            >
              <CardHeader className='space-y-4'>
                <program.icon className='text-primary h-12 w-12' />
                <div>
                  <CardTitle className='text-xl'>{program.title}</CardTitle>
                  <CardDescription className='mt-2 text-base'>
                    {program.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <ul className='space-y-2'>
                  {program.subjects.map((subject) => (
                    <li key={subject} className='flex items-center text-sm'>
                      <span className='bg-primary mr-3 h-2 w-2 flex-shrink-0 rounded-full' />
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
