import React, { useContext } from "react";
import { CombatContext } from "../../Contexts/CastLevelSpellContext";
import { levelAbbr } from "../functions";
import axios from "axios";
import { stampTime } from "../functions";
import * as const_list from "../../App";

export default function CastLevelBtn(props) {
  const character = const_list.character_name;

  const { setSlotReset } = useContext(CombatContext);
  const { healthPools } = useContext(CombatContext);
  const { maxPools } = useContext(CombatContext);

  const expendableStatusAPIUrl = `http://127.0.0.1:5000/expendables/${props.available}/update`;
  const abjUpdateAPIUrl = `http://127.0.0.1:5000/${character}/hit_points/arcane_ward/update`;

  function resetSlot() {
    setSlotReset(false);
  }

  function postExpendedUpdate(update) {
    axios
      .post(expendableStatusAPIUrl, update)
      .then(resetSlot)
      .catch((err) => console.log(err));
  }

  function checkIfAbj() {
    if (props.school === "abjuration") {
      let update = {};
      let max = parseInt(maxPools["arcane_ward"]);
      let current = parseInt(healthPools["arcane_ward"]);
      let to_add = props.level * 2;

      if (current + to_add > max) {
        update["replen"] = max - current;
      } else {
        update["replen"] = to_add;
      }
      update["max"] = max;
      update["dmg_occurred"] = stampTime();
      update["event_tag"] = `${props.spell.toLowerCase()} cast`;
      axios
        .put(abjUpdateAPIUrl, update)
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    } else {
      //pass
    }
  }

  function attemptCast(event) {
    event.preventDefault();
    let slot = props.available;
    if (slot) {
      checkIfAbj();
      let update = {};
      update["update_status"] = 1;
      postExpendedUpdate(update);
    } else {
      //pass (do nothing if no slot available)
    }
  }

  return (
    <button
      className={
        props.available
          ? "ClassLevelBtn level-btn standard-sm-btn cast-btn btn col-1 mx-1"
          : "ClassLevelBtn level-btn standard-sm-btn cast-btn btn col-1 mx-1 disabled"
      }
      onClick={attemptCast}
    >
      {levelAbbr(props.level).slice(0, 3)}
    </button>
  );
}
