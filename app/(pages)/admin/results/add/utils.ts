export const getGrade = (percentage: number) => {
  if (percentage >= 90) return { grade: 'A+', color: 'bg-green-500' };
  if (percentage >= 80) return { grade: 'A', color: 'bg-blue-500' };
  if (percentage >= 70) return { grade: 'B', color: 'bg-yellow-500' };
  if (percentage >= 60) return { grade: 'C', color: 'bg-orange-500' };
  if (percentage >= 50) return { grade: 'D', color: 'bg-red-400' };
  return { grade: 'F', color: 'bg-red-600' };
};
