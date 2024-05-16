"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/20/solid";
import { ToggleIconSvg } from "./ToggleIconSvg";
import { Transition } from "@headlessui/react";
import IconBoardSvg from "./IconBoardSvg";
import IconHideSidebar from "./IconHideSidebar";
import FormBoard from "./FormBoard";

const Sidebar = ({
  data,
  closeModal = null,
  isSidebarVisible,
  setIsSidebarVisible,
  isThemeToggled,
  setIsThemeToggled,
  selected,
  setSelected,
  user,
}) => {
  const [isAddBoardOpen, setIsAddBoardOpen] = useState(false);

  const handleSelectBoard = (e) => {
    const index = e.target.closest("button").getAttribute("name");

    setSelected(index);
    if (closeModal) {
      closeModal();
    }
  };
  const handleToggleTheme = () => {
    document.querySelector("body").classList.toggle("dark");
    setIsThemeToggled((prev) => !prev);
  };
  const boardList = data?.boardObjectList;

  const handleAddBoardButton = () => {
    setIsAddBoardOpen(true);
  };

  return (
    <>
      <Transition
        as="aside"
        show={isSidebarVisible}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
        className={`flex border-r dark:border-main-dark-lines  flex-col bg-white pb-8 dark:bg-main-dark-grey w-[260px] md:w-[300px] rounded-md sm:rounded-none z-10 sm:-mt-1`}>
        <div className="h-full flex flex-col justify-between">
          <div className="text-main-medium-grey py-4">
            <span className="font-semibold text-[12px] pl-8">
              All Boards ({boardList.length})
            </span>
            <ul className="flex flex-col pl-8 pr-6 mt-5">
              {boardList &&
                boardList.map((list) => {
                  return (
                    <li key={list.boardId} className="">
                      <button
                        name={list.boardId}
                        onClick={handleSelectBoard}
                        className={`w-full space-x-2 flex items-center group relative font-semibold text-[15px] min-h-12 -ml-8 pl-8  ${
                          selected == list.boardId
                            ? "bg-main-purple rounded-r-full text-white"
                            : "bg-transparent hover:bg-main-light-grey hover:rounded-r-full"
                        }`}>
                        <div className="w-4">
                          <IconBoardSvg selected={selected == list.boardId} />
                        </div>
                        <p
                          className={`${
                            selected != list.boardId &&
                            "group-hover:text-main-purple"
                          } text-left truncate`}>
                          {list?.boardName}
                        </p>
                        {/* Tooltip implementation */}
                        <div className="absolute hidden group-hover:block bg-main-purple-hover text-white text-xs rounded py-1 px-2 top-0 right-0 z-10">
                          {list?.boardName}
                        </div>
                      </button>
                    </li>
                  );
                })}
              <li className="font-semibold text-[15px] h-12">
                <button
                  onClick={handleAddBoardButton}
                  className="flex items-center space-x-1 h-full">
                  <Image
                    src="/assets/icon-board-filled.svg"
                    alt="board icon"
                    width={16}
                    height={16}
                  />
                  <p className="flex items-center">
                    <PlusIcon className="h-4 w-4 text-main-purple" />
                    <span className=" text-main-purple"> Create New Board</span>
                  </p>
                </button>
                <FormBoard
                  label={"Add New Board"}
                  isViewOpen={isAddBoardOpen}
                  setIsViewOpen={setIsAddBoardOpen}
                  user={user}
                />
              </li>
            </ul>
          </div>
          <div className=" w-full gap-y-4 grid justify-items-center">
            <div className="flex items-center space-x-6 justify-center w-[251px] h-12 dark:bg-main-very-dark-grey bg-main-light-grey rounded-md">
              <div>
                <Image
                  src="/assets/icon-light-theme.svg"
                  alt="icon light theme"
                  width={19}
                  height={19}
                />
              </div>
              <div className="cursor-pointer" onClick={handleToggleTheme}>
                <ToggleIconSvg isToggled={isThemeToggled} />
              </div>
              <div>
                <Image
                  src="/assets/icon-dark-theme.svg"
                  alt="icon light theme"
                  width={19}
                  height={19}
                />
              </div>
            </div>
            <button
              onClick={() => setIsSidebarVisible((prev) => !prev)}
              className="group w-[251px] justify-self-auto hidden sm:flex items-center space-x-2  font-semibold text-[15px] text-main-medium-grey mt-2 hover:bg-main-light-grey hover:rounded-r-full relative h-12 -ml-12 pl-8 ">
              <IconHideSidebar />
              <p className="group-hover:text-main-purple">Hide Sidebar</p>
            </button>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Sidebar;
