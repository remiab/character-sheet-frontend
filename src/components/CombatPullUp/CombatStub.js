import React from "react";
import "./CombatPullUp.css";
import CastLevelBtn from "./CastLevelBtn";
import { levelAbbr } from "../functions";

export default function CombatStub(props) {
  let max_level = 5;
  let type = props.type; // will want this when have actions like unsettling presence etc
  let spell_dict = props.spells[1];

  if ((type = "spell")) {
    if (spell_dict["level"] !== 0) {
      //
      function range(level, max_level) {
        let rtn_range = [];
        for (let i = level; i <= max_level; i++) {
          rtn_range.push(i);
        }
        return rtn_range;
      }

      function availableUpcastSlots(level) {
        let levels = range(level, max_level);
        return levels;
      }

      let slots = availableUpcastSlots(spell_dict["level"]);

      return (
        <div className="CombatStub">
          <div className="row py-1">
            <div className="col-5 action-name">{props.spells[0]}</div>
            <div className="col-7"></div>
          </div>
          <div className="cast-levels row py-1 d-flex justify-content-end">
            {slots.map((slot) => {
              return (
                <CastLevelBtn
                  key={`${props.spells[0]}_${slot}`}
                  level={slot}
                  school={props.spells[1].school}
                  available={props.slot_status[levelAbbr(slot).slice(0, 3)]}
                  spell={props.spells[0]}
                />
              );
            })}
          </div>
        </div>
      );
    } else {
      return (
        <div className="CombatStub">
          <div className="row py-1">
            <div className="col-5 action-name">{props.spells[0]}</div>
            <button className="btn standard-sm-btn cast-btn col-1">CAST</button>
          </div>
        </div>
      );
    }
  }
}
