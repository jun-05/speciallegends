class DateService {
  getPeriod(date: Date) {
    const prevSunday = new Date(date);
    prevSunday.setDate(
      prevSunday.getDate() - ((prevSunday.getDay() + 7) % 7) - 7
    );

    const thisSunday = new Date(date);
    thisSunday.setDate(thisSunday.getDate() - ((thisSunday.getDay() + 7) % 7));

    return {
      start: `${prevSunday.getMonth() + 1}${
        prevSunday.getDate() < 10 ? '0' : ''
      }${prevSunday.getDate()}`,
      end: `${thisSunday.getMonth() + 1}${
        thisSunday.getDate() < 10 ? '0' : ''
      }${thisSunday.getDate()}`,
    };
  }

  weeksToMs(weeks: number) {
    return weeks * 7 * 24 * 60 * 60 * 1000;
  }
}

module.exports = DateService;
