import React, { useEffect, useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import {
  createClass,
  ClassParams,
  fetchClasses,
  deleteClass,
  resetClasses,
} from "./queryHooks";

export default function App() {
  const [id, setId] = useState<number | null>(null);
  const newClass = {
    numeric: "Numeric",
    title: "Title",
    professor: "professor",
  };

  const [classes, setClasses] = useState([]);
  fetchClasses().then((res) => {
    setClasses(res);
  });

  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <button onClick={() => createClass(newClass)}>Create Class</button>
      <button onClick={() => deleteClass(3, "Title")}>Delete Class</button>
      <button onClick={resetClasses}>Reset Class</button>
      {/* </header> */}
      {classes.map((c: any) => (
        <h1 key={c.id}>
          {c.id}, {c.title}
        </h1>
      ))}
    </div>
  );
}
