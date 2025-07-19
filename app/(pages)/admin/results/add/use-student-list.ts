import { useQuery } from '@tanstack/react-query';
import { Student } from './types';

const fetchStudents = async (
  className: string,
  searchQuery: string
): Promise<Student[]> => {
  const response = await fetch(
    `/api/admin/student/list?class=${className}&search=${searchQuery}`
  );
  if (!response.ok) {
    throw new Error('Failed to fetch students');
  }
  const data = await response.json();
  return data.students;
};

export const useStudentList = (className: string, searchQuery: string) => {
  return useQuery<Student[], Error>({
    queryKey: ['students', className, searchQuery],
    queryFn: () => fetchStudents(className, searchQuery),
  });
};
