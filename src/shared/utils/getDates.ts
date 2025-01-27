export function getDates(year: number, month: number) {
  const dates = [];
  const lastDate = new Date(year, month, 0);
  const firstDay = new Date(year, month - 1, 1).getDay();

  // 지난 달의 마지막 주 일요일부터 이번 달의 첫째 날 직전까지 가져온다
  // 28 29 30 31 1 2 3 처럼 보이게 하기 위해서!
  if (firstDay !== 0) {
    const startDateOfPrevMonth = new Date(year, month - 1, 1 - firstDay);
    const endDateOfPrevMonth = new Date(year, month - 1, 0);
    for (
      let i = startDateOfPrevMonth.getDate();
      i <= endDateOfPrevMonth.getDate();
      i++
    ) {
      const date = new Date(year, month - 2, i);
      dates.push({
        month: date.getMonth() + 1,
        date: date.getDate(),
      });
    }
  }

  for (let i = 1; i <= lastDate.getDate(); i++) {
    const date = new Date(year, month - 1, i);
    dates.push({
      month: date.getMonth() + 1,
      date: date.getDate(),
    });
  }

  // 다음 달의 첫째 날부터 토요일까지 가져온다
  const restDays = (6 - lastDate.getDay()) % 6;
  for (let i = 1; i <= restDays; i++) {
    const date = new Date(year, month, i);
    dates.push({
      month: date.getMonth() + 1,
      date: date.getDate(),
    });
  }

  return dates;
}
