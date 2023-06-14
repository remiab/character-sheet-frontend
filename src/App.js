import React from "react";
import "./App.css";
import ManageSpellsSB from "./components/ManageSpellsSideBar/ManageSpellsSB";
import BaseStatBlock from "./components/BaseStatBlock/BaseStatBlock";
import CombatPullUp from "./components/CombatPullUp/CombatPullUp";

export const character_name = "ithen";
export const character_class = "wizard";
export const character_level = 10;

function App() {
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
          <div className="col-md-5 px-5"></div>
        </div>
        <div className="row">
          <CombatPullUp />
        </div>
      </div>
    </div>
  );
}

export default App;
