import { CheckSquare, FileText, Trash2, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { StudentResult } from './types';
import { getGrade } from './utils';

interface MarksEntryProps {
  studentResults: StudentResult[];
  selectedSubjects: string[];
  writtenMarks: number;
  mcqMarks: number;
  totalMarksPerSubject: number;
  updateStudentMark: (
    studentId: string,
    subject: string,
    type: 'written' | 'mcq',
    mark: number,
  ) => void;
  removeStudentResult: (studentId: string) => void;
}

export const MarksEntry = ({
  studentResults,
  selectedSubjects,
  writtenMarks,
  mcqMarks,
  totalMarksPerSubject,
  updateStudentMark,
  removeStudentResult,
}: MarksEntryProps) => (
  <Card className='shadow-sm'>
    <CardHeader className='pb-3'>
      <CardTitle className='flex items-center gap-2 text-lg sm:text-xl'>
        <TrendingUp className='h-5 w-5' />
        Marks Entry
      </CardTitle>
    </CardHeader>
    <CardContent className='space-y-4'>
      {studentResults.map((result) => (
        <div
          key={result.studentId}
          className='space-y-3 rounded-lg border p-3 sm:p-4'
        >
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 sm:gap-3'>
              <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white'>
                {result.rollNumber}
              </div>
              <div>
                <h3 className='text-sm font-semibold sm:text-base'>
                  {result.studentName}
                </h3>
              </div>
            </div>
            <Button
              variant='ghost'
              size='sm'
              onClick={() => removeStudentResult(result.studentId)}
              className='h-8 w-8 p-0 text-red-600 hover:bg-red-50'
            >
              <Trash2 className='h-4 w-4' />
            </Button>
          </div>

          <div className='space-y-3'>
            {selectedSubjects.map((subject) => {
              const subjectMarks = result.subjects[subject] || {
                written: 0,
                mcq: 0,
                total: 0,
              };
              const subjectPercentage =
                (subjectMarks.total / totalMarksPerSubject) * 100;
              return (
                <div key={subject} className='rounded-lg bg-gray-50 p-3'>
                  <div className='mb-2 flex items-center justify-between'>
                    <h4 className='text-sm font-medium'>{subject}</h4>
                    <div className='flex items-center gap-2'>
                      <Badge
                        className={`${getGrade(subjectPercentage).color} px-2 py-0.5 text-xs text-white`}
                      >
                        {getGrade(subjectPercentage).grade}
                      </Badge>
                      <Badge variant='outline' className='text-xs'>
                        {subjectMarks.total}/{totalMarksPerSubject}
                      </Badge>
                    </div>
                  </div>
                  <div className='grid grid-cols-2 gap-3'>
                    <div>
                      <Label className='mb-1 flex items-center gap-1 text-xs font-medium'>
                        <FileText className='h-3 w-3' />
                        Written ({writtenMarks})
                      </Label>
                      <Input
                        type='number'
                        placeholder='0'
                        min='0'
                        max={writtenMarks}
                        value={subjectMarks.written || ''}
                        onChange={(e) =>
                          updateStudentMark(
                            result.studentId,
                            subject,
                            'written',
                            Number(e.target.value),
                          )
                        }
                        className='h-8 text-center text-sm'
                      />
                    </div>
                    <div>
                      <Label className='mb-1 flex items-center gap-1 text-xs font-medium'>
                        <CheckSquare className='h-3 w-3' />
                        MCQ ({mcqMarks})
                      </Label>
                      <Input
                        type='number'
                        placeholder='0'
                        min='0'
                        max={mcqMarks}
                        value={subjectMarks.mcq || ''}
                        onChange={(e) =>
                          updateStudentMark(
                            result.studentId,
                            subject,
                            'mcq',
                            Number(e.target.value),
                          )
                        }
                        className='h-8 text-center text-sm'
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {result.totalMarks > 0 && (
            <div className='rounded-lg bg-blue-50 p-3'>
              <div className='text-center'>
                <div className='text-xs text-gray-600'>Total Marks</div>
                <div className='text-lg font-bold text-blue-600'>
                  {result.totalMarks}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </CardContent>
  </Card>
);
