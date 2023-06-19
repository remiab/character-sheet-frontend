import React from "react";
import NonSpellExpendableGroup from "./NonSpellExpendableGoup";
import { assignGroups } from "../../functions";

export default function NonSpellExpendables(props) {
  let group_arr = assignGroups(props.expendables, {}, {});
  return (
    <div className="NonSpellExpendables row py-2">
      <div className="col-6">
        <NonSpellExpendableGroup key={`nse-group-1`} group={group_arr[0]} />
      </div>
      <div className="col-6">
        <NonSpellExpendableGroup key={`nse-group-2`} group={group_arr[1]} />
      </div>
    </div>
  );
}
