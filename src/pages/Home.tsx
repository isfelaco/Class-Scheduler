import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div>
        <NavLink to="/my-classes">My Classes</NavLink>
      </div>
    </div>
  );
}
