"use client";

import { useDragHandler } from "@/shared/hooks/useDragHandler";
import { useRef, useState } from "react";

type Props = React.PropsWithChildren<{
  visible: boolean;
  onClose?: () => void;
}>;

export const BottomSheet: React.FC<Props> = ({
  visible,
  children,
  onClose,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragDown, setDragDown] = useState(0);

  const { isDragging, dragHandlers } = useDragHandler({
    onDragging: (_, y) => setDragDown((prev) => Math.max(0, prev + y)),
    onClick: onClose,
    onDragStop: () => {
      if (!containerRef.current) return;
      const threshold = containerRef.current.clientHeight / 2;
      if (dragDown > threshold) {
        onClose?.();
      }

      setDragDown(0);
    },
  });

  return (
    <div
      ref={containerRef}
      className={`absolute z-10 w-full bottom-0 left-0 bg-white rounded-t-[24px] box-border px-8 pb-8
        shadow-[0_0_16px_rgba(0,0,0,0.08)]
        ${isDragging ? "" : "transition-transform duration-300"}
        `}
      style={{
        transform: `translateY(${visible ? dragDown + "px" : "100%"})`,
      }}
    >
      <div
        className="p-4 
      after:block after:w-[72px] after:h-2 after:rounded-full
      after:mx-auto after:bg-slate-100"
        {...dragHandlers}
      />
      {children}
    </div>
  );
};
