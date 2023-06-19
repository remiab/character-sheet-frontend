import React from "react";
import SpellSlotGroup from "./SpellSlotGroup";

export default function SpellSlots(props) {
  let first_group = {};
  let second_group = {};

  function assignGroups() {
    let i = 0;
    for (const [key, value] of Object.entries(props.levels)) {
      if (i < Math.ceil(Object.keys(props.levels).length / 2)) {
        first_group[key] = value;
        i += 1;
      } else {
        second_group[key] = value;
        i += 1;
      }
    }
  }

  assignGroups();

  if (Object.keys(second_group).length > 0) {
    return (
      <div className="SpellSlots">
        <div className="expendable-header">Spell Slots</div>
        <div className="row">
          <div className="col-7">
            <SpellSlotGroup group={first_group} />
          </div>
          <div className="col-5">
            <SpellSlotGroup group={second_group} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="SpellSlots">
        <div className="expendable-header">Spell Slots</div>
        <div className="row">
          <div className="col-12">
            <SpellSlotGroup group={first_group} />
          </div>
        </div>
      </div>
    );
  }
}
