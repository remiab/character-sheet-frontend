import React, { useState } from "react";
import "./App.css";
import ManageSpellsSB from "./components/ManageSpellsSideBar/ManageSpellsSB";
import BaseStatBlock from "./components/BaseStatBlock/BaseStatBlock";
import HealthPools from "./components/HealthPools/HealthPools";
import CombatPullUp from "./components/CombatPullUp/CombatPullUp";
import { CastAbjContext } from "./Contexts/CastAbjContext";
export const character_name = "ithen";

function App() {
  const [abj_trigger, setAbjTrigger] = useState(null);
  // const [healthMaxs, setHealthMaxs] = useState({});
  // function retrieveHealthMaxs(maxs) {
  //   setHealthMaxs({
  //     hp: maxs["hp"],
  //     aw: maxs["arcane_ward"],
  //   });
  // }

  // function passAbjCast(level) {
  //   setAbjTrigger(level * 2);
  // }
  return (
    <div className="App">
      <div className="container">
        <div className="row d-flex pt-4">
          <div className="col-md-7 d-flex">
            <div className="BSB">
              <BaseStatBlock />
            </div>
          </div>
          <div className="col-md-5">
            <div className="ManageSpellsSB">
              <ManageSpellsSB />
            </div>
          </div>
        </div>
        <div className="row d-flex py-3">
          <div className="col-md-7 d-flex"></div>
          <div className="col-md-5 px-5">
            <CastAbjContext.Provider value={{ abj_trigger, setAbjTrigger }}>
              <HealthPools
                // retrieveMaxs={retrieveHealthMaxs}
                abjTrig={abj_trigger}
              />
            </CastAbjContext.Provider>
          </div>
        </div>
        <div className="row">
          <CastAbjContext.Provider value={setAbjTrigger}>
            <CombatPullUp />
          </CastAbjContext.Provider>
        </div>
      </div>
    </div>
  );
}

export default App;
