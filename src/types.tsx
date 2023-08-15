export type ClassObject = {
  id?: number;
  numeric: string;
  title: string;
  professor: string;
};

export type AssignmentObject = {
  id?: number;
  class: string;
  title: string;
  description: string;
  dueDate: Date;
};
