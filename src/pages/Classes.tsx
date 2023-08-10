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
      <button onClick={() => createClass(newClass)}>Add Class</button>
      <button onClick={resetClasses}>Reset All Classes</button>
      <table>
        <thead>
          <tr>
            <th>Numeric</th>
            <th>Title</th>
            <th>Professor</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {classes &&
            classes.map((c: any) => (
              <tr key={c.id}>
                <td>{c.numeric}</td>
                <td>{c.title}</td>
                <td>{c.professor}</td>
                <td>
                  <button onClick={() => deleteClass(c.id, c.title)}>
                    Delete Class
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
