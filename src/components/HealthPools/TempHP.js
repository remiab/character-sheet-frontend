import React, { useState } from "react";
import axios from "axios";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";

export default function TempHP() {
  const character = constList.character_name;
  const [display, setDisplay] = useState(true);
  const [tHP, setTHP] = useState({
    ready: false,
  });

  function switchToInput(event) {
    event.preventDefault();
    setDisplay(false);
  }

  function formatDate(date) {
    let return_date = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}`;
    let return_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return `${return_date} ${return_time}`;
  }

  function addTempHP(event) {
    event.preventDefault();
    let to_add = document.querySelector("#tempHPSubmit");
    to_add = to_add.value;
    console.log(to_add);
    let occurred = new Date();
    occurred = formatDate(occurred);
    setDisplay(true);
  }

  function handleResponse(response) {
    setTHP({
      ready: true,
      temp_hp: response.data.current_thp,
    });
  }
  if (tHP.ready) {
    console.log(display);
    if (display) {
      return (
        <button className="TempHP" onClick={switchToInput}>
          {tHP.temp_hp}
        </button>
      );
    } else {
      return (
        <form onSubmit={addTempHP}>
          <input type="number" id="tempHPSubmit"></input>
        </form>
      );
    }
  } else {
    let getApiUrl = `${character}/hit_points/temp_hp`;
    axios
      .get(getApiUrl)
      .then(handleResponse)
      .catch((err) => console.log(err));
  }
}
