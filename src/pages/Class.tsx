import React from "react";
import { useLocation } from "react-router-dom";

export default function Class() {
  let location = useLocation();
  const c = location.state.class;

  return (
    <div>
      <h1>{c.title}</h1>
      <p>{c.id}</p>
    </div>
  );
}
