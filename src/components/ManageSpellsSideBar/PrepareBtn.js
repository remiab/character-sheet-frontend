import React, { useState } from "react";
import axios from "axios";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";

export default function PrepareBtn(props) {
  const character_name = constList.character_name;
  const name = props.name.toLowerCase();
  const [prepared, setPrepared] = useState(props.status);
  let apiUrl = `${character_name}/${name}/spell_list/prepare`;
  let update_dict = {};
  update_dict["spell_name"] = name;

  function prepareSpell(event) {
    event.preventDefault();
    if (props.limitReached) {
      //pass
    } else {
      setPrepared("Y");
      update_dict["spell_status"] = "Y";
      axios.put(apiUrl, update_dict).catch((err) => console.log(err));
      props.toUpdatePrepared(1, props.level);
    }
  }

  function unprepareSpell(event) {
    event.preventDefault();
    setPrepared("N");
    update_dict["spell_status"] = "N";
    axios.put(apiUrl, update_dict).catch((err) => console.log(err));
    props.toUpdatePrepared(-1, props.level);
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
          className={
            props.limitReached
              ? "btn btn-sm col-12 standard-sm-btn unprepare-btn disabled"
              : "btn btn-sm col-12 standard-sm-btn unprepare-btn"
          }
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
