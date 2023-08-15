import React, { useEffect, useState } from "react";
import {
  createAssignment,
  deleteAssignment,
  fetchAssignments,
} from "../hooks/assignmentHooks";
import Table from "../components/Table";
import styled from "styled-components";
import Modal from "../components/Modal";

const AssignmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Assignments() {
  const [assignments, setAssignments] = useState<[] | null>(null);
  const [openModal, setModal] = useState(false);

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

  const handleCreateAssignment = async (e: any) => {
    setModal(false);
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = formDataToObject(formData);
    const c = await createAssignment(obj);
    console.log(c);
    // openClass(c);
  };

  return (
    <AssignmentsContainer>
      <h1>Assignments</h1>
      <button onClick={() => setModal(true)}>Create Assignment</button>
      <Table
        headerData={["Class ID", "Title", "Description", "Due Date"]}
        data={assignments}
        onView={() => console.log("view assignment")}
        onDelete={deleteAssignment}
      />
      {openModal && (
        <Modal onClose={() => setModal(false)}>
          <form onSubmit={handleCreateAssignment}>
            <h2>Create Class</h2>
            <label>Class Numeric</label>
            <input type="text" name="class" />
            <label>Title</label>
            <input type="text" name="title" />
            <label>Description</label>
            <input type="text" name="description" />
            <input type="submit" value="Create Assignment" />
          </form>
        </Modal>
      )}
    </AssignmentsContainer>
  );
}
