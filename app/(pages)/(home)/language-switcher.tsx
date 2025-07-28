'use client';

import { Globe } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  return (
    <div className='flex items-center space-x-2'>
      <Globe className='h-4 w-4' />
      <div className='flex space-x-1'>
        <Button variant='ghost' size='sm' asChild>
          <Link href='/'>English</Link>
        </Button>
        <Button variant='ghost' size='sm' asChild>
          <Link href='/bn'>বাংলা</Link>
        </Button>
      </div>
    </div>
  );
}
