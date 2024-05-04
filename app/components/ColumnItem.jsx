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
        className="ßz-0 min-w-[280px] min-h-[88px] bg-white dark:bg-main-dark-grey rounded-md flex flex-col justify-center  px-4 py-[23px] cursor-grab active:opacity-70 active:border active:border-main-purple-hover mb-4 touch-none">
        <p className="text-[15px] font-semibold dark:text-white">
          {item.cardName}
        </p>
        <p className=" text-main-medium-grey text-xs font-semibold">
          {item.cardDescription}
        </p>
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 top-16 bg-black/25 darkbg" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto top-16">
            <div className="flex max-h-fit pt-4 justify-center text-center w-screen">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className="w-full max-w-80 transform overflow-hidden bg-[var(--menu-background-color)] px-6 text-left align-middle  transition-all space-y-3">
                  View Task
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </React.Fragment>
  );
};

export default ColumnItem;
