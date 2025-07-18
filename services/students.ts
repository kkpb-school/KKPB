import { useMutation } from '@tanstack/react-query';
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
