import React from "react";
import "./cylinder.css";

function Cylinder() {
  return (
    <div className="cylinder-container">
      <div className="cylinder-wrap">
        <div className="cylinder">
          <div className="cylinder__face cylinder__face--top"></div>
          <div className="cylinder__face cylinder__face--bottom"></div>
        </div>
      </div>
    </div>
  );
}

export default Cylinder;