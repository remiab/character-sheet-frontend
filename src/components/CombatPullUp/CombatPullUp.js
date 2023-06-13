import React, { useState } from "react";
import axios from "axios";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";
import CastTimeCard from "./CastTimeCard";
import HealthPools from "../HealthPools/HealthPools";

export default function CombatPullUp(props) {
  const character = constList.character_name;
  const [ready, setReady] = useState(false);
  const [castDict, setCastDict] = useState({});
  const cast_time_dict = {
    A: {},
    BA: {},
    Rn: {},
  };

  function handleResponse(response) {
    let times = ["A", "BA", "Rn"];
    for (let i = 0; i < response.data.length; i++) {
      if (response.data[i].level === 0) {
        cast_time_dict["BA"][response.data[i].spell_name] = response.data[i];
      } else {
        if (times.includes(response.data[i].casting_unit)) {
          cast_time_dict[response.data[i].casting_unit][
            response.data[i].spell_name
          ] = response.data[i];
        } else {
          //pass
        }
      }
    }
    setCastDict(cast_time_dict);
    setReady(true);
  }

  if (ready) {
    return (
      <div className="CombatPullUp">
        <div className=" row d-flex py-3">
          <div className="col-6"></div>
          <div className="col-6"></div>
        </div>
        <div className=" row d-flex py-3">
          <div className="col-6">
            <CastTimeCard
              key={"An"}
              spells={castDict["A"]}
              cast_time="Action"
            />
          </div>
          <div className="col-6">
            <CastTimeCard
              key={"BA"}
              spells={castDict["BA"]}
              cast_time="Bonus Action"
            />
            <CastTimeCard
              key={"Rn"}
              spells={castDict["Rn"]}
              cast_time="Reaction"
            />
          </div>
        </div>
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
