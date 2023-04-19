import React, { useState } from "react";
import SpellList from "./SpellList";
import "./ManageSpellsSB.css";

export default function ManageSpellsSB() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(true);
  const hideSidebar = () => setSidebar(false);

  return (
    <div className="ManageSpellsSB">
      <button
        className="btn standard-sm-btn"
        type="button"
        target="#"
        onClick={showSidebar}
      >
        MANAGE SPELLS
      </button>

      <div
        className={
          sidebar
            ? "manage-spells manage-spells-active"
            : "manage-spells manage-spells-hidden"
        }
      >
        <button
          type="button"
          className="btn-close close-spells"
          target="#"
          aria-label="Close"
          onClick={hideSidebar}
        ></button>
        <SpellList />
      </div>
    </div>
  );
}
