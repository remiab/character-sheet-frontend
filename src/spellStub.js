import React from "react";
import "./spellStub.css";
import PrepareBtn from "./PrepareBtn";

export default function SpellStub(props) {
  return (
    <div className="SpellStub spell_pill row d-flex justify-content-between align-items-center py-1">
      <div className="col-sm-8">
        <span className="spell-display d-flex" id="spell_name">
          {props.spell_name}
        </span>
      </div>
      <div className="col-sm-4 btn-container">
        <PrepareBtn name={props.spell_name} status={props.status} />
      </div>
    </div>
  );
}
