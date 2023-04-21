import React, { useState } from "react";
import axios from "axios";
import LevelCard from "./LevelCard";

export default function SpellList() {
  const [ready, setReady] = useState(false);
  const [spell_levels, setSpellLevels] = useState([]);

  function handleResponse(response) {
    setReady(true);
    let levels = [];
    for (let i = 0; i < response.data.length; i++) {
      if (levels.includes(response.data[i].level)) {
        //pass
      } else {
        levels = levels.concat(response.data[i].level);
      }
    }
    let levels_dict = {};
    for (let i = 0; i < levels.length; i++) {
      levels_dict[i] = {};
    }
    for (let e = 0; e < response.data.length; e++) {
      if (levels.includes(response.data[e].level)) {
        levels_dict[response.data[e].level][response.data[e].spell_name] = [
          response.data[e],
        ];
      } else {
        //pass
      }
    }
    setSpellLevels(levels_dict);
  }

  if (ready) {
    return (
      <div className="wrapper spell-book-wrapper justify-content-center flex-grow">
        <div className="title-prepared-spells-container">
          <h2 className="SpellBookTitle">Spell Book</h2>
        </div>
        <div>
          {Object.entries(spell_levels).map(([spell_levels, level]) => {
            return (
              <div key={spell_levels}>
                <LevelCard props={level} level={spell_levels} />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    let apiUrl = "/spell_list";
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((err) => console.log(err));
  }
}
