export interface SubjectMarks {
  written: number;
  mcq: number;
  total: number;
}

export interface StudentResult {
  studentId: string;
  studentName: string;
  rollNumber: number;
  subjects: { [key: string]: SubjectMarks };
  totalMarks: number;
  percentage: number;
}

export interface Student {
  id: string;
  name: string;
  rollNumber: number;
}
