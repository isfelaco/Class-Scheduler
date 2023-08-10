import React, { ReactElement, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Assignments from "./pages/Assignments";
import Class from "./pages/Class";

export const pages: { [id: string]: ReactElement } = {
  "/": <Home />,
  "/my-classes": <Classes />,
  "/my-assignments": <Assignments />,
};

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {Object.entries(pages).map(([route, element], i) => (
            <Route path={route} element={element} key={i} />
          ))}
          <Route path="/my-classes/:id" element={<Class />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
