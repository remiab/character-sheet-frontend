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
