import React from "react";
import CombatSpellStub from "./CombatSpellStub";

export default function CastTimeCard(props) {
  let times_full = {
    A: "Action",
    BA: "Bonus Action",
    Rn: "Reaction",
  };
  let time = times_full[props.grouped_spells[0]];
  console.log(props.grouped_spells[0]);
  console.log(props.grouped_spells[1]);
  return (
    <div className="CastTimeCard">
      <h4 className="card-title cast-time-group">{time}</h4>
      <div>
        {Object.entries(props.grouped_spells[1]).map((spell_name) => {
          return (
            <div key={spell_name}>
              <CombatSpellStub spells={spell_name} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
