import React, { useState } from "react";
import axios from "axios";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";
import CastTimeCard from "./CastTimeCard";
import HealthPools from "../HealthPools/HealthPools";
import { CastAbjContext } from "../../Contexts/CastAbjContext";
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
  // const [all_expended, setAllExpended] = useState(false);
  let expended_dict = {};
  const [trigger_exp_dict, setExpDict] = useState(false);
  const [abj_trigger, setAbjTrigger] = useState(null);
  const [slot_reset, setSlotReset] = useState(false);

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

  console.log(expended_dict);

  if (ready) {
    return (
      <div className="CombatPullUp">
        <div className=" row d-flex py-3">
          <div className="col-7">
            {/* <Expendables /> */}
            <CombatContext.Provider
              value={{
                expended_dict,
                trigger_exp_dict,
                setExpDict,
                slot_reset,
                setSlotReset,
              }}
            >
              <Expendables />
            </CombatContext.Provider>
          </div>
          <div className="col-5">
            <CombatContext.Provider value={{ abj_trigger, setAbjTrigger }}>
              <HealthPools />
            </CombatContext.Provider>
          </div>
        </div>
        <div className=" row d-flex py-3">
          <div className="col-6">
            <CombatContext.Provider value={{ setAbjTrigger, setSlotReset }}>
              <CastTimeCard
                key="An"
                spells={castDict["A"]}
                cast_time="Action"
              />
            </CombatContext.Provider>
            {/* <CastAbjContext.Provider value={setAbjTrigger}>
              <CastTimeCard
                key={"An"}
                spells={castDict["A"]}
                cast_time="Action"
              />
            </CastAbjContext.Provider> */}
          </div>
          <div className="col-6">
            <CombatContext.Provider value={{ setAbjTrigger, setSlotReset }}>
              <CastTimeCard
                key="BA"
                spells={castDict["BA"]}
                cast_time="Bonus Action"
              />
            </CombatContext.Provider>
            {/* <CastAbjContext.Provider value={setAbjTrigger}>
              <CastTimeCard
                key={"BA"}
                spells={castDict["BA"]}
                cast_time="Bonus Action"
              />
            </CastAbjContext.Provider> */}
            <CombatContext.Provider value={{ setAbjTrigger, setSlotReset }}>
              <CastTimeCard
                key="Rn"
                spells={castDict["Rn"]}
                cast_time="Reaction"
              />
            </CombatContext.Provider>
            {/* <CastAbjContext.Provider value={setAbjTrigger}>
              <CastTimeCard
                key={"Rn"}
                spells={castDict["Rn"]}
                cast_time="Reaction"
              />
            </CastAbjContext.Provider> */}
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
