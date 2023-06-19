import React from "react";
import ExpendableRow from "./ExpendableRow";

export default function NonSpellExpendableGroup(props) {
  return (
    <div className="NonSpellExpendableGroup">
      {Object.entries(props.group).map((category) => {
        return (
          <div>
            <ExpendableRow key={`nse-${category[0]}`} subgroup={category} />
          </div>
        );
      })}
    </div>
  );
}
