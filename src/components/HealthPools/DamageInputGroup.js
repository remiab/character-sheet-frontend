import React from "react";
import "./HealthPools.css";

export default function DamangeInputGroup() {
  return (
    <div className="DamageInputGroup">
      <button className="btn standard-sm-btn heal-dmg-btn">HEAL</button>
      <input type="number"></input>
      <button className="btn standard-sm-btn heal-dmg-btn">DAMAGE</button>
    </div>
  );
}
