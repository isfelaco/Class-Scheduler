import axios from "axios";
import { ClassObject } from "../types";

export const fetchClasses = async () => {
  // Send GET request to 'classes/all' endpoint
  return await axios
    .get("http://localhost:4001/classes/all")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(`There was an error retrieving the class list: ${error}`);
      throw new Error(error);
    });
};

export const fetchClassByNumeric = async (numeric: string) => {
  return await axios
    .get(`http://localhost:4001/classes/class-by-numeric/${numeric}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(`There was an error retrieving the class: ${error}`);
      throw new Error(error);
    });
};

export const fetchClassById = async (id: number) => {
  return await axios
    .get(`http://localhost:4001/classes/class-by-id/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(`There was an error retrieving the class: ${error}`);
      throw new Error(error);
    });
};

export const createClass = (props: ClassObject) => {
  // Send POST request to 'classes/create' endpoint
  return axios
    .post("http://localhost:4001/classes/create", {
      numeric: props.numeric,
      title: props.title,
      professor: props.professor,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(
        `There was an error creating the ${props.title} class: ${error}`
      );
      throw new Error(error);
    });
};

export const deleteClass = (id: number) => {
  // Send PUT request to 'classes/delete' endpoint
  return axios
    .delete(`http://localhost:4001/classes/${id}`)
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(`There was an error removing the class: ${error}`);
      throw new Error(error);
    });
};

export const resetClasses = () => {
  // Send PUT request to 'books/reset' endpoint
  return axios
    .put("http://localhost:4001/classes/reset")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(`There was an error resetting the classes list: ${error}`);
      throw new Error(error);
    });
};
