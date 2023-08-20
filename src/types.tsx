export type ClassObject = {
  id?: number;
  numeric: string;
  title: string;
  professor: string;
};

export type AssignmentObject = {
  id?: number;
  class_numeric: string;
  title: string;
  description: string;
  dueDate: Date;
};
