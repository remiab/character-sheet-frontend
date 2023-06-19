import React, { useState } from "react";
import ExpendableSlot from "./ExpendableSlot";
import axios from "axios";
import "./SpellSlotRow.css";

export default function ExpendableRow(props) {
  const [ready, setReady] = useState(false);

  const expendedAPIUrl = "http://127.0.0.1:5000/expendables/";
  const [slots, setSlots] = useState({});

  let slots_dict = {};
  let id_arr = [];

  function updateBool() {
    setReady(false);
  }

  function processExpendedStatus(response) {
    for (let i = 0; i < response.data.length; i++) {
      slots_dict[response.data[i].expend_id] = response.data[i].expended;
    }
    setSlots(slots_dict);
    setReady(true);
  }

  for (let i = 0; i < props.subgroup[1].length; i++) {
    id_arr.push(props.subgroup[1][i].expend_id);
  }
  let expend_ids = id_arr.toString();

  if (ready) {
    return (
      <div className="ExpendableRow row d-flex justify-content-between">
        <div className="col-auto gx-3 d-flex justify-content-start expendable-header">
          {props.subgroup[0]}
        </div>
        <div className="col-auto gx-3 d-flex justify-content-end">
          <div className="row">
            {id_arr.map((id) => {
              return (
                <ExpendableSlot
                  key={`nse-${id}`}
                  id={id}
                  expended={slots[`${id}`]}
                  updateBool={updateBool}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    axios
      .get(`${expendedAPIUrl}/${expend_ids}`)
      .then(processExpendedStatus)
      .catch((err) => console.log(err));
  }
}
