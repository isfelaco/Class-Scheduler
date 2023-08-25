import React, { useEffect, useState } from "react";
import {
  createAssignment,
  deleteAssignment,
  fetchAssignmentsByUser,
  resetAssignments,
} from "../hooks/assignmentHooks";
import Table from "../components/Table";
import Modal from "../components/Modal";
import { Assignment, formDataToObject } from "../types";
import Page from "../components/Page";
import { Button, ButtonRow } from "../components/Button";
import Form from "../components/Form";
import { useLocation } from "react-router-dom";

export default function Assignments() {
  const [assignments, setAssignments] = useState<[] | null>(null);
  const [openModal, setModal] = useState(false);
  const [error, setError] = useState("");

  let location = useLocation();
  const user = location.state;

  useEffect(() => {
    updateAssignments();
  }, []);

  function updateAssignments() {
    fetchAssignmentsByUser(user).then((res) => setAssignments(res));
  }

  const handleCreateAssignment = async (e: any) => {
    setModal(false);
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = formDataToObject(formData); // normalize data
    const res = await createAssignment(obj); // create assignment with foreign key
    if (res.error) {
      console.error(res.error);
      if (res.error.errno === 19) {
        setError(
          "There was an error adding this assignment. Make sure you are adding an assignment to an existing class."
        );
      }
    } else {
      setError("");
      updateAssignments();
    }
  };

  const handleDeleteAssignment = async (a: Assignment) => {
    const d = await deleteAssignment(a.id);
    if (d.error) setError("There was an error deleting this assignment");
    else {
      setError("");
      updateAssignments();
    }
  };

  const handleResetAssignments = async () => {
    await resetAssignments();
    updateAssignments();
  };

  return (
    <Page header="Assignments">
      <ButtonRow>
        <Button onClick={() => setModal(true)}>Create Assignment</Button>
        <Button onClick={handleResetAssignments}>Reset All Assignments</Button>
      </ButtonRow>
      {assignments && assignments.length > 0 ? (
        <Table
          headerData={["Class Numeric", "Title", "Description", "Due Date"]}
          data={assignments}
          button1Text="idk"
          button1Action={() => console.log("idk")}
          button2Text="Delete"
          button2Action={handleDeleteAssignment}
        />
      ) : (
        <h3>No assignments! Click Create Assignment to add one.</h3>
      )}
      {openModal && (
        <Modal onClose={() => setModal(false)}>
          <Form onSubmit={handleCreateAssignment}>
            <h2>Create Class</h2>
            <label>Class Numeric</label>
            <input type="string" name="class_numeric" />
            <label>Title</label>
            <input type="text" name="title" />
            <label>Description</label>
            <input type="text" name="description" />
            <label>Due Date</label>
            <input type="date" name="due_date" />
            <input type="hidden" name="user" value={user} />
            <input type="submit" value="Create Assignment" className="submit" />
          </Form>
        </Modal>
      )}
      {error && <i>{error}</i>}
    </Page>
  );
}
