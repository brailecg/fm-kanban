import React, { useState, Fragment } from "react";

import Image from "next/image";
import { useDraggable } from "@dnd-kit/core";
import { Dialog, Transition, Menu, Listbox } from "@headlessui/react";

const ColumnItem = ({ item, colId, columns, selectedCol }) => {
  const [isOpenView, setIsOpenView] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.cardId,
    data: { colId: colId },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  function closeModal() {
    setIsOpenView(false);
  }
  function openModal() {
    if (!transform) setIsOpenView(true);
  }

  const getAllSubtasks = () => {
    return item?.subtasks ? item?.subtasks : null;
  };

  const getCompletedSubtasks = () => {
    const completedSubtasks = item?.subtasks?.filter(
      (sub) => sub.status == true
    );
    return completedSubtasks ? completedSubtasks : null;
  };

  const subTasksIdsArray = getCompletedSubtasks()
    ? getCompletedSubtasks().map((task) => task.id)
    : [];
  const [completedSubtask, setCompletedSubtask] = useState(subTasksIdsArray);

  const handleCheckboxChange = (isChecked, taskId) => {
    let newCompletedTask;
    if (isChecked) {
      newCompletedTask = completedSubtask.filter((task) => task !== taskId);
    } else {
      completedSubtask.push(taskId);
      newCompletedTask = Array.from(completedSubtask);
    }

    setCompletedSubtask(newCompletedTask);
  };
  return (
    <React.Fragment>
      <div
        onTouchMove={openModal}
        onMouseUp={openModal} // TODO: modal still opens when the card is moved but not dropped
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

      <Transition show={isOpenView} as={Fragment}>
        <Dialog as="div" className="relative z-20" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0">
            <div className="fixed inset-0 bg-black/25 darkbg" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto top-16">
            <div className="flex max-h-fit pt-4 justify-center w-screen">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className=" w-[480px] max-h-[600px] p-8 space-y-6 overflow-y-auto bg-[var(--menu-background-color)] bg-white dark:bg-main-dark-grey dark:text-white rounded-md">
                  <div className="flex justify-between relative">
                    <p className="font-bold text-[18px]">{item.cardName}</p>
                    <Menu>
                      <Menu.Button>
                        <Image
                          src="/assets/icon-vertical-ellipsis.svg"
                          alt="avatar"
                          width={5}
                          height={20}
                        />
                      </Menu.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95">
                        <Menu.Items className="absolute right-4 top-4 w-56  bg-white dark:bg-main-very-dark-grey  divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                          <div className="px-1 py-1 ">
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-main-light-grey text-gray-900"
                                      : "text-gray-900 dark:text-white"
                                  } group flex rounded-md 
                           items-center w-full px-2 py-2 text-sm`}>
                                  <p className="ml-2 ">Edit Task</p>
                                </button>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <button
                                  className={`${
                                    active
                                      ? "bg-main-light-grey "
                                      : "text-gray-900 "
                                  } text-main-red group flex rounded-md items-center w-full px-2 py-2 text-sm `}>
                                  <p className="ml-2 ">Delete Task</p>
                                </button>
                              )}
                            </Menu.Item>
                          </div>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                  <p className="text-[13px] text-main-medium-grey">
                    {item.cardDescription}
                  </p>
                  {getAllSubtasks() && (
                    <div className=" space-y-4">
                      <p className=" text-xs font-bold text-main-medium-grey">
                        Subtasks(
                        {completedSubtask.length}
                        of {getAllSubtasks() ? getAllSubtasks().length : 0})
                      </p>
                      <fieldset>
                        <legend className="sr-only">Subtasks</legend>
                        {getAllSubtasks().map((task) => {
                          const isChecked =
                            completedSubtask.find((id) => id === task.id) !==
                            undefined
                              ? true
                              : false;
                          const taskId = task.id;
                          return (
                            <div key={task.id} className="space-y-5">
                              <div className="relative flex items-start bg-main-light-grey p-3">
                                <div className="flex h-6 items-center">
                                  <input
                                    checked={isChecked}
                                    onChange={() =>
                                      handleCheckboxChange(isChecked, taskId)
                                    }
                                    id={task.id}
                                    aria-describedby={task.subTaskDescription}
                                    name={task.id}
                                    type="checkbox"
                                    className="h-4 w-4 rounded-sm border-gray-300 text-main-purple "
                                  />
                                </div>
                                <div className="ml-3 text-sm leading-6">
                                  <label
                                    htmlFor={task.id}
                                    className="font-xs font-bold text-gray-900">
                                    {task.subTaskDescription}
                                  </label>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </fieldset>
                    </div>
                  )}
                  <div>
                    <p className=" text-xs font-bold text-main-medium-grey">
                      Current Status
                    </p>
                  </div>
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
