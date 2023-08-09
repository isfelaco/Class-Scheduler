import axios from "axios";

export const fetchClasses = () => {
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
  dueDate: string;
  status: string;
};

export const createClass = (props: AssignmentParams) => {
  return axios
    .post("http://localhost:4001/classes/create", {
      classID: props.classID,
      title: props.title,
      description: props.description,
      dueDate: props.dueDate,
      status: props.status,
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

export const deleteClass = (id: number, title: string) => {
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

export const resetClasses = () => {
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
