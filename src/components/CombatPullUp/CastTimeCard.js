import React from "react";
import CombatStub from "./CombatStub";

export default function CastTimeCard(props) {
  let times_full = {
    A: "Action",
    BA: "Bonus Action",
    Rn: "Reaction",
  };
  let time = times_full[props.grouped_spells[0]];

  return (
    <div className="CastTimeCard">
      <h4 className="card-title cast-time-group">{time}</h4>
      <div>
        {Object.entries(props.grouped_spells[1]).map((spell_name) => {
          return (
            <div key={spell_name}>
              <CombatStub spells={spell_name} type="spell" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
