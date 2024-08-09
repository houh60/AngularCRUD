export interface Employee {
  id: string;
  name: string;
  gender: string;
  email?: string;
  phoneNumber?: string;
  contactPreference: string;
  dateOfBirth: Date;
  department: string;
  isActive: boolean;
  photoPath?: string;
}
