"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition } from "@headlessui/react";
import Sidebar from "./Sidebar";
const Nav = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <nav className="flex z-0 bg-white  h-16 dark:bg-main-dark-grey ">
        <div
          className={`hidden border-r pl-8 w-[300px] border-b sm:flex items-center `}>
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
        <div className="flex border-b px-3 flex-grow justify-between">
          <div
            onClick={openModal}
            className="flex  cursor-pointer sm:cursor-default items-center space-x-2">
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
              <ChevronDownIcon className="flex sm:hidden h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`${
                data?.boardList.length > 0
                  ? "bg-main-purple"
                  : " bg-main-purple-hover "
              }  w-12 h-8 rounded-full flex justify-center items-center`}>
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
        </div>
      </nav>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative flex sm:hidden"
          onClose={closeModal}>
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
                  <Sidebar data={data} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Nav;
