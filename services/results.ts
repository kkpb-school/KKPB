import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

interface AddResultsPayload {
  testInfo: {
    className: string;
    testType: string;
    writtenMarks: number;
    mcqMarks: number;
    totalMarksPerSubject: number;
    subjects: string[];
  };
  results: {
    studentId: string;
    studentName: string;
    rollNumber: number;
    subjects: Record<
      string,
      {
        written: number;
        mcq: number;
        total: number;
      }
    >;
    totalMarks: number;
    percentage: number;
    grade: string;
  }[];
}

export function useAddResults() {
  return useMutation({
    mutationFn: async (payload: AddResultsPayload) => {
      return await toast.promise(
        axios.post('/api/admin/results', payload).then((res) => res.data),
        {
          loading: 'Submitting results...',
          success: 'Results submitted successfully!',
          error: (err) =>
            err?.response?.data?.message || 'Failed to submit results.',
        }
      );
    },
  });
}
