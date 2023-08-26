import React from "react";
import styled from "styled-components";
import { LinkedButton } from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  align-items: center;
  height: 100vh;
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

type PageProps = {
  header: string;
  children?: any;
};

export default function Page(props: PageProps) {
  const { header, children } = props;
  const user = localStorage.getItem("user");
  return (
    <Container>
      <Header>
        <LinkedButton link="/">Home</LinkedButton>
        <h1>{header}</h1>
        {header === "Classes" ? (
          <LinkedButton link={`/${user}/my-assignments`} state={user}>
            Assignments
          </LinkedButton>
        ) : (
          <LinkedButton link={`/${user}/my-classes`} state={user}>
            Classes
          </LinkedButton>
        )}
      </Header>
      {children}
    </Container>
  );
}
