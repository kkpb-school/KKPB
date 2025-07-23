'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';

import { ActionsBar } from './actions-bar';
import { MarksEntry } from './marks-entry';
import { PageHeader } from './page-header';
import { StudentList } from './student-list';
import { StudentSelection } from './student-selection';
import { SubjectManagement } from './subject-management';
import { TestConfiguration } from './test-configuration';
import { ClassRecord, Student, StudentResult } from './types';
import { getGrade } from './utils';
import { useStudentList } from '@/services/students';
import { useAddResults } from '@/services/results';

function AddResults() {
  const searchParams = useSearchParams();
  const className = searchParams.get('class') || 'Class 6';
  const testType = searchParams.get('test') || 'Mid Term';

  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);
  const [writtenMarks, setWrittenMarks] = useState(60);
  const [mcqMarks, setMcqMarks] = useState(40);
  const [searchQuery, setSearchQuery] = useState('');

  const {
    isPending,
    data: studentList,
    isError,
  } = useStudentList({
    page: 1,
    limit: 100,
    searchTerm: searchQuery,
    filterStatus: 'all',
    filterClass: className,
  });

  const totalMarksPerSubject = writtenMarks + mcqMarks;

  const filteredStudents = ((studentList?.students || []) as Student[]).filter(
    (student: Student) => {
      const rollNumber =
        student.classRecords?.find(
          (cr: ClassRecord) => cr.className === className
        )?.rollNumber || 0;

      const matchesSearch =
        student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        rollNumber.toString().includes(searchQuery);

      const notAlreadyAdded = !studentResults.find(
        (r) => r.studentId === student.id
      );

      return matchesSearch && notAlreadyAdded;
    }
  );

  const removeSubject = (subject: string) => {
    setSelectedSubjects(selectedSubjects.filter((s) => s !== subject));
    setStudentResults(
      studentResults.map((result) => {
        const { [subject]: _, ...remainingSubjects } = result.subjects;
        const totalMarks = Object.values(remainingSubjects).reduce(
          (sum, subjectMarks) => sum + subjectMarks.total,
          0
        );
        return {
          ...result,
          subjects: remainingSubjects,
          totalMarks,
        };
      })
    );
  };

  const addStudentResult = (student: Student) => {
    if (studentResults.find((r) => r.studentId === student.id)) return;

    const rollNumber =
      student.classRecords?.find((cr) => cr.className === className)
        ?.rollNumber || 0;

    const newResult: StudentResult = {
      studentId: student.id,
      studentName: student.name,
      rollNumber,
      subjects: {},
      totalMarks: 0,
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

          return {
            ...result,
            subjects: updatedSubjects,
            totalMarks,
          };
        }
        return result;
      })
    );
  };

  const removeStudentResult = (studentId: string) => {
    setStudentResults(studentResults.filter((r) => r.studentId !== studentId));
  };

  const { mutateAsync: submitResults, isPending: isSubmittingResults } =
    useAddResults();

  const handleSubmit = async () => {
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
        subjects: Object.keys(result.subjects).reduce(
          (acc, subject) => {
            const subjectMarks = result.subjects[subject];
            acc[subject] = {
              writtenMark: subjectMarks.written,
              mcqMark: subjectMarks.mcq,
              totalMark: subjectMarks.total,
              maxWrittenMark: writtenMarks,
              maxMcqMark: mcqMarks,
              maxTotalMark: totalMarksPerSubject,
              grade: getGrade((subjectMarks.total / totalMarksPerSubject) * 100)
                .grade,
            };
            return acc;
          },
          {} as Record<string, any>
        ),
        totalMarks: result.totalMarks,
      })),
    };
    console.log(submissionData);

    try {
      await submitResults(submissionData);
      setSelectedSubjects([]);
      setStudentResults([]);
      setSearchQuery('');
      setWrittenMarks(60);
      setMcqMarks(40);
    } catch (err) {
      console.error(err);
    }
  };

  if (isError) {
    return (
      <div className="py-4 text-center text-red-500">
        Failed to load students.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-3 sm:p-4 lg:p-6">
      <div className="mx-auto max-w-6xl space-y-4 sm:space-y-6">
        <PageHeader />
        <TestConfiguration
          className={className}
          testType={testType}
          writtenMarks={writtenMarks}
          mcqMarks={mcqMarks}
          setWrittenMarks={setWrittenMarks}
          setMcqMarks={setMcqMarks}
        />
        <SubjectManagement
          className={className}
          selectedSubjects={selectedSubjects}
          setSelectedSubjects={setSelectedSubjects}
          removeSubject={removeSubject}
        />
        <StudentSelection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredStudents={filteredStudents}
          addStudentResult={addStudentResult}
        />
        {isPending && (
          <div className="flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-gray-500" />
          </div>
        )}
        {studentResults.length > 0 && selectedSubjects.length === 0 && (
          <StudentList
            studentResults={studentResults}
            removeStudentResult={removeStudentResult}
          />
        )}
        {studentResults.length > 0 && selectedSubjects.length > 0 && (
          <>
            <MarksEntry
              studentResults={studentResults}
              selectedSubjects={selectedSubjects}
              writtenMarks={writtenMarks}
              mcqMarks={mcqMarks}
              totalMarksPerSubject={totalMarksPerSubject}
              updateStudentMark={updateStudentMark}
              removeStudentResult={removeStudentResult}
            />
            <ActionsBar
              isSubmitting={isSubmittingResults}
              handleSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default function AddResultsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AddResults />
    </Suspense>
  );
}
