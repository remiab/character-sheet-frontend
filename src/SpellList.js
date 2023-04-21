import React, { useState } from "react";
import axios from "axios";
import LevelCard from "./LevelCard";

export default function SpellList() {
  const [ready, setReady] = useState(false);
  const [spell_levels, setSpellLevels] = useState([]);
  const [prepared_cantrips, setCountCantrips] = useState(0);
  const [prepared_spells, setCountSpells] = useState(0);

  function updatePrepared(cnt, lvl) {
    console.log(`click registered to ${cnt}`);
    console.log(lvl);
    if (lvl === 0) {
      let to_add = prepared_cantrips;
      to_add += cnt;
      setCountCantrips(to_add);
    } else {
      let to_add = prepared_spells;
      to_add += cnt;
      setCountSpells(to_add);
    }
  }

  function handleResponse(response) {
    setReady(true);
    let levels = [];
    let count_cantrips = 0;
    let count_spells = 0;
    for (let i = 0; i < response.data.length; i++) {
      if (levels.includes(response.data[i].level)) {
        //pass
      } else {
        levels = levels.concat(response.data[i].level);
      }
      if (response.data[i].prepared === "Y") {
        if (response.data[i].level === 0) {
          count_cantrips += 1;
        } else {
          count_spells += 1;
        }
      } else {
        //pass
      }
      setCountCantrips(count_cantrips);
      setCountSpells(count_spells);
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
    console.log(prepared_cantrips);
    console.log(prepared_spells);
    return (
      <div className="wrapper spell-book-wrapper justify-content-center flex-grow">
        <div className="title-prepared-spells-container">
          <h2 className="SpellBookTitle">Spell Book</h2>
          <p>Prepared spells </p>
        </div>
        <div>
          {Object.entries(spell_levels).map(([spell_levels, level]) => {
            return (
              <div key={spell_levels}>
                <LevelCard
                  props={level}
                  level={spell_levels}
                  toUpdatePrepared={updatePrepared}
                />
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
