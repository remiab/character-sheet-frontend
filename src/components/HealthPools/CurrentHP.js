import React, { useState } from "react";
import axios from "axios";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";

export default function CurrentHP(props) {
  const character = constList.character_name;
  const [chp, setCHP] = useState({ ready: false });

  function handleResponse(response) {
    setCHP({
      ready: true,
      current: response.data.current_hp,
      max: response.data.max_hp,
    });
    props.recordCurrent("current", response.data.current_hp);
  }

  if (chp["ready"]) {
    return (
      <div>
        <div className="hp-label">CURRENT</div>
        <div className="CurrentHP col-12 px-0">
          {chp["current"]} / {chp["max"]}
        </div>
        <div className="hp-label">HIT POINTS</div>
      </div>
    );
  } else {
    let apiUrl = `${character}/hit_points/current_hp`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((err) => console.log(err));
  }
}
