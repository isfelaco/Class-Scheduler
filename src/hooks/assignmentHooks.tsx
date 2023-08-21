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

export const fetchAssignmentsByUser = async (username: string) => {
  // Send GET request to 'classes/all' endpoint
  return await axios
    .get(`http://localhost:4001/assignments/assignments-by-user/${username}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(
        `There was an error retrieving the assignment list: ${error}`
      );
      throw new Error(error);
    });
};

export const classAssignments = (numeric: string) => {
  return axios
    .put("http://localhost:4001/assignments/some", { numeric: numeric })
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
      class_numeric: props.class_numeric,
      title: props.title,
      description: props.description,
      due_date: props.due_date,
      user: props.user,
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
