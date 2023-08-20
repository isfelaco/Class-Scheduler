import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { LinkedButton } from "../components/Button";

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  justify-content: center;

  height: 100vh;
  width: 100%;
`;

const Link = styled(NavLink)`
  border: 2px solid gray;
  background-color: lightGray;
  color: black;
  text-align: center;
  width: 150px;
`;

export default function Home() {
  return (
    <HomeContainer>
      <LinkedButton link="/my-classes">My Classes</LinkedButton>
      <LinkedButton link="/my-assignments">My Assignments</LinkedButton>
    </HomeContainer>
  );
}
