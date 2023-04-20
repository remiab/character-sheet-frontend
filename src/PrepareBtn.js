import React, { useState } from "react";
import axios from "axios";

export default function PrepareBtn(props) {
  const name = props.name.toLowerCase();
  const [prepared, setPrepared] = useState(props.status);
  let apiUrl = `update/prepare/${name}`;
  let update_dict = {};
  update_dict["spell_name"] = name;

  function prepareSpell(event) {
    event.preventDefault();
    setPrepared("Y");

    update_dict["spell_status"] = "Y";

    axios.put(apiUrl, update_dict).catch((err) => console.log(err));
  }

  function unprepareSpell(event) {
    event.preventDefault();
    setPrepared("N");

    update_dict["spell_status"] = "N";
    axios.put(apiUrl, update_dict).catch((err) => console.log(err));
  }

  if (prepared === "Y") {
    return (
      <button
        type="button"
        className="btn btn-sm col-12 standard-sm-btn prepare-btn"
        onClick={unprepareSpell}
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
          onClick={prepareSpell}
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
