import { getDates } from "@/shared/utils/getDates";

interface Props {
  year: number;
  month: number;
}

export function Dates({ month, year }: Props) {
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
              className="absolute rounded-full opacity-80 w-[18px] h-[18px]
              left-[-8px] top-[-8px] bg-slate-100
            "
            />
            <div
              className="absolute rounded-full opacity-80 w-[18px] h-[18px]
              left-[6px] top-[-6px] bg-slate-100
            "
            />
            <div
              className="absolute rounded-full opacity-80 w-[18px] h-[18px]
              left-[-10px] top-[6px] bg-slate-100
            "
            />
            <div
              className="absolute rounded-full opacity-80 w-[18px] h-[18px]
              left-[6px] top-[6px] bg-slate-100
            "
            />
          </div>
        </div>
      ))}
    </div>
  );
}
