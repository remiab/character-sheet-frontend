export function formatDate(date) {
  let return_date = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  let return_time = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return `${return_date} ${return_time}`;
}
