import { Dates } from "@/app/main/_components/Calendar/components/Dates";
import { useEmotions } from "@/app/main/_hooks/useEmotions";
import { useMoodData } from "@/app/main/_hooks/useMoodData";
import { useDragHandler } from "@/shared/hooks/useDragHandler";
import { useRef, useState } from "react";

const SLIDE_TRANSITION_DURATION = 300;

export function Calendar() {
  const [calendar, setCalendar] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
  });

  const [isResetingPosition, setIsResetingPosition] = useState(false);
  const lastPositionTimeoutIdRef = useRef<number>(0);

  const dateRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const { dragHandlers, isDragging } = useDragHandler({
    onDragging: (xMove) => {
      setIsResetingPosition(false);
      setTranslateX((prev) => prev + xMove);
    },
    onClick: () => {},
    onDragStop: () => {
      if (!dateRef.current) return;
      clearTimeout(lastPositionTimeoutIdRef.current);

      const { width } = dateRef.current.getBoundingClientRect();
      const threshold = width / 4;

      if (translateX > threshold) {
        setTranslateX(width + 16);
        lastPositionTimeoutIdRef.current = window.setTimeout(() => {
          setIsResetingPosition(true);
          prevMonth();
          setTranslateX(0);
        }, SLIDE_TRANSITION_DURATION);

        return;
      }

      if (translateX < -threshold) {
        setTranslateX(-width - 16);
        lastPositionTimeoutIdRef.current = window.setTimeout(() => {
          setIsResetingPosition(true);
          nextMonth();
          setTranslateX(0);
        }, SLIDE_TRANSITION_DURATION);

        return;
      }

      setTranslateX(0);
    },
  });

  const getRelativeCalendar = (
    { month, year }: { year: number; month: number },
    monthPosition: number
  ) => {
    const date = new Date(year, month - 1 + monthPosition);
    return {
      year: date.getFullYear(),
      month: date.getMonth() + 1,
    };
  };

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

  const prevCalendar = getRelativeCalendar(calendar, -1);
  const nextCalendar = getRelativeCalendar(calendar, +1);

  const { getEmotionById } = useEmotions();
  const { moods } = useMoodData();
  const colors = moods.reduce((acc, mood) => {
    const month = mood.createdAt.getMonth() + 1;
    const date = mood.createdAt.getDate();
    if (!acc[month]) {
      acc[month] = { [date]: [] };
    }
    if (!acc[month][date]) {
      acc[month][date] = [];
    }

    const emotion = getEmotionById(mood.moodId);
    if (!emotion) {
      console.error(`Emotion not found for mood: ${mood}`);
      return acc;
    }

    acc[month][date].push(emotion.color);
    return acc;
  }, {} as Record<string, Record<string, string[]>>);

  return (
    <div className="text-slate-700 overflow-hidden p-4">
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
        className={`flex gap-2 relative ${
          isResetingPosition || isDragging
            ? ""
            : "transition-transform duration-300"
        }`}
        {...dragHandlers}
        style={{
          transform: `translateX(${translateX}px)`,
        }}
      >
        <div
          className="absolute right-[calc(100%_+_16px)]"
          key={`${prevCalendar.year}_${prevCalendar.month}`}
        >
          <Dates
            month={prevCalendar.month}
            year={prevCalendar.year}
            colors={colors}
          />
        </div>
        <div ref={dateRef} key={`${calendar.year}_${calendar.month}`}>
          <Dates month={calendar.month} year={calendar.year} colors={colors} />
        </div>
        <div
          className="absolute left-[calc(100%_+_16px)]"
          key={`${nextCalendar.year}_${nextCalendar.month}`}
        >
          <Dates
            month={nextCalendar.month}
            year={nextCalendar.year}
            colors={colors}
          />
        </div>
      </div>
    </div>
  );
}
