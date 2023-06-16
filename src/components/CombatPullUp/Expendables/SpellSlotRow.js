import React, { useContext, useState } from "react";
import ExpendableSlot from "./ExpendableSlot";
import "./SpellSlotRow.css";
import axios from "axios";
import { CombatContext } from "../../../Contexts/CastLevelSpellContext";

export default function SpellSlotRow(props) {
  const [all_expended, setAllExpended] = useState(false);
  const { expended_dict } = useContext(CombatContext);
  // const { setExpDict } = useContext(CombatContext);
  // const { trigger_exp_dict } = useContext(CombatContext);
  const [ready, setReady] = useState(false);
  const [slots, setSlots] = useState({});
  const expendedAPIUrl = "http://127.0.0.1:5000/expendables/";

  let slots_dict = {};
  let id_arr = [];

  function updateBool() {
    setReady(false);
  }

  function processExpendedStatus(response) {
    for (let i = 0; i < response.data.length; i++) {
      slots_dict[response.data[i].expend_id] = response.data[i].expended;
    }
    let count = 0;
    for (let [key] of Object.entries(slots_dict)) {
      count += slots_dict[key];
    }
    // console.log(count === id_arr.length);
    // expended_dict[props.level.slice(0, 9)] = count === id_arr.length;
    // setExpDict(!trigger_exp_dict);
    setAllExpended(count === id_arr.length);
    setSlots(slots_dict);
    setReady(true);
  }

  for (let i = 0; i < props.slots.length; i++) {
    id_arr.push(props.slots[i].expend_id);
  }
  let expend_ids = id_arr.toString();

  if (ready) {
    expended_dict[props.level.slice(0, 9)] = all_expended;
    return (
      <div className="SpellSlotRow row">
        <div className="col-8 level-disp d-flex justify-content-start">
          {props.level.slice(0, 10)}
        </div>
        <div className="col-4 spell-slots-display d-flex justify-content-end">
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
