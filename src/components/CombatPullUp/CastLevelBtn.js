import React, { useContext } from "react";
import LevelsDisplayDict from "../../LevelsDisplayDict";
// import { CastAbjContext } from "../../Contexts/CastAbjContext";
import { CombatContext } from "../../Contexts/CastLevelSpellContext";

export default function CastLevelBtn(props) {
  const { setAbjTrigger } = useContext(CombatContext);
  const { expended_dict } = useContext(CombatContext);

  function checkIfAbj(event) {
    event.preventDefault();
    if (props.school === "abjuration") {
      setAbjTrigger(props.level * 2);
    } else {
      //pass
    }
  }

  function levelAbbr(level) {
    if (level === 0) {
      return level;
    } else {
      return LevelsDisplayDict(level).slice(0, 9);
    }
  }
  // console.log(expended_dict);

  // console.log(levelAbbr(props.level), expended_dict[levelAbbr(props.level)]);

  return (
    <button
      className={
        expended_dict[levelAbbr(props.level)]
          ? "ClassLevelBtn level-btn standard-sm-btn cast-btn btn col-1 mx-1 disabled"
          : "ClassLevelBtn level-btn standard-sm-btn cast-btn btn col-1 mx-1"
      }
      onClick={checkIfAbj}
    >
      {levelAbbr(props.level).slice(0, 3)}
    </button>
  );
}
