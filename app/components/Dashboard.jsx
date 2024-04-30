"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import Sidebar from "../components/Sidebar";
import Nav from "./Nav";
const Dashboard = ({ data }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [isThemeToggled, setIsThemeToggled] = useState(false);
  return (
    <div className="flex flex-col h-screen dashboard">
      <Nav
        data={data}
        isThemeToggled={isThemeToggled}
        setIsThemeToggled={setIsThemeToggled}
      />
      <div className="flex flex-grow">
        <div className="hidden sm:flex">
          <Sidebar
            data={data}
            setIsSidebarVisible={setIsSidebarVisible}
            isSidebarVisible={isSidebarVisible}
            isThemeToggled={isThemeToggled}
            setIsThemeToggled={setIsThemeToggled}
          />
        </div>

        <main className=" bg-main-light-lines dark:bg-main-very-dark-grey grow ">
          <div className="h-full w-full space-y-8 flex flex-col justify-center items-center">
            <p className="text-main-medium-grey text-[18px] font-semibold">
              This board is empty. Create a new column to get started.
            </p>
            <button
              className={`bg-main-purple hover:bg-main-purple-hover w-12 sm:w-auto h-8 sm:h-12 sm:px-6 space-x-1 rounded-full flex justify-center items-center`}>
              <Image
                src="/assets/icon-add-task-mobile.svg"
                alt="add task"
                width={12}
                height={12}
              />
              <p className=" text-white text-[15px] font-semibold">
                Add New Column
              </p>
            </button>
          </div>
          <Transition
            as="button"
            show={!isSidebarVisible}
            enter="transition ease-in-out duration-700 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-700 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
            onClick={() => setIsSidebarVisible((prevState) => !prevState)}
            className={`absolute flex justify-center items-center w-14 h-12 bg-main-purple hover:bg-main-purple-hover rounded-r-full bottom-8`}>
            <div className="">
              <Image
                src="/assets/icon-show-sidebar.svg"
                alt="board icon"
                width={16}
                height={11}
              />
            </div>
          </Transition>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
