import { Trash2, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { StudentResult } from './types';

interface StudentListProps {
  studentResults: StudentResult[];
  removeStudentResult: (studentId: string) => void;
}

export function StudentList({
  studentResults,
  removeStudentResult,
}: StudentListProps) {
  return (
    <Card className='shadow-sm'>
      <CardHeader className='pb-3'>
        <CardTitle className='flex items-center gap-2 text-lg sm:text-xl'>
          <Users className='h-5 w-5' />
          Selected Students ({studentResults.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className='space-y-2'>
          {studentResults.map((result) => (
            <div
              key={result.studentId}
              className='flex items-center justify-between rounded-lg bg-gray-50 p-3'
            >
              <div className='flex items-center gap-3'>
                <div className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white'>
                  {result.rollNumber}
                </div>
                <span className='font-medium'>{result.studentName}</span>
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
          ))}
        </div>
        <Alert className='mt-4 border-blue-200 bg-blue-50'>
          <AlertDescription className='text-sm text-blue-800'>
            Students are ready! Add subjects above to start entering marks.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
