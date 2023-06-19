import React from "react";
import SpellSlotGroup from "./SpellSlotGroup";
import { assignGroups } from "../../functions";

export default function SpellSlots(props) {
  let group_arr = assignGroups(props.levels, {}, {});

  return (
    <div className="SpellSlots">
      <div className="expendable-header py-2">Spell Slots</div>
      <div className="row">
        <div className="col-7">
          <SpellSlotGroup group={group_arr[0]} />
        </div>
        <div className="col-5">
          <SpellSlotGroup group={group_arr[1]} />
        </div>
      </div>
    </div>
  );
}
