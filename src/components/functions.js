import LevelsDisplayDict from "../LevelsDisplayDict";

export function formatDate(date) {
  let return_date = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  let return_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${return_date} ${return_time}`;
}

export function stampTime() {
  let occurred = new Date();
  return formatDate(occurred);
}

export function levelAbbr(level) {
  if (level === 0) {
    return level;
  } else {
    return LevelsDisplayDict(level).slice(0, 9);
  }
}

export function assignGroups(subgroups, first_group, second_group) {
  let i = 0;
  for (const [key, value] of Object.entries(subgroups)) {
    if (i < Math.ceil(Object.keys(subgroups).length / 2)) {
      first_group[key] = value;
      i += 1;
    } else {
      second_group[key] = value;
      i += 1;
    }
  }
  return [first_group, second_group];
}
