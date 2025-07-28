import { BookOpen, Users } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className='relative py-16'>
      <div className='container mx-auto px-4 md:px-6'>
        <div className='grid items-center gap-8 lg:grid-cols-2 lg:gap-12'>
          <div className='flex flex-col justify-center space-y-6'>
            <div className='space-y-4'>
              <Badge variant='secondary' className='w-fit text-sm'>
                Excellence in Education Since 1985
              </Badge>
              <h1 className='text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl'>
                K.K.P.B Secondary{' '}
                <span className='text-primary'>High School</span>
              </h1>
              <p className='text-muted-foreground max-w-[600px] text-lg md:text-xl'>
                Nurturing young minds to become tomorrow&#39;s leaders through
                quality education, character development, and innovative
                learning experiences.
              </p>
            </div>
            <div className='flex flex-col gap-4 sm:flex-row'>
              <Button size='lg' className='h-12 text-base'>
                <Users className='mr-2 h-5 w-5' />
                Enroll Today
              </Button>
              <Button
                variant='outline'
                size='lg'
                className='h-12 bg-transparent text-base'
              >
                <BookOpen className='mr-2 h-5 w-5' />
                Virtual Tour
              </Button>
            </div>
          </div>
          <div className='flex items-center justify-center lg:justify-end'>
            <div className='relative'>
              <Image
                src='/placeholder.svg?height=500&width=600'
                width='600'
                height='500'
                alt='K.K.P.B Secondary High School Campus'
                className='aspect-[4/3] overflow-hidden rounded-2xl object-cover shadow-2xl'
              />
              <div className='absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent' />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
