import React, { useState, Fragment } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Dialog, Transition } from "@headlessui/react";

const ColumnItem = ({ item, colId }) => {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    console.log("open modal");
    setIsOpen(true);
  }
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
    <React.Fragment>
      <div
        onClick={() => openModal()}
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        className="z-0 max-w-[280px] min-h-[88px] bg-white dark:bg-main-dark-grey rounded-md flex flex-col justify-center  px-4 py-[23px] cursor-grab active:opacity-70 active:border active:border-main-purple-hover mb-4 touch-none">
        <p className="text-[15px] font-semibold dark:text-white truncate">
          {item.cardName}
        </p>
        <p className=" text-main-medium-grey text-xs font-semibold truncate">
          {item.cardDescription}
        </p>
      </div>
    </React.Fragment>
  );
};

export default ColumnItem;
