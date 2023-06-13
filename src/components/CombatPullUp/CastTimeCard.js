import React from "react";
import CombatStub from "./CombatStub";

export default function CastTimeCard(props) {
  let time = props.cast_time;
  // console.log(props);
  return (
    <div className="CastTimeCard">
      <h4 className="card-title cast-time-group">{time}</h4>
      <div>
        {Object.entries(props.spells).map((spell_name, idx) => {
          return (
            <div>
              <CombatStub
                key={`${time}-${idx}`}
                spells={spell_name}
                type="spell"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
