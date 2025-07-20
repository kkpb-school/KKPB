'use client';

import { useState, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Printer, RotateCcw, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock data for search results
const mockResults = {
  school: {
    name: 'JHENIDAH GOVT. SECONDARY GIRLS SCHOOL',
    address: 'JHENIDAH SADAR, JHENIDAH',
    eiin: '116450',
  },
  student: {
    name: 'FARHANA KHAN',
    rollNumber: 7,
    className: 'Eight',
    year: '2023',
    fatherName: 'MD. GOLAM MOZID KHAN',
    motherName: 'SAMINA AKTER',
    session: '2023',
    studentId: '4408740',
    section: 'B',
    shift: 'Day',
    grade: 'A',
    meritPosition: 11,
    publishDate: '28/12/2023',
  },
  test: {
    name: 'Yearly',
  },
  subjects: [
    {
      code: '101',
      name: 'BANGLA',
      outOf: 100,
      cq: 63,
      mcq: 22,
      practical: '',
      total: 85,
      highest: 98,
      grade: 'A+',
    },
    {
      code: '107',
      name: 'ENGLISH',
      outOf: 100,
      cq: 68,
      mcq: '',
      practical: '',
      total: 68,
      highest: 97,
      grade: 'A+',
    },
    {
      code: '109',
      name: 'MATHEMATICS',
      outOf: 100,
      cq: 62,
      mcq: 21,
      practical: '',
      total: 83,
      highest: 95,
      grade: 'A+',
    },
    {
      code: '111',
      name: 'RELIGION-ISLAM',
      outOf: 100,
      cq: 56,
      mcq: 23,
      practical: '',
      total: 79,
      highest: 83,
      grade: 'A',
    },
    {
      code: '127',
      name: 'GENERAL SCIENCE',
      outOf: 100,
      cq: 46,
      mcq: 23,
      practical: '',
      total: 69,
      highest: 91,
      grade: 'A',
    },
    {
      code: '134',
      name: 'AGRICULTURE STUDIES',
      outOf: 100,
      cq: 55,
      mcq: 22,
      practical: '',
      total: 77,
      highest: 88,
      grade: 'A',
    },
    {
      code: '150',
      name: 'BANGLADESH AND GLOBAL STUDIES',
      outOf: 100,
      cq: 48,
      mcq: 25,
      practical: '',
      total: 73,
      highest: 84,
      grade: 'A',
    },
    {
      code: '154',
      name: 'INFORMATION AND COMMUNICATION TECHNOLOGY',
      outOf: 50,
      cq: 25,
      mcq: 24,
      practical: '',
      total: 49,
      highest: 50,
      grade: 'A+',
    },
    {
      code: '147',
      name: 'PHYSICAL EDUCATION, HEALTH AND SPORTS',
      outOf: 50,
      cq: '',
      mcq: '',
      practical: '50',
      total: 50,
      highest: 50,
      grade: 'A+',
    },
  ],
  summary: {
    totalObtained: 633,
    totalMarks: 801,
  },
};

const classes = ['Six', 'Seven', 'Eight', 'Nine', 'Ten'];
const testTypes = ['Half Yearly', 'Yearly', 'Test Examination', 'Pre-Test'];
const years = ['2024', '2023', '2022', '2021', '2020'];

export default function SearchResults() {
  const [searchData, setSearchData] = useState({
    rollNumber: '',
    className: '',
    testName: '',
    year: '',
  });
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState('');

  const contentRef = useRef<HTMLDivElement>(null);
  const reactToPrintFn = useReactToPrint({ contentRef });

  const handleSearch = async () => {
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

    setIsSearching(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (searchData.rollNumber === '7' && searchData.className === 'Eight') {
      setShowResults(true);
      setError('');
    } else {
      setError(
        'No results found. Please check your information and try again.'
      );
      setShowResults(false);
    }

    setIsSearching(false);
  };

  const resetSearch = () => {
    setShowResults(false);
    setSearchData({ rollNumber: '', className: '', testName: '', year: '' });
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl p-6">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Student Result Portal
          </h1>
          <p className="text-gray-600">
            Search and view your examination results
          </p>
        </div>

        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Search Your Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="rollNumber" className="text-sm font-medium">
                  Roll Number *
                </Label>
                <Input
                  id="rollNumber"
                  type="number"
                  placeholder="Enter roll number"
                  value={searchData.rollNumber}
                  onChange={(e) =>
                    setSearchData({ ...searchData, rollNumber: e.target.value })
                  }
                  className="mt-1"
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Class *</Label>
                <Select
                  value={searchData.className}
                  onValueChange={(value) =>
                    setSearchData({ ...searchData, className: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map((cls) => (
                      <SelectItem key={cls} value={cls}>
                        Class {cls}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Examination *</Label>
                <Select
                  value={searchData.testName}
                  onValueChange={(value) =>
                    setSearchData({ ...searchData, testName: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select examination" />
                  </SelectTrigger>
                  <SelectContent>
                    {testTypes.map((test) => (
                      <SelectItem key={test} value={test}>
                        {test}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Year *</Label>
                <Select
                  value={searchData.year}
                  onValueChange={(value) =>
                    setSearchData({ ...searchData, year: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select year" />
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
              <Alert className="mb-4 border-red-200 bg-red-50">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            <div className="flex justify-center">
              <Button
                onClick={handleSearch}
                disabled={isSearching}
                className="px-8"
              >
                {isSearching ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Search Results
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        {showResults && (
          <div className="mt-6 flex justify-center gap-4">
            <Button onClick={reactToPrintFn} variant="outline">
              <Printer className="mr-2 h-4 w-4" />
              Print Result
            </Button>
            <Button onClick={resetSearch} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              New Search
            </Button>
          </div>
        )}

        {/* Demo Instructions */}
        {!showResults && (
          <Alert className="mt-6 border-amber-200 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Demo:</strong> Use Roll Number: 7, Class: Eight,
              Examination: Yearly, Year: 2023
            </AlertDescription>
          </Alert>
        )}

        {/* Result Display */}
        {showResults && (
          <div className="mt-8">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle>Result Sheet Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg bg-gray-50 p-4">
                  {/* This is the content that will be printed */}
                  <div ref={contentRef}>
                    <div
                      className="mx-auto max-w-4xl bg-white p-8"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {/* Header */}
                      <div className="mb-6 border-b-2 border-black pb-4 text-center">
                        <h1 className="mb-2 text-xl font-bold">RESULT SHEET</h1>
                        <h2 className="mb-1 text-lg font-bold">
                          {mockResults.school.name}
                        </h2>
                        <p className="mb-1 text-sm">
                          {mockResults.school.address}
                        </p>
                        <p className="mb-1 text-sm">
                          EIIN: {mockResults.school.eiin}
                        </p>
                        <p className="mb-1 text-sm">
                          YEAR: {mockResults.student.year}
                        </p>
                        <p className="mb-1 text-sm">
                          CLASS: {mockResults.student.className}
                        </p>
                        <p className="text-sm">
                          Name of Exam: {mockResults.test.name}
                        </p>
                      </div>

                      {/* Student Info with Photo */}
                      <div className="mb-6 flex">
                        <div className="flex-1 space-y-1 text-sm">
                          <div className="flex">
                            <span className="w-28 font-medium">
                              Student ID:
                            </span>
                            <span>{mockResults.student.studentId}</span>
                          </div>
                          <div className="flex">
                            <span className="w-28 font-medium">Roll No:</span>
                            <span>{mockResults.student.rollNumber}</span>
                          </div>
                          <div className="flex">
                            <span className="w-28 font-medium">Session:</span>
                            <span>{mockResults.student.session}</span>
                          </div>
                          <div className="flex">
                            <span className="w-28 font-medium">Name:</span>
                            <span>{mockResults.student.name}</span>
                          </div>
                          <div className="flex">
                            <span className="w-28 font-medium">
                              Father Name:
                            </span>
                            <span>{mockResults.student.fatherName}</span>
                          </div>
                          <div className="flex">
                            <span className="w-28 font-medium">
                              Mother Name:
                            </span>
                            <span>{mockResults.student.motherName}</span>
                          </div>
                          <div className="flex">
                            <span className="w-28 font-medium">
                              Publish Date:
                            </span>
                            <span>{mockResults.student.publishDate}</span>
                          </div>
                        </div>

                        <div className="ml-8 flex-1 space-y-1 text-sm">
                          <div className="flex">
                            <span className="w-20 font-medium">Shift:</span>
                            <span>{mockResults.student.shift}</span>
                          </div>
                          <div className="flex">
                            <span className="w-20 font-medium">Section:</span>
                            <span>{mockResults.student.section}</span>
                          </div>
                          <div className="flex">
                            <span className="w-20 font-medium">GPA:</span>
                            <span>4.5</span>
                          </div>
                          <div className="flex">
                            <span className="w-20 font-medium">Grade:</span>
                            <span>{mockResults.student.grade}</span>
                          </div>
                          <div className="flex">
                            <span className="w-20 font-medium">
                              Merit Position:
                            </span>
                            <span>{mockResults.student.meritPosition}</span>
                          </div>
                        </div>

                        {/* Student Photo */}
                        <div
                          className="ml-4 flex h-24 w-20 items-center justify-center border border-black text-xs text-gray-500"
                          style={{ border: '1px solid black' }}
                        >
                          Photo
                        </div>
                      </div>

                      {/* Marks Table */}
                      <table
                        className="w-full text-sm"
                        style={{
                          borderCollapse: 'collapse',
                          border: '1px solid black',
                        }}
                      >
                        <thead>
                          <tr>
                            <th
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                                textAlign: 'left',
                                fontWeight: 'bold',
                              }}
                            >
                              Code
                            </th>
                            <th
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                                textAlign: 'left',
                                fontWeight: 'bold',
                              }}
                            >
                              Name
                            </th>
                            <th
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              Out Of
                            </th>
                            <th
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              CQ
                            </th>
                            <th
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              MCQ
                            </th>
                            <th
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              Practical
                            </th>
                            <th
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              Total
                            </th>
                            <th
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              Highest
                            </th>
                            <th
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              Grade
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockResults.subjects.map((subject, index) => (
                            <tr key={index}>
                              <td
                                style={{
                                  border: '1px solid black',
                                  padding: '4px',
                                }}
                              >
                                {subject.code}
                              </td>
                              <td
                                style={{
                                  border: '1px solid black',
                                  padding: '4px',
                                }}
                              >
                                {subject.name}
                              </td>
                              <td
                                style={{
                                  border: '1px solid black',
                                  padding: '4px',
                                  textAlign: 'center',
                                }}
                              >
                                {subject.outOf}
                              </td>
                              <td
                                style={{
                                  border: '1px solid black',
                                  padding: '4px',
                                  textAlign: 'center',
                                }}
                              >
                                {subject.cq}
                              </td>
                              <td
                                style={{
                                  border: '1px solid black',
                                  padding: '4px',
                                  textAlign: 'center',
                                }}
                              >
                                {subject.mcq}
                              </td>
                              <td
                                style={{
                                  border: '1px solid black',
                                  padding: '4px',
                                  textAlign: 'center',
                                }}
                              >
                                {subject.practical}
                              </td>
                              <td
                                style={{
                                  border: '1px solid black',
                                  padding: '4px',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                }}
                              >
                                {subject.total}
                              </td>
                              <td
                                style={{
                                  border: '1px solid black',
                                  padding: '4px',
                                  textAlign: 'center',
                                }}
                              >
                                {subject.highest}
                              </td>
                              <td
                                style={{
                                  border: '1px solid black',
                                  padding: '4px',
                                  textAlign: 'center',
                                  fontWeight: 'bold',
                                }}
                              >
                                {subject.grade}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td
                              colSpan={6}
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                                textAlign: 'right',
                                fontWeight: 'bold',
                              }}
                            >
                              Total Marks:
                            </td>
                            <td
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                                textAlign: 'center',
                                fontWeight: 'bold',
                              }}
                            >
                              {mockResults.summary.totalObtained}
                            </td>
                            <td
                              colSpan={2}
                              style={{
                                border: '1px solid black',
                                padding: '4px',
                              }}
                            ></td>
                          </tr>
                        </tbody>
                      </table>

                      {/* Signatures */}
                      <div className="mt-16 flex justify-between">
                        <div className="text-center">
                          <div
                            className="w-40"
                            style={{
                              borderTop: '1px solid black',
                              paddingTop: '8px',
                            }}
                          >
                            <p className="text-sm font-medium">
                              Guardian Signature
                            </p>
                          </div>
                        </div>
                        <div className="text-center">
                          <div
                            className="w-40"
                            style={{
                              borderTop: '1px solid black',
                              paddingTop: '8px',
                            }}
                          >
                            <p className="text-sm font-medium">
                              Headmaster Signature
                            </p>
                            <p className="mt-1 text-xs">
                              {mockResults.school.name}
                            </p>
                            <p className="text-xs">
                              {mockResults.school.address}
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
