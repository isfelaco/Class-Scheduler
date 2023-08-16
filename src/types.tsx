export type ClassObject = {
  id?: number;
  numeric: string;
  title: string;
  professor: string;
};

export type AssignmentObject = {
  id?: number;
  classId: number;
  title: string;
  description: string;
  dueDate: Date;
};
