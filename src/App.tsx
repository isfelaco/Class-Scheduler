import React, { ReactElement, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Assignments from "./pages/Assignments";
import Class from "./pages/Class";
import styled from "styled-components";

const AppContainer = styled.div`
  background-color: pink;
  min-height: 100vh;
`;

export const pages: { [id: string]: ReactElement } = {
  "/": <Home />,
  "/my-classes": <Classes />,
  "/my-classes/:n": <Class />,
  "/my-assignments": <Assignments />,
};

export default function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          {Object.entries(pages).map(([route, element], i) => (
            <Route path={route} element={element} key={i} />
          ))}
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}
