'use client';

import type React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ImageUpload } from './image-upload';
import { ArrowLeft, Save, UserPlus, MapPin, CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateStudent } from '@/services/students';
import { toast } from 'sonner';
import axios from 'axios';
import { BloodGroups, ClassList, Genders } from '@/lib/constants';

export default function AddStudentPage() {
  const router = useRouter();
  const { mutate, isPending } = useCreateStudent();

  const [imageFile, setImageFile] = useState<File | null>(null);

  const FormSchema = z.object({
    name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
    fatherName: z
      .string()
      .min(2, { message: "Father's name must be at least 2 characters." }),
    motherName: z
      .string()
      .min(2, { message: "Mother's name must be at least 2 characters." }),
    mobile: z
      .string()
      .min(11, { message: 'Mobile number must be at least 11 characters.' }),
    rollNumber: z.string().trim().min(1, 'Roll number is required'),
    className: z.string().min(1, { message: 'Class name is required.' }), // Changed to require actual selection
    year: z.number().min(2000, { message: 'Year must be 2000 or later.' }),
    gender: z.enum(['Male', 'Female', 'Other']),
    bloodGroup: z.string().optional().or(z.literal('')), // Allow empty string
    birthDate: z.date().optional(),
    houseOrRoad: z.string().optional(),
    villageOrArea: z.string().optional(),
    postOffice: z.string().optional(),
    upazila: z.string().optional(),
    district: z.string().optional(),
    division: z.string().optional(),
    postalCode: z.string().optional(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: '',
      fatherName: '',
      motherName: '',
      mobile: '',
      rollNumber: '',
      className: '',
      year: new Date().getFullYear(),
      gender: undefined,
      bloodGroup: '',
      birthDate: undefined,
      houseOrRoad: '',
      villageOrArea: '',
      postOffice: '',
      upazila: '',
      district: '',
      division: '',
      postalCode: '',
    },
  });

  function handleImageChange(file: File | null) {
    setImageFile(file);
  }

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast.loading('Adding student...');
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else if (typeof value === 'number') {
          formData.append(key, value.toString());
        } else {
          formData.append(key, value);
        }
      }
    });

    if (imageFile) {
      formData.append('image', imageFile);
    }

    mutate(formData, {
      onSuccess: () => {
        form.reset();
        setImageFile(null);
        toast.dismiss();
        toast.success('Student added successfully!');
      },
      onError: (error) => {
        toast.dismiss();

        if (axios.isAxiosError(error)) {
          if (error.response?.status === 409) {
            toast.error('A student with this roll number already exists.');
          } else if (error.response?.status === 400) {
            toast.error('Invalid input. Please check your form.');
          } else {
            toast.error(`Server error (${error.response?.status})`);
          }
        } else {
          toast.error('Something went wrong.');
        }
      },
    });
  }

  return (
    <div className="bg-muted/30 min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 flex flex-col justify-between gap-4 sm:mb-8 sm:flex-row sm:items-center">
          <div className="flex items-start space-x-4 sm:items-center">
            <Button variant="ghost" size="sm" asChild className="shrink-0">
              <Link href="/admin/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">
                Add New Student
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Fill in the student information below
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="w-fit text-sm">
            <UserPlus className="mr-1 h-4 w-4" />
            New Registration
          </Badge>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 sm:space-y-8"
          >
            {/* Mobile-first layout */}
            <div className="space-y-6 lg:grid lg:grid-cols-12 lg:gap-8 lg:space-y-0">
              {/* Photo Section - Full width on mobile, sidebar on desktop */}
              <div className="lg:col-span-4 xl:col-span-3">
                <Card className="sticky top-20">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center text-lg">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Student Photo
                    </CardTitle>
                    <CardDescription className="text-sm">
                      Upload a clear photo of the student
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ImageUpload
                      currentImage={
                        imageFile ? URL.createObjectURL(imageFile) : null
                      }
                      onImageChange={handleImageChange}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Form Sections */}
              <div className="space-y-6 lg:col-span-8 xl:col-span-9">
                {/* Personal Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <UserPlus className="mr-2 h-5 w-5" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>
                      Basic details about the student
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Basic Details */}
                    <div className="space-y-4">
                      <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                        Basic Details
                      </h4>
                      <Separator />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter student's full name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="mobile"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mobile Number</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter student's mobile number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="fatherName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Father Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter father's name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="motherName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Mother Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter mother's name"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <FormField
                          control={form.control}
                          name="rollNumber"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Roll Number</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter roll number"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="className"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Class</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a class" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {ClassList.map((c) => (
                                    <SelectItem key={c.value} value={c.value}>
                                      {c.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="year"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Year</FormLabel>
                              <FormControl>
                                <Input
                                  type="number"
                                  placeholder="Enter year"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                      <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                        Additional Information
                      </h4>
                      <Separator />

                      <div className="grid gap-4 sm:grid-cols-3">
                        <FormField
                          control={form.control}
                          name="gender"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gender</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-10">
                                    <SelectValue placeholder="Select gender" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {Genders.map((gender) => (
                                    <SelectItem key={gender} value={gender}>
                                      {gender}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="birthDate"
                          render={({ field }) => (
                            <FormItem className="flex flex-col">
                              <FormLabel>Date of Birth</FormLabel>
                              <Popover>
                                <PopoverTrigger asChild>
                                  <FormControl>
                                    <Button
                                      variant="outline"
                                      className={cn(
                                        'h-10 w-full justify-start text-left font-normal',
                                        !field.value && 'text-muted-foreground'
                                      )}
                                    >
                                      <CalendarIcon className="mr-2 h-4 w-4" />
                                      {field.value
                                        ? format(field.value, 'PPP')
                                        : 'Select birth date'}
                                    </Button>
                                  </FormControl>
                                </PopoverTrigger>
                                <PopoverContent
                                  className="w-auto p-0"
                                  align="start"
                                >
                                  <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    captionLayout="dropdown"
                                  />
                                </PopoverContent>
                              </Popover>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="bloodGroup"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Blood Group</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="h-10">
                                    <SelectValue placeholder="Select blood group" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {BloodGroups.map((group) => (
                                    <SelectItem
                                      key={group.value}
                                      value={group.value}
                                    >
                                      {group.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Address Information */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center text-lg sm:text-xl">
                      <MapPin className="mr-2 h-5 w-5" />
                      Address Information
                    </CardTitle>
                    <CardDescription>
                      Student&#39;s residential address details
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-muted-foreground text-sm font-medium tracking-wide uppercase">
                        Address Details
                      </h4>
                      <Separator />

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="houseOrRoad"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>House/Road</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="House number or road name"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="villageOrArea"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Village/Area</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Village or area name"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <FormField
                          control={form.control}
                          name="postOffice"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Post Office</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Post office name"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="upazila"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upazila</FormLabel>
                              <FormControl>
                                <Input placeholder="Upazila" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <FormField
                          control={form.control}
                          name="district"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>District</FormLabel>
                              <FormControl>
                                <Input placeholder="District" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="division"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Division</FormLabel>
                              <FormControl>
                                <Input placeholder="Division" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                          <FormField
                            control={form.control}
                            name="postalCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Postal Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="Postal Code" {...field} />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Submit Section */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col justify-end gap-3 sm:flex-row sm:gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="order-2 sm:order-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="order-1 min-w-[120px] sm:order-2"
                    disabled={isPending}
                  >
                    {isPending ? 'Adding...' : 'Add Student'}
                    <Save className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </form>
        </Form>
      </div>
    </div>
  );
}
