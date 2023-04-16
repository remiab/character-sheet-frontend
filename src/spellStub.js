import React from "react";
import "./spellStub.css";
// import axios from "axios"

export default function SpellStub(props) {
  return (
    <div className="spell_pill d-flex justify-content-around">
      <span className="col-sm-3 spell-display" id="spell_name">
        {props.spell_name}
      </span>
      <span className="col-sm-1 spell-display" id="level">
        {props.level}
      </span>
      <span className="col-sm-2- btn standard-btn">{props.status}</span>
    </div>
  );
}
