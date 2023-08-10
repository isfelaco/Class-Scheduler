import React from "react";
import { useLocation } from "react-router-dom";

export default function Class() {
  let location = useLocation();
  const thisClass = location.state.class;
  console.log(thisClass);

  return (
    <div>
      <h1>{thisClass.title}</h1>
      <p>{thisClass.id}</p>
    </div>
  );
}
