import axios from "axios";
import { AssignmentObject } from "../types";

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

export const classAssignments = (id: number) => {
  return axios
    .put("http://localhost:4001/assignments/some", { id: id })
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

export const createAssignment = (props: AssignmentObject) => {
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

export const deleteAssignment = (id: number) => {
  return axios
    .delete(`http://localhost:4001/assignments/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(`There was an error removing the asignment: ${error}`);
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
