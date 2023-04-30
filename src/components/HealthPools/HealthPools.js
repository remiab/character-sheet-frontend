import React from "react";
import DamangeInput from "./DamageInputGroup";
import CurrentHP from "./CurrentHP";
import TempHP from "./TempHP";
import ArcaneWard from "./ArcaneWard";

export default function HealthPools() {
  const HealthPools = {};
  function allocateHealthPools(pool, amount) {
    HealthPools[pool] = amount;
  }

  return (
    <div className="HealthPools row d-flex justify-content-between align-items-center">
      <div className="col-md-2">
        <DamangeInput />
      </div>
      <div className="col-md-3">
        <CurrentHP recordCurrent={allocateHealthPools} />
      </div>
      <div className="col-md-2">
        <TempHP recordCurrent={allocateHealthPools} />
      </div>
      <div className="col-md-3">
        <ArcaneWard />
      </div>
    </div>
  );
}
