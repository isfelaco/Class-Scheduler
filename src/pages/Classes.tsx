import React, { useEffect, useState } from "react";
import {
  createClass,
  deleteClass,
  fetchClasses,
  resetClasses,
} from "../hooks/classHooks";

export default function Classes() {
  const [classes, setClasses] = useState<[] | null>(null);

  useEffect(() => {
    fetchClasses().then((res) => {
      setClasses(res);
    });
  });

  const newClass = {
    numeric: "Numeric",
    title: "Title",
    professor: "professor",
  };

  return (
    <div>
      <h1>My Classes</h1>
      <button onClick={() => createClass(newClass)}>Create Class</button>
      <button onClick={resetClasses}>Reset All Classes</button>
      {classes &&
        classes.map((c: any) => (
          <div key={c.id}>
            <p>
              {c.id}. {c.title}
            </p>
            <button onClick={() => deleteClass(c.id, c.title)}>
              Delete Class
            </button>
          </div>
        ))}
    </div>
  );
}
