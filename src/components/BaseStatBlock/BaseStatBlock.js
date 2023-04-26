import React, { useState, useEffect } from "react";
import Stat from "./Stat";
import axios from "axios";
import * as constList from "C:/Users/slkbe/Documents/character-sheet-frontend/character-sheet/src/App";
import "./BaseStatBlock.css";

export default function BaseStatBlock() {
  const character_name = constList.character_name;
  const [ready, setReady] = useState(false);
  //   const [stat_block, setStatBlock] = useState([]);

  const [stat_block, setStatBlock] = useState({});

  function handleStatResponse(response) {
    setReady(true);
    // setStatBlock(response.data);
    setStatBlock({
      STR: response.data[0],
      DEX: response.data[1],
      CON: response.data[2],
      INT: response.data[3],
      WIS: response.data[4],
      CHA: response.data[5],
    });
  }

  useEffect(() => {
    let apiUrl = `/${character_name}/base_stats`;
    axios
      .get(apiUrl)
      .then(handleStatResponse)
      .catch((err) => console.log(err));
  }, [character_name]);

  if (ready) {
    return (
      <div className="StatBlock">
        <div className="col-sm-12">
          <div className="row">
            {Object.entries(stat_block).map(([stat, stat_dict]) => {
              return (
                <div className="col-2" key={stat}>
                  <Stat dict={stat_dict} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
  }
}
