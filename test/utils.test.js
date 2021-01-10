import {
  getFirstDateOfTheWeek,
  isSameDate,
  getDatesInEveryHalfHourBetweenTwoDates,
  getDatesWithinTheWeek,
  parseDateTime,
  formatDateString,
  getDateObj,
} from "./../assets/js/utils";

describe("getFirstDateOfTheWeek", () => {
  const testcases = [
    {
      name: "Today",
      value: undefined,
      expected: getDateObj(),
    },
    {
      name: "Saturday",
      value: "2021-01-09T00:00:00.000Z",
      expected: "2021-01-03T00:00:00.000Z",
    },
    {
      name: "Sunday",
      value: "2021-01-10T00:00:00.000Z",
      expected: "2021-01-10T00:00:00.000Z",
    },
  ];
  testcases.forEach(({ name, value, expected }) =>
    test(name, () => {
      if (value) {
        expect(getFirstDateOfTheWeek(value)).toBe(expected);
      } else {
        const actualIsoDateString = getFirstDateOfTheWeek();
        const actualDateObj = new Date(actualIsoDateString);
        const expectedIsoDateString = expected;
        const expectedDateObj = new Date(expectedIsoDateString);
        expect(actualDateObj.getFullYear()).toBe(expectedDateObj.getFullYear());
        expect(actualDateObj.getMonth()).toBe(expectedDateObj.getMonth());
        expect(actualDateObj.getDate()).toBe(expectedDateObj.getDate());
        expect(actualDateObj.getHours()).toBe(expectedDateObj.getHours());
        expect(actualDateObj.getMinutes()).toBe(expectedDateObj.getMinutes());
      }
    })
  );
});

describe("isSameDate", () => {
  const testcases = [
    {
      name: "Different Date",
      value: {
        date1: "2021-01-09T00:00:00.000Z",
        date2: "2021-01-03T00:00:00.000Z",
      },
      expected: false,
    },
    {
      name: "Same Date",
      value: {
        date1: "2021-01-10T00:00:00.000Z",
        date2: "2021-01-10T00:00:00.000Z",
      },
      expected: true,
    },
  ];
  testcases.forEach(({ name, value, expected }) => {
    test(name, () =>
      expect(isSameDate(value.date1, value.date2)).toBe(expected)
    );
  });
});

describe("getDatesInEveryHalfHourBetweenTwoDates", () => {
  const testcases = [
    {
      name: "Basic",
      value: {
        fromDate: "2021-01-09T10:00:00.000Z",
        toDate: "2021-01-09T11:30:00.000Z",
      },
      expected: [
        "2021-01-09T10:00:00.000Z",
        "2021-01-09T10:30:00.000Z",
        "2021-01-09T11:00:00.000Z",
      ],
    },
    {
      name: "fromDate > toDate",
      value: {
        fromDate: "2021-01-09T12:00:00.000Z",
        toDate: "2021-01-09T11:30:00.000Z",
      },
      expected: [],
    },
  ];
  testcases.forEach(({ name, value, expected }) => {
    test(name, () => {
      const result = getDatesInEveryHalfHourBetweenTwoDates(
        value.fromDate,
        value.toDate
      );
      expect(result.length).toBe(expected.length);
      if (expected.length > 0) {
        expect(
          result.every((item, index) => item === expected[index])
        ).toBeTruthy();
      }
    });
  });
});

describe("getDatesWithinTheWeek", () => {
  const testcases = [
    {
      name: "Basic",
      value: "2021-01-09T00:00:00.000Z",
      expected: [
        "2021-01-03T00:00:00.000Z",
        "2021-01-04T00:00:00.000Z",
        "2021-01-05T00:00:00.000Z",
        "2021-01-06T00:00:00.000Z",
        "2021-01-07T00:00:00.000Z",
        "2021-01-08T00:00:00.000Z",
        "2021-01-09T00:00:00.000Z",
      ],
    },
  ];
  testcases.forEach(({ name, value, expected }) => {
    test(name, () => {
      const result = getDatesWithinTheWeek(value);
      expect(result.length).toBe(expected.length);
      expect(
        result.every((item, index) => item === expected[index])
      ).toBeTruthy();
    });
  });
});

describe("parseDateTime", () => {
  const testcases = [
    {
      name: "Basic",
      value: "2021-01-09T10:30:00.000Z",
      expected: "10:30",
    },
  ];
  testcases.forEach(({ name, value, expected }) => {
    test(name, () => expect(parseDateTime(value)).toBe(expected));
  });
});

describe("formatDateString", () => {
  const testcases = [
    {
      name: "Basic",
      value: "2021-01-09T10:30:00.000Z",
      expected: "2021/01/09",
    },
  ];
  testcases.forEach(({ name, value, expected }) => {
    test(name, () => expect(formatDateString(value)).toBe(expected));
  });
});
