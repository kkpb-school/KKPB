'use client';

import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
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
import { Badge } from '@/components/ui/badge';
import {
  Trash2,
  Save,
  Users,
  BookOpen,
  Search,
  FileText,
  CheckSquare,
  TrendingUp,
  X,
} from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

// Mock data
const mockStudents = [
  { id: '1', name: 'Ahmed Hassan', rollNumber: 1 },
  { id: '2', name: 'Fatima Khan', rollNumber: 2 },
  { id: '3', name: 'Mohammad Ali', rollNumber: 3 },
  { id: '4', name: 'Ayesha Rahman', rollNumber: 4 },
  { id: '5', name: 'Omar Farooq', rollNumber: 5 },
  { id: '6', name: 'Sadia Akter', rollNumber: 6 },
  { id: '7', name: 'Rahul Das', rollNumber: 7 },
  { id: '8', name: 'Tania Islam', rollNumber: 8 },
  { id: '9', name: 'Karim Uddin', rollNumber: 9 },
  { id: '10', name: 'Nasir Ahmed', rollNumber: 10 },
  { id: '11', name: 'Ruma Begum', rollNumber: 11 },
  { id: '12', name: 'Shakib Khan', rollNumber: 12 },
  { id: '13', name: 'Marium Sultana', rollNumber: 13 },
  { id: '14', name: 'Rafiq Islam', rollNumber: 14 },
  { id: '15', name: 'Salma Khatun', rollNumber: 15 },
];

const commonSubjects = [
  'Mathematics',
  'English',
  'Science',
  'Social Studies',
  'Bangla',
  'Physics',
  'Chemistry',
  'Biology',
  'History',
  'Geography',
];

interface SubjectMarks {
  written: number;
  mcq: number;
  total: number;
}

interface StudentResult {
  studentId: string;
  studentName: string;
  rollNumber: number;
  subjects: { [key: string]: SubjectMarks };
  totalMarks: number;
  percentage: number;
}

