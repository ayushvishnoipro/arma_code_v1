export interface Student {
  name: string;
  roll_number: string;
  email: string;
  gender: "M" | "F" | "GN";
  year_of_study: number;
  stream: string;
  department?: string;
  pre_majors?: string[];
  position?: string;
}