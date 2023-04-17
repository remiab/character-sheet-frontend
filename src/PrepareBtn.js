import React, { useState } from "react";

export default function PrepareBtn(props) {
  const [prepared, setPrepared] = useState(props.status);

  function prepareSpell(event) {
    event.preventDefault();
    setPrepared("N");
  }

  function unprepareSpell(event) {
    event.preventDefault();
    setPrepared("Y");
  }

  // if (prepared == 'Y'){
  //     let display_status = 'PREPARED'
  // } else{if (prepared == "N") {
  //   let display_status = "PREPARE";
  // } else { let display_status ="error"
  // }}

  if (prepared === "Y") {
    return (
      <button
        type="button"
        className="btn btn-sm col-12 standard-sm-btn prepare-btn"
        onClick={prepareSpell}
      >
        PREPARED
      </button>
    );
  } else {
    if (prepared === "N") {
      return (
        <button
          type="button"
          className="btn btn-sm col-12 standard-sm-btn unprepare-btn"
          onClick={unprepareSpell}
        >
          PREPARE
        </button>
      );
    } else {
      return (
        <button
          type="button"
          className="btn btn-sm col-12 btn-primary"
          onClick={unprepareSpell}
        >
          ERROR
        </button>
      );
    }
  }
}
