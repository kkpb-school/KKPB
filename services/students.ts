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

export function useStudentList({
  page,
  limit,
  searchTerm,
  filterStatus,
  filterClass,
}: {
  page: number;
  limit: number;
  searchTerm: string;
  filterStatus: string;
  filterClass: string;
}) {
  return useQuery({
    queryKey: [
      QUERY_KEYS.STUDENT_LIST,
      { page, limit, searchTerm, filterStatus, filterClass },
    ],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: searchTerm,
        status: filterStatus,
        class: filterClass,
      });
      const response = await axios.get(
        `/api/admin/student/list?${params.toString()}`
      );
      return response.data;
    },
  });
}
