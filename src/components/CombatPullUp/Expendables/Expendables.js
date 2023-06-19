import React, { useState } from "react";
import * as const_list from "../../../App.js";
import axios from "axios";
import SpellSlots from "./SpellSlots.js";
import ExpendableGroup from "./ExpendableGroup.js";

export default function Expendables() {
  const [ready, setReady] = useState(false);
  const [has_spell_slots, setHasSpellSlots] = useState(false);
  const [spell_slots, setSpellSlots] = useState(null);
  const [non_spell_expendables, setNonSpellExpendables] = useState({});
  const character = const_list.character_name;

  function processExpendables(response) {
    let data = response.data;

    try {
      setSpellSlots(data.Spell_Slots);
      delete data["Spell_Slots"];
      setHasSpellSlots(true);
    } catch {
      //pass
    }
    // console.log(data);
    setNonSpellExpendables(data);
    setReady(true);
  }

  if (ready) {
    return (
      <div className="Expendables row">
        <div className={has_spell_slots ? "col-6" : "d-none"}>
          <SpellSlots levels={spell_slots} />
        </div>
        <div className={has_spell_slots ? "col-6" : "col-12"}>
          {Object.entries(non_spell_expendables).map((group) => {
            return (
              <div className="row">
                <ExpendableGroup group={group} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    let expendablesAPIUrl = `http://127.0.0.1:5000/${character}/expendables/combat`;
    axios
      .get(expendablesAPIUrl)
      .then(processExpendables)
      .catch((err) => console.log(err));
  }
}
