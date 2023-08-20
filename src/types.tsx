export type User = {
  id?: number;
  user_id?: number;
  username: string;
  password: string;
};

export type ClassObject = {
  id?: number;
  numeric: string;
  title: string;
  professor: string;
  user_id?: number;
};

export type AssignmentObject = {
  id?: number;
  class_numeric: string;
  title: string;
  description: string;
  due_date: Date;
  user_id: number;
};
