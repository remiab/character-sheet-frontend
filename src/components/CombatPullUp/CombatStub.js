import React from "react";
import "./CombatPullUp.css";

export default function CombatStub(props) {
  console.log(props.spells);
  let type = props.type;
  let spell_dict = props.spells[1];
  if ((type = "spell")) {
    return (
      <div className="CombatStub">
        <div className="row py-1">
          <div className="col-5 action-name">{props.spells[0]}</div>
          <button className="btn standard-sm-btn cast-btn col-1">CAST</button>
        </div>
        <div className="cast-levels row"></div>
      </div>
    );
  }
}
