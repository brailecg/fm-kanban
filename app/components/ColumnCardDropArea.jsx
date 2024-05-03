import React, { useState } from "react";
import { useDroppable } from "@dnd-kit/core";

const ColumnCardDropArea = ({ id, colId, idx }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
    data: { colId: colId, idx: idx },
  });
  return (
    <div
      ref={setNodeRef}
      className={`${
        isOver
          ? "border border-red-500 flex min-h-[88px] p-4 mb-4"
          : " invisible h-1"
      }  w-[280px]  bg-white dark:bg-main-dark-grey rounded-md 
           `}></div>
  );
};

export default ColumnCardDropArea;
