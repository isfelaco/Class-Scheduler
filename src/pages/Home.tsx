import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ButtonRow, LinkedButton } from "../components/Button";

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
  return (
    <HomeContainer>
      <h1>Class Scheduler</h1>
      <ButtonRow>
        <LinkedButton link="/my-classes">View Classes</LinkedButton>
        <LinkedButton link="/my-assignments">View Assignments</LinkedButton>
      </ButtonRow>
    </HomeContainer>
  );
}
