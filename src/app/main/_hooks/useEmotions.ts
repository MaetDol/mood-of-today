// 색깔 다시 정할 필요가 있음
const Emotions = [
  {
    color: "bg-emerald-500",
    name: "즐거움",
    id: 1,
  },
  {
    color: "bg-sky-700",
    name: "우울",
    id: 2,
  },
  {
    color: "bg-fuchsia-300",
    name: "행복",
    id: 3,
  },
  {
    color: "bg-red-500",
    name: "분노",
    id: 4,
  },
  {
    color: "bg-slate-500",
    name: "평온함",
    id: 5,
  },
  {
    color: "bg-orange-400",
    name: "불안함",
    id: 6,
  },
];

export function useEmotions() {
  return Emotions;
}
