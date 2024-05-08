"use client";
import React, { Fragment, useState } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { ChevronDownIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Dialog, Transition, Menu, Listbox } from "@headlessui/react";

import Sidebar from "./Sidebar";

import { Label } from "./ui/Label";

import { Button } from "./ui/Button";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import FormMultiInput from "./FormMultiInput";

const Nav = ({
  data,
  isThemeToggled,
  setIsThemeToggled,
  selected,
  setSelected,
  columns,
  selectedCol,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  const [isOpen, setIsOpen] = useState(false);
  const [addTaskModal, setAddTaskModal] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <>
      <nav className="flex z-0 bg-white min-h-16 sm:min-h-20 lg:min-h-24 dark:bg-main-dark-grey ">
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
            onClick={openModal}
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
              <p className=" font-bold dark:text-white text-2xl">
                Platform Launch
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
              }  w-12 sm:w-auto h-8 sm:h-12 sm:px-6 space-x-1 rounded-full flex justify-center items-center`}>
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
                          <p className="ml-2 ">Edit Board</p>
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          className={`${
                            active ? "bg-main-light-grey " : "text-gray-900 "
                          } text-main-red group flex rounded-md items-center w-full px-2 py-2 text-sm `}>
                          <p className="ml-2 ">Delete Board</p>
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
      <Transition appear show={addTaskModal} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-20 max-h-screen"
          onClose={() => setAddTaskModal(false)}>
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

          <div className="fixed inset-0  top-16">
            <div className="flex justify-center w-screen ">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95">
                <Dialog.Panel className=" w-[480px] max-h-[600px] p-8 overflow-y-auto bg-[var(--menu-background-color)] bg-white dark:bg-main-dark-grey dark:text-white rounded-md">
                  <div className="">
                    <p className=" font-semibold text-[18px]">Add New Task</p>
                    <form
                      className=" space-y-6"
                      onSubmit={handleSubmit(onSubmit)}>
                      <FormInput
                        label={"Title"}
                        name={"title"}
                        register={register}
                        errors={errors}
                      />

                      <FormTextArea
                        label={"Description"}
                        name={"description"}
                        register={register}
                        errors={errors}
                      />

                      <FormMultiInput
                        label={"SubTasks"}
                        name={"subtasks"}
                        register={register}
                        errors={errors}
                        control={control}
                      />
                      <div className="flex flex-col space-y-2">
                        <Controller
                          name="status"
                          control={control}
                          rules={{ required: true }}
                          defaultValue={selectedCol}
                          render={({ field: { onChange, value } }) => (
                            <Listbox value={value} onChange={onChange}>
                              {({ open }) => (
                                <>
                                  <Label name="Status" />

                                  <div className="relative mt-2">
                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                      <span className="block truncate">
                                        {value?.columnName}
                                      </span>
                                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                          className="h-5 w-5 text-gray-400"
                                          aria-hidden="true"
                                        />
                                      </span>
                                    </Listbox.Button>

                                    <Transition
                                      show={open}
                                      as={Fragment}
                                      leave="transition ease-in duration-100"
                                      leaveFrom="opacity-100"
                                      leaveTo="opacity-0">
                                      <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                        {columns.map((col) => (
                                          <Listbox.Option
                                            key={col.columnId}
                                            className={({ active }) =>
                                              classNames(
                                                active
                                                  ? "bg-indigo-600 text-white"
                                                  : "text-gray-900",
                                                "relative cursor-default select-none py-2 pl-3 pr-9"
                                              )
                                            }
                                            value={col}>
                                            {({ selectedCol, active }) => (
                                              <>
                                                <span
                                                  className={classNames(
                                                    selectedCol
                                                      ? "font-semibold"
                                                      : "font-normal",
                                                    "block truncate"
                                                  )}>
                                                  {col.columnName}
                                                </span>
                                              </>
                                            )}
                                          </Listbox.Option>
                                        ))}
                                      </Listbox.Options>
                                    </Transition>
                                  </div>
                                </>
                              )}
                            </Listbox>
                          )}
                        />
                      </div>
                      <Button
                        className="bg-main-purple text-white w-full rounded-full hover:bg-main-purple-hover cursor-pointer"
                        asChild>
                        <input type="submit" value="Create Task" />
                      </Button>
                    </form>
                  </div>
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
