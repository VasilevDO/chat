export function dateToString(date) {
    //date in ms
    let dateStr = `${("0" + date.getHours()).slice(-2)}:${(
      "0" + date.getMinutes()
    ).slice(-2)} ${("0" + date.getDate()).slice(-2)}.${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}.${date.getFullYear()}`;
    return dateStr;
  }