import React from "react";
import "./Loading.scss";

export default function Loading() {
  return (
    <>
      <div className="lds-container">
        <div className="lds-dual-ring"></div>
      </div>
    </>
  );
}