export default function AddResults() {
  const searchParams = useSearchParams();
  const className = searchParams.get('class') || 'Class 6';
  const testType = searchParams.get('test') || 'Mid Term';

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);
  const [writtenMarks, setWrittenMarks] = useState(60);
  const [mcqMarks, setMcqMarks] = useState(40);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalMarksPerSubject = writtenMarks + mcqMarks;

  // Filter students based on search query
  const filteredStudents = mockStudents.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toString().includes(searchQuery);
    const notAlreadyAdded = !studentResults.find(
      (r) => r.studentId === student.id
    );
    return matchesSearch && notAlreadyAdded;
  });

  const removeSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    setStudentResults(
      studentResults.map((result) => {
        const { [subject]: removed, ...remainingSubjects } = result.subjects;
        const totalMarks = Object.values(remainingSubjects).reduce(
          (sum, subjectMarks) => sum + subjectMarks.total,
          0
        );
        const totalPossibleMarks =
          (selectedSubjects.length - 1) * totalMarksPerSubject;
        return {
          ...result,
          subjects: remainingSubjects,
          totalMarks,
          percentage:
            totalPossibleMarks > 0
              ? (totalMarks / totalPossibleMarks) * 100
              : 0,
        };
      })
    );
  };

  const addStudentResult = (student: (typeof mockStudents)[0]) => {
    if (studentResults.find((r) => r.studentId === student.id)) return;

    const newResult: StudentResult = {
      studentId: student.id,
      studentName: student.name,
      rollNumber: student.rollNumber,
      subjects: {},
      totalMarks: 0,
      percentage: 0,
    };

    setStudentResults([...studentResults, newResult]);
  };

  const updateStudentMark = (
    studentId: string,
    subject: string,
    type: 'written' | 'mcq',
    mark: number
  ) => {
    setStudentResults(
      studentResults.map((result) => {
        if (result.studentId === studentId) {
          const currentSubject = result.subjects[subject] || {
            written: 0,
            mcq: 0,
            total: 0,
          };
          const updatedSubject = {
            ...currentSubject,
            [type]: mark,
            total:
              type === 'written'
                ? mark + currentSubject.mcq
                : currentSubject.written + mark,
          };

          const updatedSubjects = {
            ...result.subjects,
            [subject]: updatedSubject,
          };
          const totalMarks = Object.values(updatedSubjects).reduce(
            (sum, subjectMarks) => sum + subjectMarks.total,
            0
          );
          const totalPossibleMarks =
            selectedSubjects.length * totalMarksPerSubject;
          const percentage =
            totalPossibleMarks > 0
              ? (totalMarks / totalPossibleMarks) * 100
              : 0;

          return {
            ...result,
            subjects: updatedSubjects,
            totalMarks,
            percentage,
          };
        }
        return result;
      })
    );
  };

  const removeStudentResult = (studentId: string) => {
    setStudentResults(studentResults.filter((r) => r.studentId !== studentId));
  };

  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { grade: 'A+', color: 'bg-green-500' };
    if (percentage >= 80) return { grade: 'A', color: 'bg-blue-500' };
    if (percentage >= 70) return { grade: 'B', color: 'bg-yellow-500' };
    if (percentage >= 60) return { grade: 'C', color: 'bg-orange-500' };
    if (percentage >= 50) return { grade: 'D', color: 'bg-red-400' };
    return { grade: 'F', color: 'bg-red-600' };
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const submissionData = {
      testInfo: {
        className,
        testType,
        writtenMarks,
        mcqMarks,
        totalMarksPerSubject,
        subjects: selectedSubjects,
      },
      results: studentResults.map((result) => ({
        studentId: result.studentId,
        studentName: result.studentName,
        rollNumber: result.rollNumber,
        subjects: result.subjects,
        totalMarks: result.totalMarks,
        percentage: result.percentage,
        grade: getGrade(result.percentage).grade,
      })),
      summary: {
        totalStudents: studentResults.length,
        totalSubjects: selectedSubjects.length,
        averagePercentage:
          studentResults.length > 0
            ? studentResults.reduce(
                (sum, result) => sum + result.percentage,
                0
              ) / studentResults.length
            : 0,
        submittedAt: new Date().toISOString(),
      },
    };

    console.log('=== SUBMISSION DATA ===');
    console.log(JSON.stringify(submissionData, null, 2));

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    alert('Results saved successfully! Check console for logged data.');
  };

  const getClassStats = () => {
    if (studentResults.length === 0) return null;
    const totalStudents = studentResults.length;
    const averagePercentage =
      studentResults.reduce((sum, result) => sum + result.percentage, 0) /
      totalStudents;
    const passedStudents = studentResults.filter(
      (r) => r.percentage >= 50
    ).length;
    return {
      totalStudents,
      averagePercentage,
      passedStudents,
      passRate: (passedStudents / totalStudents) * 100,
    };
  };

  const stats = getClassStats();

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
        {/* Compact Header */}
        <div className="py-4 text-center sm:py-6">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 sm:text-3xl lg:text-4xl">
            Add Student Results
          </h1>
          <p className="text-sm text-gray-600 sm:text-base">
            Record and manage academic performance
          </p>
        </div>

        {/* Compact Test Info */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <BookOpen className="h-5 w-5" />
              Test Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <div>
                <Label className="text-xs font-medium text-gray-600">
                  Class
                </Label>
                <div className="mt-1">
                  <Badge variant="secondary" className="px-2 py-1 text-sm">
                    {className}
                  </Badge>
                </div>
              </div>
              <div>
                <Label className="text-xs font-medium text-gray-600">
                  Test Type
                </Label>
                <div className="mt-1">
                  <Badge variant="outline" className="px-2 py-1 text-sm">
                    {testType}
                  </Badge>
                </div>
              </div>
              <div>
                <Label
                  htmlFor="writtenMarks"
                  className="text-xs font-medium text-gray-600"
                >
                  Written Marks
                </Label>
                <Input
                  id="writtenMarks"
                  type="number"
                  value={writtenMarks}
                  onChange={(e) => setWrittenMarks(Number(e.target.value))}
                  className="mt-1 h-8 text-sm"
                />
              </div>
              <div>
                <Label
                  htmlFor="mcqMarks"
                  className="text-xs font-medium text-gray-600"
                >
                  MCQ Marks
                </Label>
                <Input
                  id="mcqMarks"
                  type="number"
                  value={mcqMarks}
                  onChange={(e) => setMcqMarks(Number(e.target.value))}
                  className="mt-1 h-8 text-sm"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Compact Subject Management */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <BookOpen className="h-5 w-5" />
              Subjects ({selectedSubjects.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Select
                value=""
                onValueChange={(value) => {
                  if (value && !selectedSubjects.includes(value)) {
                    setSelectedSubjects([...selectedSubjects, value]);
                  }
                }}
              >
                <SelectTrigger className="h-9 flex-1 text-sm">
                  <SelectValue placeholder="Select subject to add" />
                </SelectTrigger>
                <SelectContent>
                  {commonSubjects
                    .filter((subject) => !selectedSubjects.includes(subject))
                    .map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            {selectedSubjects.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {selectedSubjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant="secondary"
                    className="px-2 py-1 text-xs"
                  >
                    {subject}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="ml-1 h-4 w-4 p-0 hover:bg-red-100"
                      onClick={() => removeSubject(subject)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))}
              </div>
            ) : (
              <Alert className="border-yellow-200 bg-yellow-50">
                <AlertDescription className="text-sm text-yellow-800">
                  Please add subjects first. You can still add students, but
                  marks entry will be available after adding subjects.
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Compact Student Selection */}
        <Card className="shadow-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
              <Users className="h-5 w-5" />
              Add Students
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9 text-sm"
              />
            </div>

            <div className="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => (
                  <Button
                    key={student.id}
                    variant="outline"
                    size="sm"
                    className="h-auto justify-start bg-transparent p-2 text-left"
                    onClick={() => addStudentResult(student)}
                  >
                    <div className="w-full">
                      <div className="truncate text-xs font-medium">
                        {student.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        Roll: {student.rollNumber}
                      </div>
                    </div>
                  </Button>
                ))
              ) : (
                <div className="col-span-full py-4 text-center text-sm text-gray-500">
                  {searchQuery ? 'No students found' : 'All students added'}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Student List (when no subjects selected) */}
        {studentResults.length > 0 && selectedSubjects.length === 0 && (
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <Users className="h-5 w-5" />
                Selected Students ({studentResults.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {studentResults.map((result) => (
                  <div
                    key={result.studentId}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                        {result.rollNumber}
                      </div>
                      <span className="font-medium">{result.studentName}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStudentResult(result.studentId)}
                      className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <Alert className="mt-4 border-blue-200 bg-blue-50">
                <AlertDescription className="text-sm text-blue-800">
                  Students are ready! Add subjects above to start entering
                  marks.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Compact Results Entry */}
        {studentResults.length > 0 && selectedSubjects.length > 0 && (
          <Card className="shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                <TrendingUp className="h-5 w-5" />
                Marks Entry
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {studentResults.map((result, index) => (
                <div
                  key={result.studentId}
                  className="space-y-3 rounded-lg border p-3 sm:p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                        {result.rollNumber}
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold sm:text-base">
                          {result.studentName}
                        </h3>
                        {result.totalMarks > 0 && (
                          <div className="mt-1 flex items-center gap-2">
                            <Badge
                              className={`${getGrade(result.percentage).color} px-2 py-0.5 text-xs text-white`}
                            >
                              {getGrade(result.percentage).grade}
                            </Badge>
                            <span className="text-xs text-gray-600">
                              {result.percentage.toFixed(1)}%
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeStudentResult(result.studentId)}
                      className="h-8 w-8 p-0 text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    {selectedSubjects.map((subject) => {
                      const subjectMarks = result.subjects[subject] || {
                        written: 0,
                        mcq: 0,
                        total: 0,
                      };
                      return (
                        <div
                          key={subject}
                          className="rounded-lg bg-gray-50 p-3"
                        >
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="text-sm font-medium">{subject}</h4>
                            <Badge variant="outline" className="text-xs">
                              {subjectMarks.total}/{totalMarksPerSubject}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <Label className="mb-1 flex items-center gap-1 text-xs font-medium">
                                <FileText className="h-3 w-3" />
                                Written ({writtenMarks})
                              </Label>
                              <Input
                                type="number"
                                placeholder="0"
                                min="0"
                                max={writtenMarks}
                                value={subjectMarks.written || ''}
                                onChange={(e) =>
                                  updateStudentMark(
                                    result.studentId,
                                    subject,
                                    'written',
                                    Number(e.target.value)
                                  )
                                }
                                className="h-8 text-center text-sm"
                              />
                            </div>
                            <div>
                              <Label className="mb-1 flex items-center gap-1 text-xs font-medium">
                                <CheckSquare className="h-3 w-3" />
                                MCQ ({mcqMarks})
                              </Label>
                              <Input
                                type="number"
                                placeholder="0"
                                min="0"
                                max={mcqMarks}
                                value={subjectMarks.mcq || ''}
                                onChange={(e) =>
                                  updateStudentMark(
                                    result.studentId,
                                    subject,
                                    'mcq',
                                    Number(e.target.value)
                                  )
                                }
                                className="h-8 text-center text-sm"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {result.totalMarks > 0 && (
                    <div className="rounded-lg bg-blue-50 p-3">
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div>
                          <div className="text-xs text-gray-600">Total</div>
                          <div className="text-lg font-bold text-blue-600">
                            {result.totalMarks}
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">
                            Percentage
                          </div>
                          <div className="text-lg font-bold text-green-600">
                            {result.percentage.toFixed(1)}%
                          </div>
                        </div>
                        <div>
                          <div className="text-xs text-gray-600">Grade</div>
                          <div className="text-lg font-bold text-purple-600">
                            {getGrade(result.percentage).grade}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Compact Action Buttons */}
        {studentResults.length > 0 && selectedSubjects.length > 0 && (
          <Card className="shadow-sm">
            <CardContent className="p-4">
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="h-10 bg-green-600 hover:bg-green-700"
                >
                  {isSubmitting ? (
                    <>
                      <div className="mr-2 h-4 w-4 animate-spin rounded-full border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save Results
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
