import React from "react";

export default function Stat(props) {
  return (
    <div className="Stat">
      <div>{props.dict.STAT}</div>
      <div>{props.dict.SCORE}</div>
      <div>{props.dict.MODIFIER}</div>
    </div>
  );
}
