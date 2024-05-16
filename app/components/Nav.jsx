"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";

import { supabaseBrowser } from "../utils/supabase/browser";

import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition, Menu } from "@headlessui/react";

import { actionBoard } from "../utils/supabase/db_actions";

import Sidebar from "./Sidebar";
import FormTask from "./FormTask";
import FormBoard from "./FormBoard";
import { Button } from "./ui/Button";

const Nav = ({
  data,
  isThemeToggled,
  setIsThemeToggled,
  selected,
  setSelected,
  columns,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditBoardOpen, setIsEditBoardOpen] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  const [isDeleteViewOpen, setIsDeleteViewOpen] = useState(false);

  const selectedCol = columns ? columns[0] : null;

  const selectedBoard = data?.boardObjectList.find(
    (board) => board.boardId === selected
  );

  const handleEditBoardButton = () => {
    setIsEditBoardOpen(true);
  };
  const handleDeleteBoardButton = () => {
    setIsDeleteViewOpen(true);
  };

  const handleDeleteBoard = () => {
    actionBoard({ action: "delete", boardIn: selectedBoard });
  };

  const signOut = async () => {
    const supabase = supabaseBrowser();
    const { error } = await supabase.auth.signOut();
    console.log({ error });
  };

  return (
    <>
      <nav className="flex z-20 bg-white min-h-16 sm:min-h-20 lg:min-h-24 dark:bg-main-dark-grey ">
        <div
          className={`hidden border-r dark:border-main-dark-lines pl-8 min-w-[260px] md:w-[300px] border-b sm:flex items-center `}>
          <div>
            <Image
              src={`/assets/logo-${isThemeToggled ? "light" : "dark"}.svg`}
              alt="logo light"
              width={153}
              height={26}
              priority
            />
          </div>
        </div>
        <div className="flex border-b dark:border-main-dark-lines px-6 flex-grow justify-between">
          <div
            onClick={() => setIsOpen(true)}
            className="flex  cursor-pointer sm:cursor-default items-center space-x-2">
            <div className={`w-6 h-[25px] flex sm:hidden`}>
              <Image
                src="/assets/logo-mobile.svg"
                alt="logo"
                width={24}
                height={25}
              />
            </div>
            <div className="flex items-center space-x-1">
              <p className=" font-bold dark:text-white text-lg sm:text-2xl truncate max-w-[50vw] sm:max-w-[25vw]">
                {selectedBoard?.boardName}
              </p>
              <ChevronDownIcon className="flex sm:hidden h-4 w-4" />
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setAddTaskModal(true)}
              className={`${
                data?.boardObjectList.length > 0
                  ? "bg-main-purple"
                  : " bg-main-purple-hover "
              }  w-12 sm:w-auto h-8 sm:h-12 sm:px-6 space-x-1 rounded-full flex justify-center items-center min-w-fit`}>
              <Image
                src="/assets/icon-add-task-mobile.svg"
                alt="add task"
                width={12}
                height={12}
              />
              <p className=" text-white text-[15px] font-semibold hidden sm:flex">
                Add New Task
              </p>
            </button>

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
                <Menu.Items className="absolute right-8 w-56 mt-28  origin-top-right bg-white dark:bg-main-very-dark-grey divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                  <div className="py-1 ">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleEditBoardButton}
                          className={`${
                            active
                              ? "bg-main-light-grey text-gray-900"
                              : "text-gray-900 dark:text-white"
                          } group flex rounded-md 
                           items-center w-full px-2 py-2 text-sm`}>
                          <p className="ml-2 ">Edit Board</p>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleDeleteBoardButton}
                          className={`${
                            active ? "bg-main-light-grey " : "text-gray-900 "
                          } text-main-red group flex rounded-md items-center w-full px-2 py-2 text-sm `}>
                          <p className="ml-2 ">Delete Board</p>
                        </button>
                      )}
                    </Menu.Item>
                    <div className="my-1 h-px bg-gray-100" />
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={handleEditBoardButton}
                          className={`${
                            active
                              ? "bg-main-light-grey text-gray-900"
                              : "text-gray-900 dark:text-white"
                          } group flex rounded-md 
                           items-center w-full px-2 py-2 text-sm`}>
                          <p className="ml-2 ">Profile</p>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={signOut}
                          className={`${
                            active ? "bg-main-light-grey " : "text-gray-900 "
                          }  group flex rounded-md items-center w-full px-2 py-2 text-sm `}>
                          <p className="ml-2 ">Sign Out</p>
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>
      </nav>
      {isOpen && (
        <Transition appear show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative flex sm:hidden"
            onClose={() => setIsOpen(false)}>
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
                    <Sidebar
                      data={data}
                      isThemeToggled={isThemeToggled}
                      setIsThemeToggled={setIsThemeToggled}
                      selected={selected}
                      setSelected={setSelected}
                    />
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
      {addTaskModal && (
        <FormTask
          label={"Add New Task"}
          columns={columns}
          selectedCol={selectedCol}
          isViewOpen={addTaskModal}
          setIsViewOpen={setAddTaskModal}
        />
      )}

      {isEditBoardOpen && (
        <FormBoard
          label={"Edit Board"}
          isViewOpen={isEditBoardOpen}
          setIsViewOpen={setIsEditBoardOpen}
          allColumns={columns}
          boardIn={selectedBoard}
        />
      )}
      {isDeleteViewOpen && (
        <Transition appear show={isDeleteViewOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-20"
            onClose={() => setIsDeleteViewOpen(false)}>
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
              <div className="flex max-h-fit pt-4 justify-center text-center w-screen px-3 sm:px-0">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95">
                  <Dialog.Panel className="w-[480px] p-6 text-left bg-white dark:bg-main-dark-grey rounded-md space-y-6">
                    <Dialog.Title className=" text-red-500 text-[18px] font-semibold">
                      Delete this board?
                    </Dialog.Title>
                    <p className="text-sm text-main-medium-grey">
                      Are you sure you want to delete the {"'"}
                      {selectedBoard?.boardName}
                      {"' "}
                      board? This action will remove all columns and tasks and
                      cannot be reversed.
                    </p>
                    <div className="flex space-x-2 justify-between">
                      <Button
                        onClick={handleDeleteBoard}
                        className="grow bg-red-500 text-white rounded-full hover:bg-red-500/75 cursor-pointer dark:hover:bg-red-300">
                        Delete
                      </Button>
                      <Button
                        onClick={() => setIsDeleteViewOpen(false)}
                        className="grow bg-main-purple/10 dark:bg-white  text-main-purple rounded-full hover:bg-main-purple/25 dark:hover:bg-slate-100 cursor-pointer">
                        Cancel
                      </Button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      )}
    </>
  );
};

export default Nav;
