import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createClass,
  deleteClass,
  fetchClasses,
  resetClasses,
  fetchClass,
} from "../hooks/classHooks";
import { ClassObject } from "../types";

export default function Classes() {
  const [classes, setClasses] = useState<[] | null>(null);

  useEffect(() => {
    fetchClasses().then((res) => {
      setClasses(res);
    });
  });

  const newClass = {
    numeric: "CS 1111",
    title: "Title",
    professor: "professor",
  };

  const navigate = useNavigate();
  const openClass = (c: ClassObject) => {
    navigate(`/my-classes/${c.numeric}`, {
      state: {
        class: c,
      },
    });
  };

  const handleCreateClass = async () => {
    const c = await createClass(newClass);
    openClass(c);
  };

  return (
    <div>
      <h1>My Classes</h1>
      <button onClick={handleCreateClass}>Add Class</button>
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
                  <button onClick={() => openClass(c)}>View Class</button>
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
