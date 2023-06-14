import React, { useState } from "react";
import SpellSlotGroup from "./SpellSlotGroup";

export default function SpellSlots(props) {
  const [higher_level, setHigherLevel] = useState(false);
  console.log(Object.keys(props.levels));
  let first_group = {};
  let second_group = {};
  if (Object.keys(props.levels).length > 5) {
    let i = 0;
    for (const [key, value] of Object.entries(props.levels)) {
      if (i <= Math.ceil(Object.keys(props.levels).length / 2)) {
        first_group[key] = value;
        i += 1;
      } else {
        second_group[key] = value;
        i += 1;
      }
    }
    setHigherLevel(true);
  }
  if (higher_level) {
    return (
      <div className="SpellSlots row">
        <div className="col-6">
          <SpellSlotGroup group={first_group} />
        </div>
        <div className="col-6">
          <SpellSlotGroup group={second_group} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="SpellSlots row">
        <div className="col-12">
          <SpellSlotGroup group={props.levels} />
        </div>
      </div>
    );
  }
}
