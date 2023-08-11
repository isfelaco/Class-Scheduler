import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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
      <Link to="/my-classes">My Classes</Link>
      <Link to="/my-assignments">My Assignments</Link>
    </HomeContainer>
  );
}
