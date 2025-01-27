"use client";

import { SlideCircles } from "@/app/main/_components/SlideCircles";
import { useDragHandler } from "@/shared/hooks/useDragHandler";
import { getDates } from "@/shared/utils/getDates";
import { useEffect, useState } from "react";

const Emotions = [
  {
    color: "bg-sky-700",
    name: "우울",
    id: 1,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 2,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 3,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 4,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 5,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 6,
  },
];

export default function Page() {
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
    <main className="bg-white px-5 py-6 flex flex-col flex-1">
      <div className="flex-1 shrink-0 flex flex-col gap-3">
        <div className="flex items-center gap-4 shrink-0">
          <SlideCircles circles={Emotions} />
          <input
            className="px-3 py-2 rounded-full border border-slate-400
          w-[200px]
        placeholder:slate-400
        "
            placeholder="왜 그런 기분이 들었나요?"
          />
        </div>

        <ol className="ml-4 overflow-auto">
          <li className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-400" />산 아이스크림이
            녹아있었음
          </li>
        </ol>
      </div>

      <div
        className="mt-auto grid grid-cols-[repeat(7,16px)] 
      justify-center justify-items-center gap-x-6"
      >
        <div className="text-red-600 mb-4">일</div>
        <div>월</div>
        <div>화</div>
        <div>수</div>
        <div>목</div>
        <div>금</div>
        <div className="text-blue-600">토</div>

        {getDates(calendar.year, calendar.month).map(({ month, date }) => (
          <div
            key={month.toString() + date}
            className={`mb-1 ${month !== calendar.month ? "opacity-20" : ""}`}
          >
            {date}
          </div>
        ))}
      </div>
    </main>
  );
}
