import React, { useEffect, useState } from "react";
import {
  createAssignment,
  deleteAssignment,
  fetchAssignments,
} from "../hooks/assignmentHooks";

export default function Assignments() {
  const [assignments, setAssignments] = useState<[] | null>(null);

  useEffect(() => {
    fetchAssignments().then((res) => {
      setAssignments(res);
    });
  });

  const newAssignment = {
    classID: 1,
    title: "Assignment",
    description: "My first assignment",
    dueDate: new Date(),
  };
  //   console.log(assignments);

  return (
    <div>
      <h1>Assignments</h1>
      <button onClick={() => createAssignment(newAssignment)}>
        Create Assignment
      </button>
      <table>
        <thead>
          <tr>
            <th>Class</th>
            <th>Title</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {assignments &&
            assignments.map((a: any) => (
              <tr key={a.id}>
                <td>{a.classID}</td>
                <td>{a.title}</td>
                <td>{a.description}</td>
                <td>
                  <button onClick={() => deleteAssignment(a.id, a.title)}>
                    Delete Class
                  </button>
                  <button
                    onClick={() => console.log("View class " + a.classID)}
                  >
                    View Class
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
