'use client';

import { format, getYear } from 'date-fns';
import { AlertCircle, Printer, RotateCcw, Search } from 'lucide-react';
import Image from 'next/image';
import React, { useMemo, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Table, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClassList } from '@/lib/constants';
import { calculateGPAAndGrade, formatOrdinalDay } from '@/lib/utils';
import { useGetResults } from '@/services/results';

const testTypes = ['Mid_Term', 'Yearly'];
const currentYear = getYear(new Date());
const startYear = 2020;
const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) =>
  (currentYear - i).toString(),
);

export default function SearchResults() {
  const [searchData, setSearchData] = useState({
    rollNumber: '',
    className: '',
    testName: '',
    year: '',
  });
  const [queryParams, setQueryParams] = useState<{
    rollNumber: string;
    className: string;
    testName: string;
    year: string;
  } | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const { isFetching, data, isError, isSuccess } = useGetResults({
    roll: queryParams?.rollNumber,
    className: queryParams?.className,
    test: queryParams?.testName,
    year: queryParams?.year,
  });

  const resultData = data;

  const handleSearch = () => {
    setError('');
    if (
      !searchData.rollNumber ||
      !searchData.className ||
      !searchData.testName ||
      !searchData.year
    ) {
      setError('Please fill in all required fields');
      return;
    }
    setQueryParams(searchData);
  };

  React.useEffect(() => {
    if (isSuccess && data) {
      setShowResults(true);
      setError('');
    } else if (isSuccess && !data) {
      setError(
        'No results found. Please check your information and try again.',
      );
      setShowResults(false);
    } else if (isError) {
      setError(
        'An error occurred. Please check your information and try again.',
      );
      setShowResults(false);
    }
  }, [data, isError, isSuccess]);

  const resetSearch = () => {
    setShowResults(false);
    setSearchData({ rollNumber: '', className: '', testName: '', year: '' });
    setQueryParams(null);
    setError('');
  };

  const { gpa, grade } = useMemo(() => {
    if (!resultData?.subjects) return { gpa: null, grade: null };
    return calculateGPAAndGrade(resultData.subjects);
  }, [resultData?.subjects]);

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({
    contentRef,
    documentTitle: 'Result',
  });

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Print-specific CSS */}
      <style jsx>{`
        @media print {
          body * {
            visibility: hidden;
          }
          .print-content,
          .print-content * {
            visibility: visible;
          }
          .print-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 0;
          }
          @page {
            margin: 1cm; /* Adjust page margins */
          }
          /* Hide browser-added headers and footers */
          header,
          footer,
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <div className='mx-auto max-w-4xl p-6'>
        <div className='no-print mb-8 text-center'>
          <h1 className='mb-2 text-3xl font-bold text-gray-900'>
            Student Result Portal
          </h1>
          <p className='text-gray-600'>
            Search and view your examination results
          </p>
        </div>

        <Card className='no-print shadow-sm'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <Search className='h-5 w-5' />
              Search Your Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='mb-6 grid grid-cols-1 gap-4 md:grid-cols-2'>
              <div>
                <Label htmlFor='rollNumber' className='text-sm font-medium'>
                  Roll Number *
                </Label>
                <Input
                  id='rollNumber'
                  type='number'
                  placeholder='Enter roll number'
                  value={searchData.rollNumber}
                  onChange={(e) =>
                    setSearchData({ ...searchData, rollNumber: e.target.value })
                  }
                  className='mt-1'
                />
              </div>
              <div>
                <Label className='text-sm font-medium'>Class *</Label>
                <Select
                  value={searchData.className}
                  onValueChange={(value) =>
                    setSearchData({ ...searchData, className: value })
                  }
                >
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Select class' />
                  </SelectTrigger>
                  <SelectContent>
                    {ClassList.map((cls) => (
                      <SelectItem key={cls.value} value={cls.value}>
                        {cls.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className='text-sm font-medium'>Examination *</Label>
                <Select
                  value={searchData.testName}
                  onValueChange={(value) =>
                    setSearchData({ ...searchData, testName: value })
                  }
                >
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Select examination' />
                  </SelectTrigger>
                  <SelectContent>
                    {testTypes.map((test) => (
                      <SelectItem key={test} value={test}>
                        {test.replace('_', ' ')}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className='text-sm font-medium'>Year *</Label>
                <Select
                  value={searchData.year}
                  onValueChange={(value) =>
                    setSearchData({ ...searchData, year: value })
                  }
                >
                  <SelectTrigger className='mt-1'>
                    <SelectValue placeholder='Select year' />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {error && (
              <Alert className='mb-4 border-red-200 bg-red-50'>
                <AlertCircle className='h-4 w-4 text-red-600' />
                <AlertDescription className='text-red-800'>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className='flex justify-center'>
              <Button
                onClick={handleSearch}
                disabled={isFetching}
                className='px-8'
              >
                {isFetching ? (
                  <>
                    <div className='mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white'></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className='mr-2 h-4 w-4' />
                    Search Results
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {showResults && (
          <div className='no-print mt-6 flex justify-center gap-4'>
            <Button variant='outline' onClick={reactToPrintFn}>
              <Printer className='mr-2 h-4 w-4' />
              Print Result
            </Button>
            <Button onClick={resetSearch} variant='outline'>
              <RotateCcw className='mr-2 h-4 w-4' />
              New Search
            </Button>
          </div>
        )}

        {resultData && (
          <div className='mt-8'>
            <Card className='shadow-sm'>
              <CardHeader className='no-print'>
                <CardTitle>Result Sheet Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className='rounded-lg bg-gray-50 p-4'>
                  <div ref={contentRef} className='print-content'>
                    <div className='mx-auto max-w-4xl bg-white p-8'>
                      <div className='mb-6 border-b-2 border-black pb-4 text-center'>
                        <h2 className='mb-1 text-lg font-bold'>
                          K.K.P.B Secondary High School
                        </h2>
                        <p className='mb-1 text-sm'>
                          KrishnaPur, Jhenaidah, Khulna
                        </p>
                        <p className='mb-1 text-sm'>EIIN: 116508</p>
                        <p className='mb-1 text-sm'>
                          YEAR: {resultData.classRecord?.year}
                        </p>
                        <p className='mb-1 text-sm'>
                          CLASS:{' '}
                          {resultData.classRecord?.className?.replace('_', ' ')}
                        </p>
                        <p className='text-sm'>
                          Name of Exam: {resultData.type?.replace('_', ' ')}
                        </p>
                      </div>

                      <div className='mb-6 flex'>
                        <div className='flex-1 space-y-1 text-sm'>
                          <div className='flex'>
                            <span className='w-28 font-medium'>Name:</span>
                            <span className='font-semibold capitalize'>
                              {resultData.classRecord?.student?.name}
                            </span>
                          </div>
                          <div className='flex'>
                            <span className='w-28 font-medium'>Roll No:</span>
                            <span>{resultData.classRecord?.rollNumber}</span>
                          </div>
                          <div className='flex'>
                            <span className='w-28 font-medium'>
                              Father Name:
                            </span>
                            <span className='capitalize'>
                              {resultData.classRecord?.student?.fatherName}
                            </span>
                          </div>
                          <div className='flex'>
                            <span className='w-28 font-medium'>
                              Mother Name:
                            </span>
                            <span className='capitalize'>
                              {resultData.classRecord?.student?.motherName}
                            </span>
                          </div>
                        </div>

                        <div className='ml-8 flex-1 space-y-1 text-sm'>
                          <div className='flex'>
                            <span className='w-28 font-medium'>
                              Birth Date:
                            </span>
                            <span>
                              {resultData.classRecord?.student?.birthDate
                                ? (() => {
                                    const birthDate = new Date(
                                      resultData.classRecord.student.birthDate,
                                    );
                                    const day = formatOrdinalDay(
                                      birthDate.getDate(),
                                    );
                                    const monthYear = format(
                                      birthDate,
                                      'MMMM yyyy',
                                    );
                                    return `${day} ${monthYear}`;
                                  })()
                                : 'N/A'}
                            </span>
                          </div>
                          <div className='flex'>
                            <span className='w-28 font-medium'>GPA:</span>
                            <span className='capitalize'>
                              {grade === 'F' ? 'N/A' : gpa}
                            </span>
                          </div>
                          <div className='flex'>
                            <span className='w-28 font-medium'>Grade:</span>
                            <span className='capitalize'>{grade}</span>
                          </div>
                          <div className='flex'>
                            <span className='w-28 font-medium'>Session:</span>
                            <span className='capitalize'>
                              {resultData.classRecord?.year}
                            </span>
                          </div>
                        </div>

                        <div className='ml-4'>
                          {resultData.classRecord?.student?.images?.url ? (
                            <Image
                              src={resultData.classRecord.student.images.url}
                              alt={
                                resultData.classRecord.student.images.alt ||
                                'Student Photo'
                              }
                              height={100}
                              width={100}
                              className='h-24 w-20 border object-cover'
                            />
                          ) : (
                            <div className='flex h-24 w-20 items-center justify-center border text-xs text-gray-500'>
                              Photo
                            </div>
                          )}
                        </div>
                      </div>

                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead className='border px-2 py-1 text-left font-bold'>
                              #
                            </TableHead>
                            <TableHead className='border px-2 py-1 text-left font-bold'>
                              Subject
                            </TableHead>
                            <TableHead className='border px-2 py-1 text-center font-bold'>
                              Out Of
                            </TableHead>
                            <TableHead className='border px-2 py-1 text-center font-bold'>
                              Written
                            </TableHead>
                            <TableHead className='border px-2 py-1 text-center font-bold'>
                              MCQ
                            </TableHead>
                            <TableHead className='border px-2 py-1 text-center font-bold'>
                              Total
                            </TableHead>
                            <TableHead className='border px-2 py-1 text-center font-bold'>
                              Grade
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <tbody>
                          {Object.entries(resultData.subjects || {}).map(
                            //  biome-ignore lint/suspicious/noExplicitAny: we don't know the type
                            ([subjectName, marks]: [string, any], index) => (
                              // biome-ignore lint/suspicious/noArrayIndexKey: list order is static and won’t change
                              <tr key={index}>
                                <td className='border px-2 py-1'>
                                  {index + 1}
                                </td>
                                <td className='border px-2 py-1'>
                                  {subjectName}
                                </td>
                                <td className='border px-2 py-1 text-center'>
                                  {marks.maxTotalMark}
                                </td>
                                <td className='border px-2 py-1 text-center'>
                                  {marks.writtenMark}
                                </td>
                                <td className='border px-2 py-1 text-center'>
                                  {marks.mcqMark}
                                </td>
                                <td className='border px-2 py-1 text-center font-semibold'>
                                  {marks.totalMark}
                                </td>
                                <td className='border px-2 py-1 text-center font-semibold'>
                                  {marks.grade}
                                </td>
                              </tr>
                            ),
                          )}
                        </tbody>
                      </Table>

                      <div className='mt-16 flex justify-between'>
                        <div className='text-center'>
                          <div className='w-40 border-t border-black pt-2'>
                            <p className='text-sm font-medium'>
                              Guardian Signature
                            </p>
                          </div>
                        </div>
                        <div className='text-center'>
                          <div className='w-40 border-t border-black pt-2'>
                            <p className='text-sm font-medium'>
                              Headmaster Signature
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
