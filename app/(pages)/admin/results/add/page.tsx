'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { toast } from 'sonner';
import { ActionsBar } from './actions-bar';
import { MarksEntry } from './marks-entry';
import { PageHeader } from './page-header';
import { StudentList } from './student-list';
import { StudentSelection } from './student-selection';
import { SubjectManagement } from './subject-management';
import { TestConfiguration } from './test-configuration';
import { mockStudents } from './data';
import { Student, StudentResult } from './types';
import { getGrade } from './utils';

function AddResults() {
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
        const { ...remainingSubjects } = result.subjects;
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

  const addStudentResult = (student: Student) => {
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
    };

    console.log(submissionData);

    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);

    toast.success('Results submitted successfully!');
  };

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
              isSubmitting={isSubmitting}
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
