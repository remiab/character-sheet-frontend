import React from "react";
import "./ExpendableSlot.css";
import axios from "axios";

export default function ExpendableSlot(props) {
  const expendableStatusAPIUrl = `http://127.0.0.1:5000/expendables/${props.id}/update`;

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

  if (props.expended === 1) {
    return (
      <div className="ExpendableSlot col-auto gx-2">
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
      <div className="ExpendableSlot col-auto gx-2">
        <input
          type="checkbox"
          id={props.id}
          className="expended expendable-slot"
          onChange={handleExpendedUpdate}
        ></input>
      </div>
    );
  }
}
