import React from "react";
import { Transition } from "@headlessui/react";
import Image from "next/image";
const ShowSidebarIcon = ({ isSidebarVisible, setIsSidebarVisible }) => {
  return (
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
  );
};

export default ShowSidebarIcon;
