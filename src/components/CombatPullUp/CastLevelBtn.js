import React, { useContext } from "react";
// import LevelsDisplayDict from "../../LevelsDisplayDict";
// import { CastAbjContext } from "../../Contexts/CastAbjContext";
import { CombatContext } from "../../Contexts/CastLevelSpellContext";
import { levelAbbr } from "../functions";
import axios from "axios";

export default function CastLevelBtn(props) {
  const { setAbjTrigger } = useContext(CombatContext);
  const { setSlotReset } = useContext(CombatContext);
  // const { expended_dict } = useContext(CombatContext);

  const expendableStatusAPIUrl = `http://127.0.0.1:5000/expendables/${props.available}/update`;
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
      setAbjTrigger(props.level * 2);
    } else {
      //pass
    }
  }

  function attemptCast(event) {
    event.preventDefault();
    console.log(props.available);
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
