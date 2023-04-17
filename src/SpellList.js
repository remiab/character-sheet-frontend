import React, { useState } from "react";
import axios from "axios";
import SpellStub from "./spellStub";

export default function SpellList() {
  const [ready, setReady] = useState(false);
  const [spell_list, setSpellList] = useState({});
  const [spell_levels, setSpellLevels] = useState([]);

  function handleResponse(response) {
    setSpellList(response.data);
    setReady(true);
    var levels = [];
    for (let i = 0; i < response.data.length; i++) {
      if (levels.includes(response.data[i].level)) {
        //pass
      } else {
        levels = levels.concat(response.data[i].level);
      }
    }
    setSpellLevels(levels);
  }

  if (ready) {
    return (
      <div className="container">
        <div className="wrapper col-md-6 justify-content-center">
          <h2>Ithen's spell list</h2>
          {spell_list.map((spell_list, spell_name) => {
            return (
              <div key={spell_name}>
                <SpellStub
                  spell_name={spell_list.spell_name}
                  level={spell_list.level}
                  status={spell_list.prepared}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    let apiUrl = "/spell_list";
    axios.get(apiUrl).then(handleResponse);
  }
}
