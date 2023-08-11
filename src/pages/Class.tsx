import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { classAssignments } from "../hooks/assignmentHooks";
import { AssignmentObject } from "../types";

export default function Class() {
  let location = useLocation();
  const c = location.state.class;

  const [assignments, setAssignments] = useState<[] | null>(null);
  useEffect(() => {
    classAssignments(c.id).then((res) => setAssignments(res));
  });

  return (
    <div>
      <h1>{c.title}</h1>
      <p>{c.id}</p>
      {assignments?.map((a: AssignmentObject) => {
        return <div key={a.id}>{a.title}</div>;
      })}
    </div>
  );
}
