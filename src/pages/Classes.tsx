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

  const navigate = useNavigate();
  const openClass = (c: ClassObject) => {
    navigate(`/my-classes/${c.numeric}`, {
      state: {
        class: c,
      },
    });
  };

  // source: https://www.designcise.com/web/tutorial/how-to-convert-html-form-data-to-javascript-object
  function formDataToObject(formData: any) {
    const normalizeValues = (values: any) =>
      values.length > 1 ? values : values[0];
    const formElemKeys = Array.from(formData.keys());
    return Object.fromEntries(
      // store array of values or single value for element key
      formElemKeys.map((key) => [key, normalizeValues(formData.getAll(key))])
    );
  }

  const handleCreateClass = async (e: any) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = formDataToObject(formData);
    const c = await createClass(obj);
    openClass(c);
  };

  return (
    <div>
      <h1>My Classes</h1>
      <div>
        <form onSubmit={handleCreateClass}>
          <h2>Create Class</h2>
          <label>Numeric</label>
          <input type="text" name="numeric" />
          <label>Title</label>
          <input type="text" name="title" />
          <label>Professor</label>
          <input type="text" name="professor" />
          <input type="submit" value="Create" />
        </form>
      </div>

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
