import React, { useState } from "react";
import axios from "axios";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";
import CastTimeCard from "./CastTimeCard";
import HealthPools from "../HealthPools/HealthPools";
import { CombatContext } from "../../Contexts/CastLevelSpellContext";
import Expendables from "./Expendables/Expendables";

export default function CombatPullUp() {
  const character = constList.character_name;
  const [ready, setReady] = useState(false);
  const [castDict, setCastDict] = useState({});
  const cast_time_dict = {
    A: {},
    BA: {},
    Rn: {},
  };

  const [slot_reset, setSlotReset] = useState(false);
  const [slot_available, setSlotAvailable] = useState(false);

  const [healthPools, setHealthPools] = useState({});
  const [maxPools, setMaxPools] = useState({});

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
        <div className=" row d-flex py-3 align-items-center">
          <div className="col-8">
            <CombatContext.Provider
              value={{
                slot_reset,
                setSlotReset,
                slot_available,
                setSlotAvailable,
              }}
            >
              <Expendables />
            </CombatContext.Provider>
          </div>
          <div className="col-4">
            <CombatContext.Provider
              value={{
                healthPools,
                setHealthPools,
                maxPools,
                setMaxPools,
                slot_reset,
              }}
            >
              <HealthPools />
            </CombatContext.Provider>
          </div>
        </div>
        <div className=" row d-flex py-3">
          <div className="col-6">
            <CombatContext.Provider
              value={{
                healthPools,
                maxPools,
                slot_reset,
                slot_available,
                setSlotReset,
              }}
            >
              <CastTimeCard
                key="An"
                spells={castDict["A"]}
                cast_time="Action"
              />
            </CombatContext.Provider>
          </div>
          <div className="col-6">
            <CombatContext.Provider
              value={{
                healthPools,
                maxPools,
                slot_reset,
                slot_available,
                setSlotReset,
              }}
            >
              <CastTimeCard
                key="BA"
                spells={castDict["BA"]}
                cast_time="Bonus Action"
              />
            </CombatContext.Provider>

            <CombatContext.Provider
              value={{
                healthPools,
                maxPools,
                slot_reset,
                slot_available,
                setSlotReset,
              }}
            >
              <CastTimeCard
                key="Rn"
                spells={castDict["Rn"]}
                cast_time="Reaction"
              />
            </CombatContext.Provider>
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
