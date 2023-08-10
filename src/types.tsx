export type ClassObject = {
  id?: number;
  numeric: string;
  title: string;
  professor: string;
};

export type AssignmentObject = {
  classID: number;
  title: string;
  description: string;
  dueDate: Date;
};
