import React, { useState } from "react";
import * as const_list from "../../../App.js";
import axios from "axios";
import SpellSlots from "./SpellSlots.js";

export default function Expendables() {
  const [ready, setReady] = useState(false);
  const [has_spell_slots, setHasSpellSlots] = useState(false);
  const [spell_slots, setSpellSlots] = useState(null);
  const character = const_list.character_name;

  function processExpendables(response) {
    let data = response.data;

    try {
      setSpellSlots(data.Spell_Slots);
      delete data["Spell_Slots"];
      //   console.log(spell_slots);
      setHasSpellSlots(true);
    } catch {
      //pass
    }

    setReady(true);
  }

  if (ready) {
    // console.log(spell_slots);
    return (
      <div className={has_spell_slots ? "col-auto" : "d-none"}>
        <SpellSlots levels={spell_slots} />
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
