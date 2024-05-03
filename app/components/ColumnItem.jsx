import React from "react";
import { useDraggable } from "@dnd-kit/core";
const ColumnItem = ({ item, colId }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.cardId,
    data: { colId: colId },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="w-[280px] min-h-[88px] bg-white dark:bg-main-dark-grey rounded-md flex flex-col justify-center  px-4 py-[23px] cursor-grab active:opacity-70 active:border active:border-main-purple-hover mb-4 touch-none">
      <p className="text-[15px] font-semibold dark:text-white">
        {item.cardName}
      </p>
      <p className=" text-main-medium-grey text-xs font-semibold">
        {item.cardDescription}
      </p>
    </div>
  );
};

export default ColumnItem;
