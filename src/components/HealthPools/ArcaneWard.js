import React from "react";
// import axios from "axios";
// import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";

export default function ArcaneWard(props) {
  // const character = constList.character_name;
  //   const [aw, setAW] = useState({ ready: props.ready });

  //   function handleResponse(response) {
  //     setAW({
  //       ready: true,
  //       current_aw: response.data.current_well,
  //       max_aw: response.data.max_points,
  //     });
  //     props.recordCurrent("ward", response.data.current_well);
  //     props.recordMax("ward", response.data.max_points);
  //   }

  return (
    <div>
      <div className="hp-label">ARCANE</div>
      <div className="CurrentHP col-12 px-0">
        {props.current} / {props.max}
      </div>
      <div className="hp-label">WARD</div>
    </div>
  );
}
