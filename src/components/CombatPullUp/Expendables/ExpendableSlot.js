import React, { useState } from "react";
import "./ExpendableSlot.css";
import axios from "axios";

export default function ExpendableSlot(props) {
  const [ext_expendable_trigger, setExtTrigger] = useState(false);
  const expendableStatusAPIUrl = `http://127.0.0.1:5000/expendables/${props.id}/update`;

  function externalTrigger() {
    setExtTrigger(false);
    handleExpendedUpdate();
  }

  function resetSlot() {
    props.updateBool();
  }

  function handleExpendedUpdate() {
    let update = {};
    if (props.expended === 1) {
      update["update_status"] = 0;
    } else {
      update["update_status"] = 1;
    }

    axios
      .post(expendableStatusAPIUrl, update)
      .then(resetSlot)
      .catch((err) => console.log(err));
  }

  if (ext_expendable_trigger === false) {
    if (props.expended === 1) {
      return (
        <div className="ExpendableSlot col-auto">
          <input
            type="checkbox"
            id={props.id}
            className="expended expendable-slot"
            onChange={handleExpendedUpdate}
            checked
          ></input>
        </div>
      );
    } else {
      return (
        <div className="ExpendableSlot col-auto">
          <input
            type="checkbox"
            id={props.id}
            className="expended expendable-slot"
            onChange={handleExpendedUpdate}
          ></input>
        </div>
      );
    }
  } else {
    externalTrigger();
  }
}
