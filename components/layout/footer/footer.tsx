import { GraduationCap } from 'lucide-react';

export function Footer() {
  return (
    <footer className='bg-muted/30 border-t'>
      <div className='container mx-auto px-4 py-8 md:px-6'>
        <div className='flex flex-col items-center justify-between gap-4 sm:flex-row'>
          <div className='flex items-center space-x-3'>
            <GraduationCap className='text-primary h-6 w-6' />
            <span className='font-medium'>K.K.P.B Secondary High School</span>
          </div>
          <p className='text-muted-foreground text-sm'>
            © 2024 K.K.P.B Secondary High School. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
