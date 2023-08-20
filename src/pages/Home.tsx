import React, { useState } from "react";
import styled from "styled-components";
import { Button, ButtonRow, LinkedButton } from "../components/Button";
import { createUser, fetchUser, fetchUsers } from "../hooks/userHooks";
import { User } from "../types";
import Form from "../components/Form";
import Modal from "../components/Modal";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100%;
`;

export default function Home() {
  fetchUsers().then((res) => console.log(res));
  const [user, setUser] = useState<User | null>(null);
  const [newUser, setNewUser] = useState<User | null>(null);
  const [openModal, setModal] = useState(false);

  // source: https://www.designcise.com/web/tutorial/how-to-convert-html-form-data-to-javascript-object
  function formDataToObject(formData: any) {
    const normalizeValues = (values: any) =>
      values.length > 1 ? values : values[0];
    const formElemKeys = Array.from(formData.keys());
    return Object.fromEntries(
      // store array of values or single value for element key
      formElemKeys.map((key) => [key, normalizeValues(formData.getAll(key))])
    );
  }
  const handleLogin = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = formDataToObject(formData);
    fetchUser(obj).then((res) => {
      if (res) setUser(obj);
      else {
        setNewUser(obj);
        setModal(true);
      }
    });
  };

  const handleCreateUser = async () => {
    if (newUser) await createUser(newUser);
    setUser(newUser);
    setModal(false);
  };

  return (
    <HomeContainer>
      <h1>Class Scheduler</h1>
      <i>
        {user
          ? `Logged in as ${user?.username}`
          : "Log in or create an account to continue"}
      </i>
      {user && (
        <ButtonRow>
          <LinkedButton link="/my-classes">View Classes</LinkedButton>
          <LinkedButton link="/my-assignments">View Assignments</LinkedButton>
        </ButtonRow>
      )}
      {!user && (
        <Form onSubmit={handleLogin}>
          <label>Username</label>
          <input type="text" name="username" />
          <label>Password</label>
          <input type="text" name="password" />
          <input type="submit" value="Login" className="submit" />
        </Form>
      )}
      <Button onClick={() => setUser(null)}>Logout</Button>
      {openModal && (
        <Modal onClose={() => setModal(false)}>
          <h1>Create User</h1>
          <p>This user does not exist. Would you like to create a new user?</p>
          <Button onClick={handleCreateUser}>Create User</Button>
        </Modal>
      )}
    </HomeContainer>
  );
}
