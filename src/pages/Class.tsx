import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchAssignmentsByClass } from "../hooks/assignmentHooks";
import Table from "../components/Table";
import Page from "../components/Page";
import { editClass, fetchClassById } from "../hooks/classHooks";
import { Button } from "../components/Button";

export default function Class() {
  let location = useLocation();
  const [c, setClass] = useState(location.state.class);
  const user = location.state.user;

  const [assignments, setAssignments] = useState<[] | null>(null);
  useEffect(() => {
    updateClass();
  }, []);

  function updateClass() {
    fetchAssignmentsByClass(c.numeric, user).then((res) => setAssignments(res));
    fetchClassById(c.id).then((res) => setClass(res));
  }

  const handleEditClass = async () => {
    let newClass = c;
    newClass.title = "New Title!";
    newClass.professor = "Professor";
    const res = await editClass(newClass);
    updateClass();
  };

  return (
    <Page header={c.title}>
      <h3>{c.professor}</h3>
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
      <Button onClick={handleEditClass}>Edit Class</Button>
    </Page>
  );
}
