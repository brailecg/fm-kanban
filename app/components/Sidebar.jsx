"use client";
import React, { useState } from "react";
import Image from "next/image";
import { PlusIcon } from "@heroicons/react/20/solid";
import { ToggleIconSvg } from "./ToggleIconSvg";
import { IconBoardSvg } from "./IconBoardSvg";

const Sidebar = ({ data }) => {
  const [selected, setSelected] = useState(0);
  const [isToggled, setToggled] = useState(false);
  const handleSelectBoard = (e) => {
    const index = e.target.closest("button").getAttribute("name");
    setSelected(index);
  };
  const handleToggleTheme = () => {
    setToggled((prevState) => !prevState);
  };
  const boardList = data.boardList;
  return (
    <aside className="flex flex-col sm:justify-between bg-white py-8 dark:bg-main-dark-grey w-[300px] border-r h-screen">
      <div>
        <div className="pl-8 h-16">
          <div>
            <Image
              src="/assets/logo-dark.svg"
              alt="logo light"
              width={153}
              height={26}
              priority
            />
          </div>
        </div>
        <div className="text-main-medium-grey">
          <span className="font-semibold text-[12px] pl-8">
            All Boards ({boardList.length})
          </span>
          <ul className="hidden sm:flex flex-col pl-8 pr-6 mt-5">
            {boardList.map((list, index) => {
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
      </div>
      <div className=" w-full flex flex-col items-center justify-center">
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
        <div className="flex items-center justify-center space-x-2  font-semibold text-[15px] text-main-medium-grey mt-2">
          <Image
            src="/assets/icon-hide-sidebar.svg"
            alt="board icon"
            width={18}
            height={16}
          />
          <p>Hide Sidebar</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
