import React, { useState } from "react";
import { fetchClasses } from "../queryHooks";

export default function Classes() {
  const [classes, setClasses] = useState([]);

  fetchClasses().then((res) => {
    setClasses(res);
  });
  return (
    <div>
      <h1>My Classes</h1>
      {classes.map((c: any) => (
        <p key={c.id}>
          {c.id}. {c.title}
        </p>
      ))}
    </div>
  );
}
