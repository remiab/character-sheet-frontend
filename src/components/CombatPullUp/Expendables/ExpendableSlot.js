import React, { useState } from "react";
import "./ExpendableSlot.css";
import axios from "axios";

export default function ExpendableSlot(props) {
  const [ready, setReady] = useState(false);
  const [expended, setExpended] = useState(null);
  const expendableStatusAPIUrl = `http://127.0.0.1:5000/expendables/${props.id}`;

  function displayExpendedStatus(response) {
    setExpended(response.data.expended);
    setReady(true);
  }

  function resetSlot(response) {
    props.updateBool(props.id, !expended);
    setReady(false);
  }

  function handleExpendedUpdate() {
    let update = { update_status: !expended };

    axios
      .post(expendableStatusAPIUrl, update)
      .then(resetSlot)
      .catch((err) => console.log(err));
  }
  if (ready) {
    if (expended) {
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
    axios
      .get(expendableStatusAPIUrl)
      .then(displayExpendedStatus)
      .catch((err) => console.log(err));
  }
}
