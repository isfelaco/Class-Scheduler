import React, { useEffect, useState } from "react";
import {
  createAssignment,
  deleteAssignment,
  fetchAssignments,
  resetAssignments,
} from "../hooks/assignmentHooks";
import Table from "../components/Table";
import styled from "styled-components";
import Modal from "../components/Modal";
import { fetchClassByNumeric } from "../hooks/classHooks";

const AssignmentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default function Assignments() {
  const [assignments, setAssignments] = useState<[] | null>(null);
  const [openModal, setModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    updateAssignments();
  }, []);

  function updateAssignments() {
    fetchAssignments().then((res) => setAssignments(res));
  }

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
    const obj = formDataToObject(formData); // normalize data
    const a = await createAssignment(obj); // create assignment with foreign key

    if (a.error) {
      if (a.error.errno === 19) {
        setError(
          "There was an error adding this assignment. Make sure you are adding an assignment to an existing class."
        );
      }
    } else {
      setError("");
      updateAssignments();
    }
  };

  const handleDeleteAssignment = async (id: number) => {
    deleteAssignment(id);
    updateAssignments();
  };

  const handleResetAssignments = async () => {
    await resetAssignments();
    updateAssignments();
  };

  return (
    <AssignmentsContainer>
      <h1>Assignments</h1>
      <button onClick={() => setModal(true)}>Create Assignment</button>
      <button onClick={handleResetAssignments}>Reset All Assignments</button>
      {assignments && assignments.length > 0 ? (
        <Table
          headerData={["Class Numeric", "Title", "Description", "Due Date"]}
          data={assignments}
          onView={() => console.log("view assignment")}
          onDelete={handleDeleteAssignment}
        />
      ) : (
        <h3>No assignments! Click Create Assignment to add one.</h3>
      )}
      {openModal && (
        <Modal onClose={() => setModal(false)}>
          <form onSubmit={handleCreateAssignment}>
            <h2>Create Class</h2>
            <label>Class Numeric</label>
            <input type="string" name="class_numeric" />
            <label>Title</label>
            <input type="text" name="title" />
            <label>Description</label>
            <input type="text" name="description" />
            <input type="submit" value="Create Assignment" />
          </form>
        </Modal>
      )}
      {error && <h3>{error}</h3>}
    </AssignmentsContainer>
  );
}
