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
          className={`mb-1 ${m !== month ? "opacity-20" : ""}`}
        >
          {date}
        </div>
      ))}
    </div>
  );
}
