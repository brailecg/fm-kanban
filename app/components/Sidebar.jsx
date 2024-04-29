"use client";
import React, { useState } from "react";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/20/solid";
import { ToggleIconSvg } from "./ToggleIconSvg";
import { Transition } from "@headlessui/react";

const Sidebar = ({
  data,
  closeModal = null,
  isSidebarVisible,
  setIsSidebarVisible,
}) => {
  const [selected, setSelected] = useState(0);
  const [isToggled, setToggled] = useState(false);
  const handleSelectBoard = (e) => {
    const index = e.target.closest("button").getAttribute("name");
    setSelected(index);
    if (closeModal) {
      closeModal();
    }
  };
  const handleToggleTheme = () => {
    setToggled((prevState) => !prevState);
  };
  const boardList = data?.boardList;

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
        className={`flex border-r flex-col bg-white pb-8 dark:bg-main-dark-grey sm:w-[300px] rounded-md sm:rounded-none z-10 sm:-mt-1`}>
        <div className="h-full flex flex-col justify-between">
          <div className="text-main-medium-grey">
            <span className="font-semibold text-[12px] pl-8">
              All Boards ({boardList.length})
            </span>
            <ul className="flex flex-col pl-8 pr-6 mt-5">
              {boardList &&
                boardList.map((list, index) => {
                  return (
                    <li
                      key={index}
                      className={`font-semibold text-[15px] h-12 -ml-8 pl-8  ${
                        selected == index
                          ? "bg-main-purple rounded-r-full text-white"
                          : "bg-transparent"
                      }`}>
                      <button
                        name={index}
                        onClick={handleSelectBoard}
                        className="flex items-center space-x-1 h-full">
                        <Image
                          src={`/assets/icon-board${
                            selected == index ? "-selected" : ""
                          }.svg`}
                          alt="board icon"
                          width={16}
                          height={16}
                        />
                        <p>{list}</p>
                      </button>
                    </li>
                  );
                })}
              <li className="font-semibold text-[15px] h-12">
                <button className="flex items-center space-x-1 h-full">
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
              </li>
            </ul>
          </div>
          <div className=" w-full gap-y-4 grid justify-items-center">
            <div className="flex items-center space-x-6 justify-center w-[251px] h-12 bg-main-light-grey rounded-md">
              <div>
                <Image
                  src="/assets/icon-light-theme.svg"
                  alt="icon light theme"
                  width={19}
                  height={19}
                />
              </div>
              <div className="cursor-pointer" onClick={handleToggleTheme}>
                <ToggleIconSvg isToggled={isToggled} />
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
              className="w-[251px] justify-self-auto hidden sm:flex items-center space-x-2  font-semibold text-[15px] text-main-medium-grey mt-2">
              <Image
                src="/assets/icon-hide-sidebar.svg"
                alt="board icon"
                width={18}
                height={16}
              />
              <p>Hide Sidebar</p>
            </button>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default Sidebar;
