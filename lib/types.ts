export interface StudentFormData {
  name: string;
  fatherName: string;
  motherName: string;
  mobile: string;
  rollNumber: number;
  bloodGroup?: string;
  birthDate?: Date;
  address?: {
    houseOrRoad?: string;
    villageOrArea?: string;
    postOffice?: string;
    upazila?: string;
    district?: string;
    division?: string;
    postalCode?: string;
  };
  image?: File;
}

export const BloodGroups = [
  { value: 'A_POS', label: 'A+' },
  { value: 'A_NEG', label: 'A-' },
  { value: 'B_POS', label: 'B+' },
  { value: 'B_NEG', label: 'B-' },
  { value: 'AB_POS', label: 'AB+' },
  { value: 'AB_NEG', label: 'AB-' },
  { value: 'O_POS', label: 'O+' },
  { value: 'O_NEG', label: 'O-' },
  { value: 'UNKNOWN', label: 'Unknown' },
];

export const ClassNames = [
  { value: 'CLASS_6', label: 'Class 6' },
  { value: 'CLASS_7', label: 'Class 7' },
  { value: 'CLASS_8', label: 'Class 8' },
  { value: 'CLASS_9', label: 'Class 9' },
  { value: 'CLASS_10', label: 'Class 10' },
];
