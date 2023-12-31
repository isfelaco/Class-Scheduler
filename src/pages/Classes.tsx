import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  createClass,
  deleteClass,
  resetClasses,
  fetchClassesByUser,
} from "../hooks/classHooks";
import { ClassObject } from "../types";
import Table from "../components/Table";
import Modal from "../components/Modal";
import Page from "../components/Page";
import { Button, ButtonRow } from "../components/Button";
import Form from "../components/Form";

export default function Classes() {
  const [classes, setClasses] = useState<[] | null>(null);
  const [openModal, setModal] = useState(false);
  const [error, setError] = useState("");

  let location = useLocation();
  const user = location.state;

  useEffect(() => {
    updateClasses();
  }, []);

  function updateClasses() {
    fetchClassesByUser(user).then((res) => setClasses(res));
  }

  const navigate = useNavigate();
  const openClass = (c: ClassObject) => {
    navigate(`${c.numeric}`, {
      state: {
        class: c,
        user: user,
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
    setModal(false);
    e.preventDefault();
    const formData = new FormData(e.target);
    const obj = formDataToObject(formData);
    const c = await createClass(obj);
    if (c.error) {
      setError(
        "There was an error adding this class. This class may already exist."
      );
    } else {
      setError("");
      updateClasses();
      openClass(c);
    }
  };

  const handleDeleteClass = async (c: ClassObject) => {
    if (c.id) {
      const d = await deleteClass(c.id);
      if (d.error) setError("There was an error deleting this class");
      else {
        setError("");
        updateClasses();
      }
    }
  };

  const handleResetClasses = async () => {
    await resetClasses();
    updateClasses();
  };

  return (
    <Page header="Classes">
      <ButtonRow>
        <Button onClick={() => setModal(true)}>Add a Class</Button>
        <Button onClick={handleResetClasses}>Reset All Classes</Button>
      </ButtonRow>
      {classes && classes.length > 0 ? (
        <Table
          headerData={["Numeric", "Professor", "Title"]}
          data={classes}
          button1Text="View"
          button1Action={openClass}
          button2Text="Delete"
          button2Action={handleDeleteClass}
        />
      ) : (
        <h3>No classes! Click Add a Class to create one.</h3>
      )}
      {error && <i>{error}</i>}
      {openModal && (
        <Modal onClose={() => setModal(false)}>
          <Form onSubmit={handleCreateClass}>
            <h2>Create Class</h2>
            <label>Numeric</label>
            <input type="text" name="numeric" />
            <label>Title</label>
            <input type="text" name="title" />
            <label>Professor</label>
            <input type="text" name="professor" />
            <input type="hidden" name="user" value={user} />
            <input type="submit" value="Create" className="submit" />
          </Form>
        </Modal>
      )}
    </Page>
  );
}
