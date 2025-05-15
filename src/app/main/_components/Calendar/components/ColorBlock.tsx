interface Props {
  month: number;
  date: number;
  colors: Record<string, Record<string, string[]>>;
}

export function ColorBlock({ month: m, date, colors }: Props) {
  return (
    <div className="rounded-[2px] overflow-hidden relative w-4 h-4 z-0">
      <div
        className={`absolute rounded-full opacity-80 w-[18px] h-[18px]
      left-[-8px] top-[-8px] z-4
      ${getColor(colors, m, date, 0)}
    `}
      />
      <div
        className={`absolute rounded-full opacity-80 w-[18px] h-[18px]
      left-[6px] top-[-6px] z-3
      ${getColor(colors, m, date, 1)}
    `}
      />
      <div
        className={`absolute rounded-full opacity-80 w-[18px] h-[18px]
      left-[-10px] top-[6px] z-2
      ${getColor(colors, m, date, 2)}
    `}
      />
      <div
        className={`absolute rounded-full opacity-80 w-[18px] h-[18px]
      left-[6px] top-[6px] z-1
      ${getColor(colors, m, date, 3)}
    `}
      />
    </div>
  );
}

function getColor(
  colorSet: Record<string, Record<string, string[]>>,
  month: number,
  date: number,
  idx: number
) {
  return colorSet[month]?.[date]?.[idx] ?? "bg-slate-100";
}
