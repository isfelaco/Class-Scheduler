export type User = {
  username: string;
  password: string;
};

export type ClassInput = {
  numeric: string;
  title: string;
  professor: string;
  user?: string;
};

export type Class = ClassInput & {
  id: number;
};

export type AssignmentInput = {
  class_numeric: string;
  title: string;
  description: string;
  due_date: Date;
  user?: string;
};

export type Assignment = AssignmentInput & {
  id: number;
};

// source: https://www.designcise.com/web/tutorial/how-to-convert-html-form-data-to-javascript-object
export function formDataToObject(formData: any) {
  const normalizeValues = (values: any) =>
    values.length > 1 ? values : values[0];
  const formElemKeys = Array.from(formData.keys());
  return Object.fromEntries(
    // store array of values or single value for element key
    formElemKeys.map((key) => [key, normalizeValues(formData.getAll(key))])
  );
}
