import React from "react";
import SpellSlot from "./SpellSlot";

export default function SpellSlotRow(props) {
  console.log(props.slots);
  return (
    <div className="SpellSlotRow row">
      <div className="col-8">{props.level.slice(0, 10)}</div>
      <div className="col-4 d-flex">
        {props.slots.map((slot) => {
          return <SpellSlot id={slot.expend_id} expended={slot.expended} />;
        })}
      </div>
    </div>
  );
}
