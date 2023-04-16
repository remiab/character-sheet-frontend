import React, { useState } from "react";
import axios from "axios";

export default function SpellList() {
  const [ready, setReady] = useState(false);
  const [spell_list, setSpellList] = useState({});
  function handleResponse(response) {
    // var spell_names = [];
    // for (let i = 0; i < response.data.length; i++) {
    //   spell_names = spell_names.concat(response.data[i].spell_name);
    // }
    setSpellList(response.data);
    setReady(true);
  }

  if (ready) {
    return (
      <div>
        <h2>Ithen's spell list</h2>
        {spell_list.map((spell_list, spell_name) => {
          return (
            <div key={spell_name}>
              <h3>
                {spell_list.spell_name} {spell_list.level} {spell_list.prepared}
              </h3>
            </div>
          );
        })}
        {/* <ul>
          {spell_list.names.map((spell, index) => {
            return <li key={index}>{spell}</li>;
          })}
        </ul> */}
      </div>
    );
  } else {
    let apiUrl = "/spell_list";
    axios.get(apiUrl).then(handleResponse);
  }
}
