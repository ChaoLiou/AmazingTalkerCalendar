/**
 * get the first date of the week, the `first` here means Sunday
 * @param {Date} [date] to determine which week, default is `new Date()`
 */
export const getFirstDateOfTheWeek = (date = new Date()) => {
  const _date = new Date(date.getTime());
  const weekday = _date.getDay();
  if (weekday) {
    // current weekday is not Sunday
    // setDate back to Sunday of the week
    _date.setDate(_date.getDate() - weekday);
  }
  return _date;
};

/**
 * compare two dates only on year, month & day
 * @param {*} date1 the date to compare
 * @param {*} date2 the date to compare
 */
export const isSameDate = (date1, date2) => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};
