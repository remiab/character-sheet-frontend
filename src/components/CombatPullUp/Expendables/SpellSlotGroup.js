import React from "react";
import SpellSlotRow from "./SpellSlotRow";

export default function SpellSlotGroup(props) {
  let group = props.group;
  return (
    <div className="SpellSlotGroup">
      {Object.entries(group).map(([slot_group, slots]) => {
        return (
          <div key={slot_group} className="px-2">
            <SpellSlotRow slots={slots} level={slot_group} />
          </div>
        );
      })}
    </div>
  );
}
