import React from "react";
import "./HealthPools.css";
// import { formatDate } from "../functions";

export default function DamageInputGroup(props) {
  function acceptDamage(event) {
    event.preventDefault();

    // let occurred = new Date();
    // occurred = formatDate(occurred);

    let damage_select = document.querySelector("#DamageInput");
    let damage_taken = damage_select.value;
    damage_taken = parseInt(damage_taken);

    let trigger_btn = document.activeElement;
    trigger_btn = trigger_btn.getAttribute("id");

    if (trigger_btn === "heal-btn") {
      props.recordDamage(damage_taken, "heal", "test");
    } else {
      damage_taken = damage_taken * -1;
      props.recordDamage(damage_taken, "damage", "test");
    }
    damage_select.value = "";
  }

  return (
    <div className="DamageInputGroup">
      <form onSubmit={acceptDamage}>
        <button
          className="btn standard-sm-btn heal-dmg-btn"
          id="heal-btn"
          type="submit"
        >
          HEAL
        </button>
        <input type="number" id="DamageInput"></input>
        <button
          className="btn standard-sm-btn heal-dmg-btn"
          id="damage-btn"
          type="submit"
        >
          DAMAGE
        </button>
      </form>
    </div>
  );
}
