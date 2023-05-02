import React from "react";

export default function CurrentHP(props) {
  return (
    <div>
      <div className="hp-label">CURRENT</div>
      <div className="CurrentHP col-12 px-0">
        {props.current} / {props.max}
      </div>
      <div className="hp-label">HIT POINTS</div>
    </div>
  );
}
