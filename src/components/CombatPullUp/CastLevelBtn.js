import React from "react";
import LevelsDisplayDict from "../../LevelsDisplayDict";

export default function CastLevelBtn(props) {
  function levelAbbr(level) {
    if (level === 0) {
      return level;
    } else {
      return LevelsDisplayDict(level).slice(0, 3);
    }
  }
  return (
    <button className="ClassLevelBtn level-btn standard-sm-btn cast-btn btn col-1 mx-1">
      {levelAbbr(props.level)}
    </button>
  );
}
