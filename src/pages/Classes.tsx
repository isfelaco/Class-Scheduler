import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createClass,
  deleteClass,
  fetchClasses,
  resetClasses,
} from "../hooks/classHooks";
import { ClassObject } from "../types";
import Table from "../components/Table";
import styled from "styled-components";
import Modal from "../components/Modal";
import Page from "../components/Page";

export default function Classes() {
  const [classes, setClasses] = useState<[] | null>(null);
  const [openModal, setModal] = useState(false);

  useEffect(() => {
    updateClasses();
  }, []);

  function updateClasses() {
    fetchClasses().then((res) => {
      setClasses(res);
    });
  }

  const navigate = useNavigate();
  const openClass = (c: ClassObject) => {
    navigate(`/my-classes/${c.numeric}`, {
      state: {
        class: c,
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
    updateClasses();
    openClass(c);
  };

  const handleDeleteClass = async (c: ClassObject) => {
    await deleteClass(c.id || 0); // temporary
    updateClasses();
  };

  const handleResetClasses = async () => {
    await resetClasses();
    updateClasses();
  };

  return (
    <Page header="Classes">
      <button onClick={() => setModal(true)}>Add a Class</button>
      <button onClick={handleResetClasses}>Reset All Classes</button>
      <Table
        headerData={["Numeric", "Professor", "Title"]}
        data={classes}
        button1Text="View"
        button1Action={openClass}
        button2Text="Delete"
        button2Action={handleDeleteClass}
      />
      {openModal && (
        <Modal onClose={() => setModal(false)}>
          <form onSubmit={handleCreateClass}>
            <h2>Create Class</h2>
            <label>Numeric</label>
            <input type="text" name="numeric" />
            <label>Title</label>
            <input type="text" name="title" />
            <label>Professor</label>
            <input type="text" name="professor" />
            <input type="submit" value="Create" />
          </form>
        </Modal>
      )}
    </Page>
  );
}
