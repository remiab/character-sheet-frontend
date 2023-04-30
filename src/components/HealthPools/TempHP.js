import React, { useState } from "react";
import axios from "axios";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";
import "./HealthPools.css";
import { formatDate } from "../functions";

export default function TempHP(props) {
  const character = constList.character_name;
  const [display, setDisplay] = useState(true);
  const [ready, setReady] = useState(props.ready);
  const [thp, setTHP] = useState(props.current);

  function switchToInput(event) {
    event.preventDefault();
    setDisplay(false);
  }

  async function addTempHP(event) {
    event.preventDefault();
    let updateTempHP = {};
    let to_add = document.querySelector("#tempHPSubmit");
    to_add = to_add.value;
    let occurred = new Date();
    occurred = formatDate(occurred);

    updateTempHP["thp"] = to_add;
    updateTempHP["date_occurred"] = occurred;
    updateTempHP["event"] = "test";

    let putApiUrl = `/${character}/hit_points/temp_hp/update`;
    await axios.put(putApiUrl, updateTempHP).catch((err) => console.log(err));
    setReady(false);
    setDisplay(true);
  }

  function handleResponse(response) {
    setReady(true);
    setTHP(response.data.current_thp);
  }

  if (ready) {
    if (display) {
      return (
        <div className="TempHPGroup">
          <div className="hp-label">TEMP</div>
          <button
            className="TempHP tempHPdisp-btn heal-dmg-btn btn col-12"
            onClick={switchToInput}
          >
            {thp}
          </button>
          <div className="hp-label">HP</div>
        </div>
      );
    } else {
      return (
        <div className="TempHPGroup">
          <div className="hp-label">TEMP</div>
          <form className="pt-2" onSubmit={addTempHP}>
            <input type="number" id="tempHPSubmit"></input>
          </form>
          <div className="hp-label">HP</div>
        </div>
      );
    }
  } else {
    let getApiUrl = `${character}/hit_points/temp_hp`;
    axios
      .get(getApiUrl)
      .then(handleResponse)
      .catch((err) => console.log(err));
  }
}
