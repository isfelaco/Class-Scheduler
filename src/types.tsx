export type User = {
  username: string;
  password: string;
};

export type ClassObject = {
  id?: number;
  numeric: string;
  title: string;
  professor: string;
  user?: string;
};

export type AssignmentObject = {
  id?: number;
  class_numeric: string;
  title: string;
  description: string;
  due_date: Date;
  user?: string;
};
