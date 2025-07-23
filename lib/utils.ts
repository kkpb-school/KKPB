import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Utility function to safely retrieve string values
export const getFormStringValue = (formData: FormData, key: string): string => {
  const value = formData.get(key);
  return typeof value === 'string' ? value : '';
};

// Utility function to safely retrieve number values
export const getFormNumberValue = (
  formData: FormData,
  key: string
): number | null => {
  const value = formData.get(key);
  if (typeof value === 'string' && /^\d+$/.test(value)) {
    return parseInt(value, 10);
  }
  return null;
};

export function formatOrdinalDay(day: number) {
  if (day > 3 && day < 21) return `${day}th`;
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

// utils/gpaCalculator.ts

export function calculateGPAAndGrade(subjects: Record<string, any>) {
  const subjectList = Object.values(subjects || {});

  if (subjectList.length === 0) {
    return { gpa: 'N/A', grade: 'N/A' };
  }

  let totalGPA = 0;
  let subjectCount = 0;
  let hasFail = false;

  const gradeToGpa: Record<string, number> = {
    'A+': 5,
    A: 4,
    'A-': 3.5,
    B: 3,
    C: 2,
    D: 1,
    F: 0,
  };

  for (const subj of subjectList) {
    const grade = subj.grade?.toUpperCase();
    const gpa = gradeToGpa[grade] ?? 0;

    if (grade === 'F') {
      hasFail = true;
    }

    totalGPA += gpa;
    subjectCount++;
  }

  const gpa = subjectCount > 0 ? totalGPA / subjectCount : 0;

  const finalGrade = hasFail
    ? 'F'
    : gpa >= 5
      ? 'A+'
      : gpa >= 4
        ? 'A'
        : gpa >= 3.5
          ? 'A-'
          : gpa >= 3
            ? 'B'
            : gpa >= 2
              ? 'C'
              : gpa >= 1
                ? 'D'
                : 'F';

  return {
    gpa: gpa.toFixed(2),
    grade: finalGrade,
  };
}
