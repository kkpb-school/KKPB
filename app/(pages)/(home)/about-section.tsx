import { Star } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';

export function AboutSection() {
  const features = [
    'Experienced and qualified teaching staff',
    'Modern facilities and learning resources',
    'Holistic development approach',
  ];

  return (
    <section id='about' className='py-16'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid items-center gap-12 lg:grid-cols-2 lg:gap-16'>
          <div className='relative'>
            <Image
              src='/placeholder.svg?height=400&width=550'
              width='550'
              height='400'
              alt='Students in classroom'
              className='aspect-video overflow-hidden rounded-2xl object-cover shadow-xl'
            />
            <div className='from-primary/10 absolute inset-0 rounded-2xl bg-gradient-to-br to-transparent' />
          </div>
          <div className='flex flex-col justify-center space-y-6'>
            <div className='space-y-4'>
              <Badge variant='outline' className='w-fit'>
                About Our School
              </Badge>
              <h2 className='text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl'>
                Shaping Future <span className='text-primary'>Leaders</span>
              </h2>
              <p className='text-muted-foreground text-lg leading-relaxed'>
                At K.K.P.B Secondary High School, we believe every student has
                the potential to excel. Our dedicated faculty and comprehensive
                curriculum ensure students receive the best education while
                developing critical thinking, creativity, and leadership skills.
              </p>
            </div>
            <ul className='space-y-4'>
              {features.map((feature) => (
                <li key={feature} className='flex items-center gap-3'>
                  <Star className='text-primary h-5 w-5 flex-shrink-0' />
                  <span className='text-base'>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
