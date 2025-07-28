import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { QUERY_KEYS } from '@/lib/constants';

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
    // biome-ignore lint/suspicious/noExplicitAny: we don't know the type
    subjects: Record<string, any>;
    totalMarks: number;
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
        },
      );
    },
  });
}

interface GetResultParams {
  className?: string;
  roll?: string;
  test?: string;
  year?: string;
}

export function useGetResults(params: GetResultParams) {
  const { className, roll, test, year } = params;

  return useQuery({
    queryKey: [QUERY_KEYS.STUDENT_RESULTS, className, roll, test, year],
    queryFn: async () => {
      const response = await axios.get('/api/results', {
        params: {
          class: className,
          roll,
          test,
          year,
        },
      });
      return response.data;
    },
    enabled: !!(className && roll && test && year),
  });
}
