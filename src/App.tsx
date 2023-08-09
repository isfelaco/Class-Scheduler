import React, { ReactElement, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Classes from "./pages/Classes";

export const pages: { [id: string]: ReactElement } = {
  "/": <Home />,
  "/my-classes": <Classes />,
};

export default function App() {
  // fetchClasses().then((res) => {
  //   setClasses(res);
  // });

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {Object.entries(pages).map(([route, element], i) => (
            <Route path={route} element={element} key={i} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
