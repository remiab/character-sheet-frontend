import React, { useState } from "react";
import PrepareBtn from "./PrepareBtn";
import SpellDescImg from "./SpellDescImg";

export default function SpellStub(props) {
  const [dropdown, SetDropDown] = useState(false);
  const showImage = () => SetDropDown(!dropdown);

  return (
    <div className="SpellStub">
      <div className="spell_pill row d-flex justify-content-between align-items-center">
        <div className="col-sm-8">
          <span
            className="spell-display d-flex"
            id="spell_name"
            onClick={showImage}
          >
            {props.spell_name}
          </span>
        </div>
        <div className="col-sm-4 btn-container">
          <PrepareBtn
            name={props.spell_name}
            status={props.status}
            toUpdatePrepared={props.toUpdatePrepared}
            level={props.level}
          />
        </div>
      </div>
      <div
        className={
          dropdown
            ? "desc-dropdown desc-dropdown-active d-block"
            : "desc-dropdown desc-dropdown-hidden d-none"
        }
      >
        <SpellDescImg name={props.spell_name} dropdown={dropdown} />
      </div>
    </div>
  );
}
