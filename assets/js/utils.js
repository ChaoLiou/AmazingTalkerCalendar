/**
 * get the first iso date of the week, the `first` here means Sunday
 * [NOTICED] the return is ISO Date String
 * @param {String} [isoDate] to determine which week, default is `new Date()`
 */
export const getFirstDateOfTheWeek = (isoDate = undefined) => {
  const dateObj = isoDate ? new Date(isoDate) : getDateObj();
  const weekday = dateObj.getDay();
  if (weekday) {
    // current weekday is not Sunday
    // setDate back to Sunday of the week
    dateObj.setDate(dateObj.getDate() - weekday);
  }
  return dateObj.toISOString();
};

/**
 * compare two dates only on year, month & day
 * @param {String} isoDate1 the date to compare
 * @param {String} isoDate2 the date to compare
 */
export const isSameDate = (isoDate1, isoDate2) => {
  const date1Obj = new Date(isoDate1);
  const date2Obj = new Date(isoDate2);

  date1Obj.setHours(date1Obj.getHours() + timezoneOffset);
  date2Obj.setHours(date2Obj.getHours() + timezoneOffset);

  return (
    date1Obj.getFullYear() === date2Obj.getFullYear() &&
    date1Obj.getMonth() === date2Obj.getMonth() &&
    date1Obj.getDate() === date2Obj.getDate()
  );
};

/**
 * get all iso dates in every increment within specific range
 * [NOTICED] the return is ISO Date String
 * @param {String} fromIsoDate range is started form this iso date
 * @param {String} toIsoDate range is ended to this iso date
 * @param {Number} incrementUnit increment unit, please referenced [DateType]
 * @param {Number} increment increment amount
 * @param {Boolean} includingEndDate whether include toIsoDate
 */
export const getDatesWithinRange = (
  fromIsoDate,
  toIsoDate,
  incrementUnit,
  increment,
  includingEndDate = false
) => {
  let fromDateObj = new Date(fromIsoDate);
  const toDateObj = new Date(toIsoDate);

  if (fromDateObj.getTime() > toDateObj.getTime()) {
    // fromDate should be earlier than or equal to toDate
    return [];
  }

  const result = [];
  while (fromDateObj.getTime() < toDateObj.getTime()) {
    result.push(fromDateObj.toISOString());

    switch (incrementUnit) {
      case DateTimeUnit.Minute:
        const isoDateAddedMinutes = addDateMinutes(
          fromDateObj.toISOString(),
          increment
        );
        fromDateObj = new Date(isoDateAddedMinutes);
        break;
      case DateTimeUnit.Date:
        const isoDateAddedDates = addDates(
          fromDateObj.toISOString(),
          increment
        );
        fromDateObj = new Date(isoDateAddedDates);
        break;
    }
  }
  if (includingEndDate) {
    result.push(toDateObj.toISOString());
  }
  return result;
};

/**
 * get all iso dates in every half hour between two dates
 * [NOTICED] the return is ISO Date String
 * @param {String} fromIsoDate range is started form this iso date
 * @param {String} toIsoDate range is ended to this iso date
 */
export const getDatesInEveryHalfHourBetweenTwoDates = (
  fromIsoDate,
  toIsoDate
) => {
  const halfhourEqualsTo30Minutes = 30;
  return getDatesWithinRange(
    fromIsoDate,
    toIsoDate,
    DateTimeUnit.Minute,
    halfhourEqualsTo30Minutes
  );
};

/**
 * get all iso dates within the week based on the fromIsoDate
 * [NOTICED] the return is ISO Date String
 * @param {String} isoDate range is started form this iso date
 */
export const getDatesWithinTheWeek = (isoDate) => {
  const fromIsoDate = getFirstDateOfTheWeek(isoDate);
  const fromDateObj = new Date(fromIsoDate);
  const toDateObj = new Date(fromDateObj.getTime());
  toDateObj.setDate(fromDateObj.getDate() + 6);
  const eachDay = 1;
  const includingEndDate = true;
  return getDatesWithinRange(
    fromIsoDate,
    toDateObj.toISOString(),
    DateTimeUnit.Date,
    eachDay,
    includingEndDate
  );
};

/**
 * parse the `HH:mm` out from datetime string
 * @param {String} isoDate
 */
export const parseDateTime = (isoDate) => {
  const dateObj = new Date(isoDate);
  const [, datetime] = /T(\d{2}:\d{2}):/.exec(dateObj.toISOString());
  return datetime;
};

/**
 * format date to a `YYYY/MM/DD` date string
 * @param {String} isoDate
 */
export const formatDateString = (isoDate) => {
  const dateObj = new Date(isoDate);
  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const formattedMonth = padLeft(month, 2, "0");
  const dateDay = dateObj.getDate();
  const formattedDateDay = padLeft(dateDay, 2, "0");
  return `${year}/${formattedMonth}/${formattedDateDay}`;
};

/**
 * get the new value string padded left specific char to let length of value match the length
 * @param {String|Number} value value
 * @param {Number} length the new value string of length
 * @param {String} char the character padded left repeatedly
 */
export const padLeft = (value, length, char) => {
  const valueForcedToString = value.toString();
  const padLeftPrefixes = Array.from(
    { length: length - valueForcedToString.length },
    () => char
  );
  return padLeftPrefixes.join("") + valueForcedToString;
};

/**
 * get date obj, only year, month & date day.
 */
export const getDateObj = (isoDate = undefined) => {
  const dateObj = isoDate ? new Date(isoDate) : new Date();
  dateObj.setHours(0 - timezoneOffset);
  dateObj.setMinutes(0);
  dateObj.setSeconds(0);
  dateObj.setMilliseconds(0);
  return dateObj;
};

/**
 * add dates to the iso date passed in
 * @param {String} isoDate iso date
 * @param {Number} dateAmount date amount
 */
export const addDates = (isoDate, dateAmount) => {
  return addDateUnit(isoDate, dateAmount, DateTimeUnit.Date);
};

/**
 * add hours to the iso date passed in
 * @param {String} isoDate iso date
 * @param {Number} hourAmount hour amount
 */
export const addDateHours = (isoDate, hourAmount) => {
  return addDateUnit(isoDate, hourAmount, DateTimeUnit.Hour);
};

/**
 * add minutes to the iso date passed in
 * @param {String} isoDate iso date
 * @param {Number} minuteAmount minute amount
 */
export const addDateMinutes = (isoDate, minuteAmount) => {
  return addDateUnit(isoDate, minuteAmount, DateTimeUnit.Minute);
};

/**
 * add amount of increment unit to the iso date passed in
 * @param {String} isoDate iso date
 * @param {Number} increment increment amount
 * @param {Number} incrementUnit increment unit
 */
export const addDateUnit = (isoDate, increment, incrementUnit) => {
  const dateObj = new Date(isoDate);
  switch (incrementUnit) {
    case DateTimeUnit.Date:
      const dateAmount = dateObj.getDate();
      dateObj.setDate(dateAmount + increment);
      break;
    case DateTimeUnit.Hour:
      const hourAmount = dateObj.getHours();
      dateObj.setHours(hourAmount + increment);
      break;
    case DateTimeUnit.Minute:
      const minuteAmount = dateObj.getMinutes();
      dateObj.setMinutes(minuteAmount + increment);
      break;
  }
  return dateObj.toISOString();
};

const timezoneOffset = new Date().getTimezoneOffset() / 60;

const DateTimeUnit = {
  Date: 0,
  Hour: 1,
  Minute: 2,
};
