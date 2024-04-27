import React from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
const Nav = () => {
  return (
    <>
      <nav className="flex bg-white justify-between px-3 h-16 border-b dark:bg-main-dark-grey ">
        <div className="flex items-center space-x-2">
          <div className=" w-6 h-[25px]">
            <Image
              src="/assets/logo-mobile.svg"
              alt="logo"
              width={24}
              height={25}
            />
          </div>
          <div className="flex items-center space-x-1">
            <p className=" font-bold text-lg">Platform Launch</p>
            <ChevronDownIcon className="h-4 w-4" />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className=" bg-main-purple-hover w-12 h-8 rounded-full flex justify-center items-center">
            <Image
              src="/assets/icon-add-task-mobile.svg"
              alt="add task"
              width={12}
              height={12}
            />
          </div>
          <Image
            src="/assets/icon-vertical-ellipsis.svg"
            alt="avatar"
            width={5}
            height={20}
          />
        </div>
      </nav>
    </>
  );
};

export default Nav;
