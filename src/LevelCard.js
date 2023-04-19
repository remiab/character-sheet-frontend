import React from "react";
import SpellStub from "./spellStub";
import LevelsDisplayDict from "./LevelsDisplayDict";

export default function LevelCard(props) {
  let display_level = LevelsDisplayDict(props.level);

  return (
    <div className="LevelCard level-card card">
      <div className="card-title level-group">{display_level}</div>
      <div>
        {Object.entries(props.props).map(([spell_name, spell_stats]) => {
          return (
            <div key={spell_name}>
              <SpellStub
                spell_name={spell_stats[0].spell_name}
                level={spell_stats[0].level}
                status={spell_stats[0].prepared}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
