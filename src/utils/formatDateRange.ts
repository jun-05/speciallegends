export const formatDateRange = (
  dateRange: string,
  language: string
): string => {
  const monthsInEnglish = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const monthsInKorean = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];

  const dates = dateRange.split('-');
  const startMonth = parseInt(dates[0]) - 1;
  const startDay = dates[1];
  const endMonth = parseInt(dates[2]) - 1;
  const endDay = dates[3];

  if (language === 'en') {
    return `${monthsInEnglish[startMonth]} ${startDay} - ${monthsInEnglish[endMonth]} ${endDay}`;
  } else if (language === 'ko') {
    return `${monthsInKorean[startMonth]} ${startDay}일 - ${monthsInKorean[endMonth]} ${endDay}일`;
  }
  return dateRange;
};
