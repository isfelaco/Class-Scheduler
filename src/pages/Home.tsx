import React, { useState } from "react";
import {
  createClass,
  deleteClass,
  fetchClasses,
  resetClasses,
} from "../queryHooks";
import { NavLink } from "react-router-dom";

export default function Home() {
  const newClass = {
    numeric: "Numeric",
    title: "Title",
    professor: "professor",
  };

  return (
    <div>
      <button onClick={() => createClass(newClass)}>Create Class</button>
      <button onClick={() => deleteClass(3, "Title")}>Delete Class</button>
      <button onClick={resetClasses}>Reset Class</button>

      <div>
        <NavLink to="/my-classes">My Classes</NavLink>
      </div>
    </div>
  );
}
