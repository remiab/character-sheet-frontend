import React, { useState, useContext } from "react";
import DamangeInput from "./DamageInputGroup";
import CurrentHP from "./CurrentHP";
import TempHP from "./TempHP";
import ArcaneWard from "./ArcaneWard";
import { CombatContext } from "../../Contexts/CastLevelSpellContext";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";
import { stampTime } from "../functions";
import axios from "axios";

export default function HealthPools() {
  const character = constList.character_name;
  const { slot_reset } = useContext(CombatContext);

  const HealthPools = {};
  const { healthPools } = useContext(CombatContext);
  const { setHealthPools } = useContext(CombatContext);

  const MaxPools = {};
  const { maxPools } = useContext(CombatContext);
  const { setMaxPools } = useContext(CombatContext);

  const [ready, setReady] = useState(false);
  const [damage, setDamage] = useState({});

  var DamagePools = {};

  function manageHealing(key) {
    let current_hp = parseInt(healthPools[key]);
    let max = parseInt(maxPools[key]);
    let dmg = damage["damage"];
    if (dmg + current_hp <= max) {
      DamagePools[key] = dmg;
    } else {
      DamagePools[key] = max - current_hp;
    }
    sendDamageUpdate();
  }

  async function sendDamageUpdate() {
    let update = {};
    update["max"] = maxPools;
    update["current"] = DamagePools;
    update["dmg_occurred"] = damage["dmg_occurred"];
    update["event"] = damage["event"];

    let putApiUrl = `/${character}/hit_points/update`;
    await axios.put(putApiUrl, update).catch((err) => console.log(err));

    DamagePools = {};
    setDamage({});
    setReady(false);
  }

  function manageDamage() {
    let healthPoolKeys = Object.keys(healthPools).reverse();
    let damagePoolKeys = [];
    for (let i = 0; i < healthPoolKeys.length; i++) {
      if (healthPools[healthPoolKeys[i]] > 0) {
        let key_to_add = healthPoolKeys[i];
        damagePoolKeys.push(key_to_add);
      }
    }

    let dmg = [damage["damage"]];
    dmg = dmg * -1;

    for (let i = 0; i < damagePoolKeys.length; i++) {
      let new_total = parseInt(healthPools[damagePoolKeys[i]]);
      if (dmg <= new_total) {
        new_total = new_total - dmg;
        DamagePools[damagePoolKeys[i]] = dmg * -1;
        HealthPools[damagePoolKeys[i]] = new_total;
        dmg = 0;
      } else {
        dmg = dmg - new_total;
        DamagePools[damagePoolKeys[i]] = new_total * -1;
        new_total = 0;
        HealthPools[damagePoolKeys[i]] = new_total;
      }
    }
    sendDamageUpdate();
  }

  function allocateDamage() {
    if (damage["damage"] > 0) {
      manageHealing("hp");
    } else {
      manageDamage();
    }
  }

  function recordDamage(amount, type, trigger) {
    setDamage({
      damage: amount,
      type: type,
      event: trigger,
      dmg_occurred: stampTime(),
    });
  }

  if (Object.keys(damage).length > 0) {
    allocateDamage();
  }

  function handleResponse(response) {
    HealthPools["hp"] = response.data.current_hp[0].current_hp;
    HealthPools["temp_hp"] = response.data.temp_hp[0].current_thp;
    HealthPools["arcane_ward"] = response.data.arcane_ward[0].current_well;

    MaxPools["hp"] = response.data.current_hp[0].max_hp;
    MaxPools["arcane_ward"] = response.data.arcane_ward[0].max_points;

    setHealthPools(HealthPools);
    setMaxPools(MaxPools);

    setReady(true);
  }

  function callHpApi() {
    let apiUrl = `${character}/hit_points`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch((err) => console.log(err));
  }

  if (ready && slot_reset) {
    return (
      <div className="HealthPools row d-flex justify-content-between align-items-center">
        <div className="col-md-2">
          <DamangeInput recordDamage={recordDamage} />
        </div>
        <div className="col-md-3">
          <CurrentHP
            current={healthPools["hp"]}
            max={maxPools["hp"]}
            ready={ready}
          />
        </div>
        <div className="col-md-2">
          <TempHP current={healthPools["temp_hp"]} ready={ready} />
        </div>
        <div className="col-md-3">
          <ArcaneWard
            current={healthPools["arcane_ward"]}
            max={maxPools["arcane_ward"]}
            ready={ready}
          />
        </div>
      </div>
    );
  } else {
    callHpApi();
  }
}
