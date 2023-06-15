import React, { useEffect, useState } from "react";
import ExpendableSlot from "./ExpendableSlot";
import "./SpellSlotRow.css";

export default function SpellSlotRow(props) {
  // const [ready, setReady] = useState(false);
  const [all_expended, setAllExpended] = useState(false);

  let bool_dict = { 0: false, 1: true };
  let bool_arr = [];
  let id_arr = [];

  function checkIfAllExpended() {
    let true_arr = bool_arr.filter(Boolean);

    if (bool_arr.toString() === true_arr.toString()) {
      setAllExpended(true);
    } else {
      setAllExpended(false);
    }
  }

  function updateBool(id, val) {
    console.log(val);
    let idx = id_arr.indexOf(id);
    // console.log(idx);
    bool_arr[idx] = val;
    console.log(1, bool_arr);
    checkIfAllExpended();
  }

  // let sum = 0;
  // for (let e of bool_arr) {
  //   sum += e;
  // }
  // if (id_arr.length === sum) {
  //   setAllExpended(true);
  // }

  useEffect(() => {
    for (let i = 0; i < props.slots.length; i++) {
      id_arr.push(props.slots[i].expend_id);
      bool_arr.push(bool_dict[props.slots[i].expended]);
    }
    checkIfAllExpended();
  });

  // console.log(props.level.slice(0, 3));
  // console.log(all_expended);

  // if (ready) {

  if (all_expended) {
    console.log(`${props.level.slice(0, 3)}: all expended`);
  } else {
    console.log(`${props.level.slice(0, 3)}: slot available`);
  }
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
                updateBool={updateBool}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
  // } else {
  //   checkIfAllExpended();
  // }
}
