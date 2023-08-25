import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { fetchAssignmentsByClass } from "../hooks/assignmentHooks";
import Table from "../components/Table";
import Page from "../components/Page";
import { editClass, fetchClassById } from "../hooks/classHooks";
import { Button } from "../components/Button";
import Modal from "../components/Modal";
import Form from "../components/Form";
import { formDataToObject } from "../types";

export default function Class() {
  let location = useLocation();
  const user = location.state.user;
  const [c, setClass] = useState(location.state.class);
  const [openModal, setModal] = useState(false);
  const [error, setError] = useState("");

  const [assignments, setAssignments] = useState<[] | null>(null);
  useEffect(() => {
    updateClass();
  }, []);

  function updateClass() {
    fetchAssignmentsByClass(c.numeric, user).then((res) => setAssignments(res));
    fetchClassById(c.id).then((res) => setClass(res));
  }

  const handleEditClass = async (e: any) => {
    setModal(false);
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = formDataToObject(formData); // normalize data
    const res = await editClass(obj); // create assignment with foreign key
    if (res.error) setError("There was an error editing this class");
    else setError("");
    updateClass();
  };

  return (
    <Page header={`${c.numeric}: ${c.title}`}>
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
      <Button onClick={() => setModal(true)}>Edit Class</Button>
      {openModal && (
        <Modal onClose={() => setModal(false)}>
          <Form onSubmit={handleEditClass}>
            <label>Numeric</label>
            <input type="text" readOnly name="numeric" value={c.numeric} />
            <label>Title</label>
            <input type="text" name="title" defaultValue={c.title} />
            <label>Professor</label>
            <input type="text" name="professor" defaultValue={c.professor} />
            <input type="hidden" name="id" value={c.id} />
            <input type="submit" value="Save Changes" className="submit" />
          </Form>
        </Modal>
      )}
      {error && <i>{error}</i>}
    </Page>
  );
}
