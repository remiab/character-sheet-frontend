import React, { useContext } from "react";
import LevelsDisplayDict from "../../LevelsDisplayDict";
import { CastAbjContext } from "../../Contexts/CastAbjContext";

export default function CastLevelBtn(props) {
  const setAbjTrigger = useContext(CastAbjContext);

  function checkIfAbj(event) {
    event.preventDefault();
    if (props.school === "abjuration") {
      setAbjTrigger(props.level * 2);
      console.log("abj found");
    } else {
      //pass
    }
  }

  function levelAbbr(level) {
    if (level === 0) {
      return level;
    } else {
      return LevelsDisplayDict(level).slice(0, 3);
    }
  }

  return (
    <button
      className="ClassLevelBtn level-btn standard-sm-btn cast-btn btn col-1 mx-1"
      onClick={checkIfAbj}
    >
      {levelAbbr(props.level)}
    </button>
  );
}
