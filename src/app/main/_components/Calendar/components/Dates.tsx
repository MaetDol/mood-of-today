import { getDates } from "@/shared/utils/getDates";

interface Props {
  year: number;
  month: number;
  colors: Record<string, Record<string, string[]>>;
}

export function Dates({ month, year, colors }: Props) {
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
          {date}
          <div className="rounded-[2px] overflow-hidden relative w-4 h-4">
            <div
              className={`absolute rounded-full opacity-80 w-[18px] h-[18px]
                left-[-8px] top-[-8px]
                ${getColor(colors, m, date, 0)}
              `}
            />
            <div
              className={`absolute rounded-full opacity-80 w-[18px] h-[18px]
                left-[6px] top-[-6px]
                ${getColor(colors, m, date, 1)}
              `}
            />
            <div
              className={`absolute rounded-full opacity-80 w-[18px] h-[18px]
                left-[-10px] top-[6px]
                ${getColor(colors, m, date, 2)}
              `}
            />
            <div
              className={`absolute rounded-full opacity-80 w-[18px] h-[18px]
                left-[6px] top-[6px]
                ${getColor(colors, m, date, 3)}
              `}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function getColor(
  colorSet: Props["colors"],
  month: number,
  date: number,
  idx: number
) {
  return colorSet[month]?.[date]?.[idx] ?? "bg-slate-100";
}
