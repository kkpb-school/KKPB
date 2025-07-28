'use client';

import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

export function AuthButton() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <Button asChild size='sm'>
        <Link href='/login'>Admin Login</Link>
      </Button>
    );
  }

  return (
    <div className='flex items-center gap-2 sm:gap-4'>
      {/* Dashboard Link */}
      <Button asChild size='sm' variant='link'>
        <Link href='/admin/dashboard'>Dashboard</Link>
      </Button>

      {/* Logout with confirmation */}
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant='destructive' size='sm'>
            Logout
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              You will be logged out and redirected to the login page.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              Logout
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
