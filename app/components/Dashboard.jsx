"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import Sidebar from "../components/Sidebar";
const Dashboard = ({ data }) => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  return (
    <div className="flex flex-grow">
      <div className="hidden sm:flex">
        <Sidebar
          data={data}
          setIsSidebarVisible={setIsSidebarVisible}
          isSidebarVisible={isSidebarVisible}
        />
      </div>

      <main className="relative">
        main
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
  );
};

export default Dashboard;
