import React from "react";
import StatDisplaySVG from "./StatDispSVG";

export default function Stat(props) {
  const stat = {};
  stat["attr"] = props.dict.STAT;
  stat["score"] = props.dict.SCORE;
  stat["mod"] = props.dict.MODIFIER;
  // console.log(stat["attr"]);

  let mod = stat["mod"];
  if (mod > 0) {
    mod = `+${mod}`;
  } else {
    //pass
  }

  return (
    <div className="Stat d-flex justify-content-center my-3">
      <div className="box-stats">{props.dict.STAT}</div>
      <div className="box-stats d-flex justify-content-center score-row align-items-center">
        <button className="btn col-sm-4 adv-dis-btn adv-btn">A</button>
        <button className="btn col-sm-4 roll-check">{props.dict.SCORE}</button>
        <button className="btn col-sm-4 adv-dis-btn dis-btn">D</button>
      </div>
      <div className="box-stats modifier-box text-align-center">{mod}</div>
      <StatDisplaySVG />
    </div>
  );
}
