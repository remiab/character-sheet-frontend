import React, { useState } from "react";
import axios from "axios";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";

export default function ArcaneWard() {
  const character = constList.character_name;
  const [aw, setAW] = useState({ ready: false });

  function handleResponse(response) {
    setAW({
      current_aw: response.data.current_well,
      max_aw: response.data.max_points,
      ready: true,
    });
  }

  if (aw.ready) {
    return (
      <div>
        <div className="hp-label">ARCANE</div>
        <div className="CurrentHP col-12 px-0">
          {aw["current_aw"]} / {aw["max_aw"]}
        </div>
        <div className="hp-label">WARD</div>
      </div>
    );
  } else {
    let apiUrl = `${character}/hit_points/arcane_ward`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((err) => console.log(err));
  }
}
