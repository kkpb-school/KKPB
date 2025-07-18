import { QUERY_KEYS } from '@/lib/constants';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useCreateStudent() {
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await axios.post('/api/admin/student', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    },
  });

  return { mutate, isPending };
}

export function useStudentList() {
  return useQuery({
    queryKey: [QUERY_KEYS.STUDENT_LIST],
    queryFn: async () => {
      const response = await axios.get(`/api/admin/student/list`);
      return response.data;
    },
  });
}
