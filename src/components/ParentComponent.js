// ParentComponent.js
import React, { useState } from "react";
import Navbar from "./Navbar";

function ParentComponent() {
  const [algorithm, setAlgorithm] = useState("Dijkstra");

  return (
    <div>
      <Navbar algorithm={algorithm} setAlgorithm={setAlgorithm} />
      {/* Other components that need access to the algorithm */}
    </div>
  );
}

export default ParentComponent;
