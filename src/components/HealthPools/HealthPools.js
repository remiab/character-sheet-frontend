import React from "react";
import DamangeInput from "./DamageInputGroup";

export default function HealthPools() {
  return (
    <div className="HealthPools row d-flex justify-content-between align-items-center">
      <div className="col-md-3">
        <DamangeInput />
      </div>
      <div className="col-md-3">
        <h3>91 / 101</h3>
      </div>
      <div className="col-md-2">
        <h3>temp</h3>
      </div>
      <div className="col-md-2">
        <h3>ward</h3>
      </div>
    </div>
  );
}
