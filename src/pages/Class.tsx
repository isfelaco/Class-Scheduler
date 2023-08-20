import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { classAssignments } from "../hooks/assignmentHooks";
import { AssignmentObject } from "../types";
import Table from "../components/Table";
import Page from "../components/Page";

export default function Class() {
  let location = useLocation();
  const c = location.state.class;

  const [assignments, setAssignments] = useState<[] | null>(null);
  useEffect(() => {
    classAssignments(c.numeric).then((res) => setAssignments(res));
  }, []);

  return (
    <Page header={c.title}>
      {assignments && assignments.length > 0 ? (
        <Table
          headerData={["Class Numeric", "Title", "Description", "Due Date"]}
          data={assignments}
          button1Text="View"
          button1Action={() => console.log("view assignment")}
          button2Text="Delete"
          button2Action={() => console.log("delete assignment")}
        />
      ) : (
        <p>No assignments for this class</p>
      )}
    </Page>
  );
}
