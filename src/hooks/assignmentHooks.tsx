import axios from "axios";

export const fetchAssignments = () => {
  return axios
    .get("http://localhost:4001/assignments/all")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(
        `There was an error retrieving the assignments list: ${error}`
      );
      throw new Error(error);
    });
};

export type AssignmentParams = {
  classID: number;
  title: string;
  description: string;
  dueDate: Date;
};

export const createAssignment = (props: AssignmentParams) => {
  return axios
    .post("http://localhost:4001/assignments/create", {
      classID: props.classID,
      title: props.title,
      description: props.description,
      dueDate: props.dueDate,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(
        `There was an error creating the ${props.title} assignment: ${error}`
      );
      throw new Error(error);
    });
};

export const deleteAssignment = (id: number, title: string) => {
  return axios
    .put("http://localhost:4001/assignments/delete", { id: id })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(
        `There was an error removing the ${title} asignment: ${error}`
      );
      throw new Error(error);
    });
};

export const resetAssignments = () => {
  return axios
    .put("http://localhost:4001/assignments/reset")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(
        `There was an error resetting the assignments list: ${error}`
      );
      throw new Error(error);
    });
};
