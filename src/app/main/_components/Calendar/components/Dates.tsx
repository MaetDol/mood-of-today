import { ColorBlock } from "@/app/main/_components/Calendar/components/ColorBlock";
import { getDates } from "@/shared/utils/getDates";

interface Props {
  year: number;
  month: number;
  colors: Record<string, Record<string, string[]>>;
  onClickDate?: (year: number, month: number, date: number) => void;
  focusedDate?: { year: number; month: number; date: number };
}

export function Dates({
  month,
  year,
  colors,
  focusedDate,
  onClickDate,
}: Props) {
  return (
    <div
      className="grid grid-cols-[repeat(7,16px)] 
justify-items-center gap-x-6"
    >
      {getDates(year, month).map(({ month: m, date }) => (
        <div
          key={m.toString() + date}
          className={`mb-1 flex flex-col items-center ${
            m !== month ? "opacity-20" : ""
          }`}
        >
          <button
            className="w-full relative"
            onClick={() => onClickDate?.(year, m, date)}
          >
            {isSameDate(year, m, date, focusedDate) && (
              <span
                className="absolute rounded-full w-2 h-2 bg-blue-400 
                top-[-2px] left-[-2px] z-10"
              />
            )}
            <span className="z-1 relative">{date}</span>
          </button>
          <ColorBlock colors={colors} month={m} date={date} />
        </div>
      ))}
    </div>
  );
}

function isSameDate(
  year: number,
  month: number,
  date: number,
  target?: { year: number; month: number; date: number }
) {
  return (
    target &&
    year === target.year &&
    month === target.month &&
    date === target.date
  );
}
