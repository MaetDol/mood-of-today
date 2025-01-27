import { getDates } from "@/shared/utils/getDates";
import { useState } from "react";

export function Calendar() {
  const [calendar, setCalendar] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const prevMonth = () => {
    const { year, month } = calendar;
    if (month === 1) {
      setCalendar({ year: year - 1, month: 12 });
      return;
    }

    setCalendar({ year, month: month - 1 });
  };

  const nextMonth = () => {
    const { year, month } = calendar;
    if (month === 12) {
      setCalendar({ year: year + 1, month: 1 });
      return;
    }

    setCalendar({ year, month: month + 1 });
  };
  return (
    <div className="text-slate-700">
      <div className="flex justify-between mb-2">
        <span className="font-bold">
          {calendar.month.toString().padStart(2, "0")} 월
        </span>
        <span>{calendar.year}</span>
      </div>

      <div className="mb-4 w-full grid grid-cols-[repeat(7,16px)] col-span-7 justify-items-center gap-x-6">
        <div className="text-red-600">일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div className="text-blue-600">토</div>
      </div>

      <div
        className="grid grid-cols-[repeat(7,16px)] 
      justify-items-center gap-x-6"
      >
        {getDates(calendar.year, calendar.month).map(({ month, date }) => (
          <div
            key={month.toString() + date}
            className={`mb-1 ${month !== calendar.month ? "opacity-20" : ""}`}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
}
