import React, { useContext, useState } from "react";
import ExpendableSlot from "./ExpendableSlot";
import "./SpellSlotRow.css";
import axios from "axios";
import { CombatContext } from "../../../Contexts/CastLevelSpellContext";

export default function SpellSlotRow(props) {
  const { slot_reset } = useContext(CombatContext);
  const { setSlotReset } = useContext(CombatContext);
  const { slot_available } = useContext(CombatContext);
  const { setSlotAvailable } = useContext(CombatContext);

  const [slots, setSlots] = useState({});
  const expendedAPIUrl = "http://127.0.0.1:5000/expendables/";

  let slots_dict = {};
  let id_arr = [];

  function updateBool() {
    setSlotAvailable(false);
    setSlotReset(false);
  }

  function processExpendedStatus(response) {
    for (let i = 0; i < response.data.length; i++) {
      slots_dict[response.data[i].expend_id] = response.data[i].expended;
    }
    setSlots(slots_dict);
    setSlotAvailable(true);
  }

  for (let i = 0; i < props.slots.length; i++) {
    id_arr.push(props.slots[i].expend_id);
  }
  let expend_ids = id_arr.toString();

  if (slot_reset && slot_available) {
    return (
      <div className="SpellSlotRow row">
        <div className="col-6 level-disp d-flex justify-content-start">
          {props.level.slice(0, 10)}
        </div>
        <div className="col-6 spell-slots-display d-flex justify-content-start">
          <div className="row">
            {id_arr.map((id) => {
              return (
                <ExpendableSlot
                  key={`${id}-expendable-slot`}
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
