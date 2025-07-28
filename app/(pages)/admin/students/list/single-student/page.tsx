'use client';

import {
  CalendarDays,
  FileText,
  GraduationCap,
  Heart,
  MapPin,
  Phone,
  User,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { useSingleStudent } from '@/services/students';

interface Student {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  gender?: 'Male' | 'Female' | 'Other' | null;
  bloodGroup?: string;
  address?: {
    houseOrRoad?: string;
    villageOrArea?: string;
    postOffice?: string;
    upazila?: string;
    district?: string;
    division?: string;
    postalCode?: string;
  };
  birthDate?: string;
  images?: {
    url: string;
    publicId: string;
    alt?: string;
  };
  status: 'Active' | 'Inactive' | 'Graduated' | 'Transferred' | 'Dropped_out';
  classRecords: Array<{
    id: string;
    studentId: string;
    className: string;
    rollNumber: number;
    year: number;
    results: Array<{
      id: string;
      classRecordId: string;
      type: 'Mid_Term' | 'Final';
      subjects: Record<
        string,
        {
          writtenMark: number;
          mcqMark: number;
          totalMark: number;
          maxWrittenMark: number;
          maxMcqMark: number;
          maxTotalMark: number;
          grade: string;
        }
      >;
      createdAt: string;
      updatedAt: string;
    }>;
  }>;
  createdAt: string;
  updatedAt: string;
}

function StudentProfileSkeleton() {
  return (
    <div className='container mx-auto space-y-6 p-6'>
      <Card>
        <CardHeader>
          <div className='flex items-center space-x-4'>
            <Skeleton className='h-20 w-20 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-8 w-48' />
              <Skeleton className='h-4 w-32' />
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
          </CardHeader>
          <CardContent className='space-y-4'>
            {Array.from({ length: 6 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: list order is static and won’t change
              <div key={i} className='flex justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <Skeleton className='h-6 w-32' />
          </CardHeader>
          <CardContent className='space-y-4'>
            {Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: list order is static and won’t change
              <div key={i} className='flex justify-between'>
                <Skeleton className='h-4 w-24' />
                <Skeleton className='h-4 w-32' />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getStatusColor(status: string) {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Graduated':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Transferred':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Inactive':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    case 'Dropped_out':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function formatClassName(className: string) {
  return className.replace(/_/g, ' ');
}

function SingleStudentContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id') || '';
  const { isPending, data, isError } = useSingleStudent({ id });

  // Extract student data from the json wrapper
  const student: Student | null = data || null;

  if (isPending) {
    return <StudentProfileSkeleton />;
  }

  if (isError || !student) {
    return (
      <div className='container mx-auto p-6'>
        <Alert variant='destructive'>
          <AlertDescription>
            Failed to load student information. Please try again later.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className='container mx-auto space-y-6 p-6'>
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className='flex flex-col items-start space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-6'>
            <Avatar className='h-20 w-20'>
              <AvatarImage
                src={student.images?.url || '/placeholder.svg'}
                alt={student.images?.alt || student.name}
              />
              <AvatarFallback className='text-lg font-semibold'>
                {getInitials(student.name)}
              </AvatarFallback>
            </Avatar>

            <div className='flex-1 space-y-2'>
              <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                <h1 className='text-3xl font-bold text-gray-900'>
                  {student.name}
                </h1>
                <Badge className={getStatusColor(student.status)}>
                  {student.status.replace(/_/g, ' ')}
                </Badge>
              </div>
              <p className='text-gray-600'>Student ID: {student.id}</p>
              <p className='text-sm text-gray-500'>
                Member since {new Date(student.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <User className='h-5 w-5' />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='grid grid-cols-1 gap-4'>
              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-600'>
                  Full Name
                </span>
                <span className='text-sm font-semibold'>{student.name}</span>
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-600'>
                  Father&#39;s Name
                </span>
                <span className='text-sm'>{student.fatherName}</span>
              </div>

              <div className='flex items-center justify-between'>
                <span className='text-sm font-medium text-gray-600'>
                  Mother&#39;s Name
                </span>
                <span className='text-sm'>{student.motherName}</span>
              </div>

              <Separator />

              <div className='flex items-center justify-between'>
                <span className='flex items-center gap-1 text-sm font-medium text-gray-600'>
                  <Phone className='h-4 w-4' />
                  Mobile
                </span>
                <span className='text-sm'>{student.mobile}</span>
              </div>

              {student.gender && (
                <div className='flex items-center justify-between'>
                  <span className='text-sm font-medium text-gray-600'>
                    Gender
                  </span>
                  <span className='text-sm'>{student.gender}</span>
                </div>
              )}

              {student.bloodGroup && (
                <div className='flex items-center justify-between'>
                  <span className='flex items-center gap-1 text-sm font-medium text-gray-600'>
                    <Heart className='h-4 w-4' />
                    Blood Group
                  </span>
                  <Badge variant='outline'>
                    {student.bloodGroup.replace(/_/g, ' ')}
                  </Badge>
                </div>
              )}

              {student.birthDate && (
                <div className='flex items-center justify-between'>
                  <span className='flex items-center gap-1 text-sm font-medium text-gray-600'>
                    <CalendarDays className='h-4 w-4' />
                    Birth Date
                  </span>
                  <span className='text-sm'>
                    {new Date(student.birthDate).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Address Information */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <MapPin className='h-5 w-5' />
              Address Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {student.address ? (
                <div className='space-y-3'>
                  {student.address.houseOrRoad && (
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-600'>
                        House/Road
                      </span>
                      <span className='text-sm'>
                        {student.address.houseOrRoad}
                      </span>
                    </div>
                  )}

                  {student.address.villageOrArea && (
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-600'>
                        Village/Area
                      </span>
                      <span className='text-sm'>
                        {student.address.villageOrArea}
                      </span>
                    </div>
                  )}

                  {student.address.postOffice && (
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-600'>
                        Post Office
                      </span>
                      <span className='text-sm'>
                        {student.address.postOffice}
                      </span>
                    </div>
                  )}

                  {student.address.upazila && (
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-600'>
                        Upazila
                      </span>
                      <span className='text-sm'>{student.address.upazila}</span>
                    </div>
                  )}

                  {student.address.district && (
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-600'>
                        District
                      </span>
                      <span className='text-sm'>
                        {student.address.district}
                      </span>
                    </div>
                  )}

                  {student.address.division && (
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-600'>
                        Division
                      </span>
                      <span className='text-sm'>
                        {student.address.division}
                      </span>
                    </div>
                  )}

                  {student.address.postalCode && (
                    <div className='flex items-center justify-between'>
                      <span className='text-sm font-medium text-gray-600'>
                        Postal Code
                      </span>
                      <span className='text-sm'>
                        {student.address.postalCode}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <p className='text-sm text-gray-500 italic'>
                  No address information available
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Academic Records */}
      <Card>
        <CardHeader>
          <CardTitle className='flex items-center gap-2'>
            <GraduationCap className='h-5 w-5' />
            Academic Records
          </CardTitle>
        </CardHeader>
        <CardContent>
          {student.classRecords && student.classRecords.length > 0 ? (
            <div className='space-y-6'>
              {student.classRecords.map((record) => (
                <div
                  key={record.id}
                  className='space-y-4 rounded-lg border p-4'
                >
                  <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                    <div className='flex items-center gap-3'>
                      <Badge variant='secondary' className='text-sm'>
                        {formatClassName(record.className)}
                      </Badge>
                      <span className='text-sm text-gray-600'>
                        Roll: {record.rollNumber}
                      </span>
                      <span className='text-sm text-gray-600'>
                        Year: {record.year}
                      </span>
                    </div>
                  </div>

                  {record.results && record.results.length > 0 && (
                    <div className='space-y-4'>
                      <h4 className='flex items-center gap-1 text-sm font-medium text-gray-700'>
                        <FileText className='h-4 w-4' />
                        Exam Results
                      </h4>
                      {record.results.map((result) => (
                        <div
                          key={result.id}
                          className='space-y-3 rounded-lg border p-4'
                        >
                          <div className='flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between'>
                            <Badge variant='outline' className='w-fit'>
                              {result.type.replace(/_/g, ' ')}
                            </Badge>
                            <span className='text-xs text-gray-500'>
                              {new Date(result.createdAt).toLocaleDateString()}
                            </span>
                          </div>

                          {result.subjects &&
                            typeof result.subjects === 'object' && (
                              <div className='space-y-3'>
                                <div className='grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3'>
                                  {Object.entries(result.subjects).map(
                                    ([subject, scores]) => (
                                      <div
                                        key={subject}
                                        className='flex items-center justify-between rounded bg-gray-50 p-2'
                                      >
                                        <span className='truncate text-sm font-medium text-gray-700'>
                                          {subject}
                                        </span>
                                        <div className='flex items-center gap-2'>
                                          <span className='text-sm font-bold'>
                                            {scores.totalMark}/
                                            {scores.maxTotalMark}
                                          </span>
                                          <Badge
                                            variant='secondary'
                                            className={`text-xs ${
                                              scores.grade === 'A+'
                                                ? 'bg-green-100 text-green-800'
                                                : scores.grade === 'A'
                                                  ? 'bg-blue-100 text-blue-800'
                                                  : scores.grade === 'A-'
                                                    ? 'bg-yellow-100 text-yellow-800'
                                                    : 'bg-gray-100 text-gray-800'
                                            }`}
                                          >
                                            {scores.grade}
                                          </Badge>
                                        </div>
                                      </div>
                                    ),
                                  )}
                                </div>

                                {/* Simple Overall Summary */}
                                <div className='mt-3 rounded-lg bg-blue-50 p-3'>
                                  <div className='flex items-center justify-between text-sm'>
                                    <span className='font-medium text-blue-700'>
                                      Overall Average:
                                    </span>
                                    <span className='font-bold text-blue-800'>
                                      {(
                                        Object.values(result.subjects).reduce(
                                          (sum, subject) =>
                                            sum +
                                            (subject.totalMark /
                                              subject.maxTotalMark) *
                                              100,
                                          0,
                                        ) / Object.keys(result.subjects).length
                                      ).toFixed(1)}
                                      %
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className='py-8 text-center'>
              <GraduationCap className='mx-auto mb-4 h-12 w-12 text-gray-400' />
              <p className='text-gray-500'>No academic records found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function SingleStudentPage() {
  return (
    <Suspense fallback={<StudentProfileSkeleton />}>
      <SingleStudentContent />
    </Suspense>
  );
}
