import React from "react";
import ExpendableSlot from "./ExpendableSlot";
import "./SpellSlotRow.css";

export default function SpellSlotRow(props) {
  const bool_dict = {
    0: false,
    1: true,
  };
  return (
    <div className="SpellSlotRow row">
      <div className="col-8 level-disp d-flex justify-content-start">
        {props.level.slice(0, 10)}
      </div>
      <div className="col-4 spell-slots-display d-flex justify-content-end">
        <div className="row">
          {props.slots.map((slot) => {
            return (
              <ExpendableSlot
                key={`expendable-${slot.expend_id}`}
                id={slot.expend_id}
                expended={bool_dict[slot.expended]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
