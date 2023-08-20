import React, { ReactElement, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Assignments from "./pages/Assignments";
import Class from "./pages/Class";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #96c8ee;
  height: 100vh;
`;

export const pages: { [id: string]: ReactElement } = {
  "/": <Home />,
  "/my-classes": <Classes />,
  "/my-classes/:n": <Class />,
  "/my-assignments": <Assignments />,
};

export default function App() {
  return (
    <AppContainer className="App">
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
