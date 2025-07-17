'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { GraduationCap, Menu } from 'lucide-react';
import Link from 'next/link';
import { AuthButton } from './auth-button';
import { SessionProvider } from 'next-auth/react';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { href: '#about', label: 'About' },
    { href: '#programs', label: 'Programs' },
    { href: '#facilities', label: 'Facilities' },
    { href: '#contact', label: 'Contact' },
    { href: '/results', label: 'Results' },
  ];

  return (
    <SessionProvider>
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <GraduationCap className="text-primary h-8 w-8" />
            <div className="flex flex-col">
              <span className="text-lg leading-none font-bold">K.K.P.B</span>
              <span className="text-muted-foreground text-xs leading-none">
                Secondary High School
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center space-x-6 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-primary text-sm font-medium transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <AuthButton />
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="mt-6 flex flex-col space-y-4">
                <div className="flex items-center space-x-2 border-b pb-4">
                  <GraduationCap className="text-primary h-6 w-6" />
                  <div className="flex flex-col">
                    <span className="font-semibold">K.K.P.B</span>
                    <span className="text-muted-foreground text-xs">
                      Secondary High School
                    </span>
                  </div>
                </div>
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:text-primary py-2 text-lg font-medium transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <AuthButton />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </SessionProvider>
  );
}
