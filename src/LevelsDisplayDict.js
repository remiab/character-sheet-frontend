export default function LevelsDisplayDict(level) {
  const levels_dict = {};
  levels_dict[0] = "Cantrips";
  levels_dict[1] = "1st Level Spells";
  levels_dict[2] = "2nd Level Spells";
  levels_dict[3] = "3rd Level Spells";
  levels_dict[4] = "4th Level Spells";
  levels_dict[5] = "5th Level Spells";
  levels_dict[6] = "6th Level Spells";
  levels_dict[7] = "7th Level Spells";
  levels_dict[8] = "8th Level Spells";
  levels_dict[9] = "9th Level Spells";

  return levels_dict[level];
}
