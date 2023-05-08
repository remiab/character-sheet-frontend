import React, { useState } from "react";
import axios from "axios";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";
import CastTimeCard from "./CastTimeCard";

export default function CombatPullUp() {
  const character = constList.character_name;
  const [ready, setReady] = useState(false);
  const [castDict, setCastDict] = useState({});
  const cast_time_dict = {
    A: {},
    BA: {},
    Rn: {},
  };

  function handleResponse(response) {
    console.log(response.data);
    let times = ["A", "BA", "Rn"];
    for (let i = 0; i < response.data.length; i++) {
      if (times.includes(response.data[i].casting_unit)) {
        cast_time_dict[response.data[i].casting_unit][
          response.data[i].spell_name
        ] = response.data[i];
      } else {
        //pass
      }
    }
    setCastDict(cast_time_dict);
    setReady(true);
  }

  if (ready) {
    // console.log(castDict);
    return (
      <div className="CombatPullUp row d-flex py-3">
        {Object.entries(castDict).map((grouped_spells) => {
          return (
            <div className="col-4" key={grouped_spells}>
              <CastTimeCard grouped_spells={grouped_spells} />
            </div>
          );
        })}
      </div>
    );
  } else {
    let apiUrl = `/${character}/spell_list/prepared_spells`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((err) => console.log(err));
  }
}
