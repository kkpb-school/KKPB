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
}

export interface ClassRecord {
  id: string;
  studentId: string;
  className: string;
  rollNumber: number;
  year: number;
}

export interface Student {
  id: string;
  name: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  gender: string;
  bloodGroup: string;
  isActive: boolean;
  birthDate: string;
  address: {
    houseOrRoad: string;
    villageOrArea: string;
    postOffice: string;
    upazila: string;
    district: string;
    division: string;
    postalCode: string;
  };
  images: {
    url: string;
    publicId: string;
    alt: string;
  };
  classRecords: ClassRecord[]; // 👈 Add this line
}
