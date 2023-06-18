import React, { useState, useContext } from "react";
import CombatStub from "./CombatStub";
import { CombatContext } from "../../Contexts/CastLevelSpellContext";
// import LevelsDisplayDict from "../../LevelsDisplayDict";
import { levelAbbr } from "../functions";
import * as const_list from "../../App.js";
import axios from "axios";

export default function CastTimeCard(props) {
  const character = const_list.character_name;
  const { slot_ready } = useContext(CombatContext);
  const { setSlotReady } = useContext(CombatContext);
  const spellSlotAPIURl = `http://127.0.0.1:5000/${character}/spell_slots/`;
  const [slot_status, setSlotStatus] = useState({});
  const [ready, setReady] = useState(false);
  let time = props.cast_time;
  let max_level = 5;
  let levels_arr = [];

  for (let i = 1; i <= max_level; i++) {
    levels_arr.push(levelAbbr(i).slice(0, 3));
  }

  let levels = `${levels_arr.toString()}`;

  function processAvailableSlots(response) {
    setSlotStatus(response.data);
    setReady(true);
  }

  if (ready) {
    return (
      <div className="CastTimeCard">
        <h4 className="card-title cast-time-group">{time}</h4>
        <div>
          {Object.entries(props.spells).map((spell_name, idx) => {
            return (
              <div>
                <CombatStub
                  key={`${time}-${idx}`}
                  spells={spell_name}
                  type="spell"
                  slot_status={slot_status}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    axios
      .get(`${spellSlotAPIURl}/${levels}`)
      .then(processAvailableSlots)
      .catch((err) => console.log(err));
  }
}
