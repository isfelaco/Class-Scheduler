import React, { ReactElement } from "react";
import styled from "styled-components";
import { LinkedButton } from "./Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
`;

type PageProps = {
  header: string;
  children?: any;
};

export default function Page(props: PageProps) {
  const { header, children } = props;
  return (
    <Container>
      <Header>
        <LinkedButton link="/">Home</LinkedButton>
        <h1>{header}</h1>
        {header === "Classes" ? (
          <LinkedButton link="/my-assignments">Assignments</LinkedButton>
        ) : (
          <LinkedButton link="/my-classes">Classes</LinkedButton>
        )}
      </Header>
      {children}
    </Container>
  );
}
