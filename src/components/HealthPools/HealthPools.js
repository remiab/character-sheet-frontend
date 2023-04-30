import React, { useState } from "react";
import DamangeInput from "./DamageInputGroup";
import CurrentHP from "./CurrentHP";
import TempHP from "./TempHP";
import ArcaneWard from "./ArcaneWard";

export default function HealthPools() {
  const HealthPools = {};
  const [healthPools, setHealthPools] = useState({});
  const maxPools = {};
  const [ready, setReady] = useState(false);
  const [damage, setDamage] = useState({});

  function manageHealing(key) {
    console.log(Object.keys(healthPools));
    let new_total = healthPools[key];
    console.log(new_total);
    while (new_total <= maxPools[key] || damage["damage"] >= 0) {
      damage["damage"] -= 1;
      new_total += 1;
    }
    console.log(new_total);
  }

  function allocateDamage() {
    console.log(damage);
    if (damage["damage"] > 0) {
      console.log("tried to heal");
      manageHealing("current");
    }
  }

  function recordDamage(amount, type, trigger, date) {
    setDamage({
      damage: amount,
      type: type,
      event: trigger,
      dmg_occurred: date,
    });
  }

  function allocateHealthPools(pool, amount) {
    console.log(pool, amount);
    HealthPools[pool] = amount;
    setHealthPools(HealthPools);
    if (Object.keys(healthPools).length === 3) {
      setReady(true);
    } else {
      setReady(false);
    }
  }
  function recordMaxPools(pool, max) {
    maxPools[pool] = max;
  }

  if (Object.keys(damage).length > 0) {
    allocateDamage();
  }

  console.log(healthPools);

  return (
    <div className="HealthPools row d-flex justify-content-between align-items-center">
      <div className="col-md-2">
        <DamangeInput recordDamage={recordDamage} />
      </div>
      <div className="col-md-3">
        <CurrentHP
          recordCurrent={allocateHealthPools}
          recordMax={recordMaxPools}
          ready={ready}
        />
      </div>
      <div className="col-md-2">
        <TempHP recordCurrent={allocateHealthPools} ready={ready} />
      </div>
      <div className="col-md-3">
        <ArcaneWard
          recordCurrent={allocateHealthPools}
          recordMax={recordMaxPools}
          ready={ready}
        />
      </div>
    </div>
  );
}
