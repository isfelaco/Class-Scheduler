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
      {assignments &&
        assignments.map((a: any) => (
          <div key={a.id}>
            <p>
              {a.id}. {a.title}
            </p>
            <button onClick={() => deleteAssignment(a.id, a.title)}>
              Delete Class
            </button>
          </div>
        ))}
    </div>
  );
}
