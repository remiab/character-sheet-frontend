import React, { useState } from "react";
import axios from "axios";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";

export default function TempHP() {
  const character = constList.character_name;
  const [display, setDisplay] = useState(true);
  const [tHP, setTHP] = useState({
    ready: false,
  });
  function switchToInput(event) {
    setDisplay(false);
  }

  function addTempHP() {
    setDisplay(true);
    console.log("tried to submit");
  }

  function handleResponse(response) {
    setTHP({
      ready: true,
      temp_hp: response.data.current_thp,
    });
  }
  if (tHP.ready) {
    console.log(display);
    if (display) {
      return (
        <button className="TempHP" onClick={switchToInput}>
          {tHP.temp_hp}
        </button>
      );
    } else {
      return <input type="number" onSubmit={addTempHP}></input>;
    }
  } else {
    let getApiUrl = `${character}/hit_points/temp_hp`;
    axios
      .get(getApiUrl)
      .then(handleResponse)
      .catch((err) => console.log(err));
  }
}
