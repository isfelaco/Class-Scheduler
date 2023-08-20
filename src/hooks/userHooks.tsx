import axios from "axios";
import { User } from "../types";

export const fetchUsers = () => {
  return axios
    .get("http://localhost:4001/users/all")
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      console.error(`There was an error retrieving the users list: ${error}`);
      throw new Error(error);
    });
};

export const createUser = (props: User) => {
  // Send POST request to 'classes/create' endpoint
  return axios
    .post("http://localhost:4001/users/create", {
      username: props.username,
      password: props.password,
    })
    .then((res) => {
      console.log(res.data);
      return res.data;
    })
    .catch((error) => {
      console.error(
        `There was an error creating the ${props.username} user: ${error}`
      );
      throw new Error(error);
    });
};
