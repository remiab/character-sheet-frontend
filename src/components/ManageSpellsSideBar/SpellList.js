import React, { useState } from "react";
import axios from "axios";
import LevelCard from "./LevelCard";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";

export default function SpellList() {
  const character_name = constList.character_name;
  const [ready, setReady] = useState(false);
  const [spell_levels, setSpellLevels] = useState([]);
  const [prepared_cantrips, setCountCantrips] = useState(0);
  const [prepared_spells, setCountSpells] = useState(0);

  const [cantrip_limit_met, setCantripLimitTrigger] = useState(false);
  const [spell_limit_met, setSpellLimitTrigger] = useState(false);

  let cantrip_limit = 4;
  let spell_limit = 14;

  function updatePrepared(cnt, lvl) {
    if (lvl === 0) {
      let to_add = prepared_cantrips;
      to_add += cnt;
      setCountCantrips(to_add);
      setCantripLimitTrigger(to_add >= cantrip_limit);
    } else {
      let to_add = prepared_spells;
      to_add += cnt;
      setCountSpells(to_add);
      setSpellLimitTrigger(to_add >= spell_limit);
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
    setCantripLimitTrigger(count_cantrips >= cantrip_limit);
    setSpellLimitTrigger(count_spells >= spell_limit);
  }

  if (ready) {
    return (
      <div className="wrapper spell-book-wrapper justify-content-center flex-grow">
        <div className="title-prepared-spells-container">
          <h2 className="SpellBookTitle">Spell Book</h2>
          <div className="prepared-spells">
            <div className="prepared-spells-title">Prepared spells:</div>
            <div>Cantrips: {prepared_cantrips}/4</div>
            <div>Levelled Spells: {prepared_spells}/14</div>
          </div>
        </div>
        <div>
          {Object.entries(spell_levels).map(([spell_levels, level]) => {
            return (
              <div key={spell_levels}>
                <LevelCard
                  level={spell_levels}
                  props={level}
                  toUpdatePrepared={updatePrepared}
                  limit_cantrip={cantrip_limit_met}
                  limit_spells={spell_limit_met}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    let apiUrl = `/${character_name}/spell_list`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((err) => console.log(err));
  }
}
