import React, { Fragment, useState } from "react";
import { Controller } from "react-hook-form";
import { Transition, Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Label } from "./ui/Label";

const classNames = (...classes) => {
  return classes.filter(Boolean).join(" ");
};
const FormStatus = ({ name, label, columns, control, selectedCol, colId }) => {
  const colIn = colId
    ? columns.find((col) => col.columnId === colId)
    : selectedCol;

  return (
    <div className="flex flex-col space-y-2">
      <Controller
        name={name}
        control={control}
        rules={{ required: true }}
        defaultValue={colIn}
        render={({ field: { onChange, value } }) => (
          <Listbox value={value} onChange={onChange}>
            {({ open }) => (
              <>
                <Label name={label} />

                <div className="relative mt-2">
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white dark:bg-main-dark-grey dark:text-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">{value?.columnName}</span>
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
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm dark:bg-main-dark-grey dark:text-white">
                      {columns.map((col) => (
                        <Listbox.Option
                          key={col.columnId}
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-indigo-600 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9 "
                            )
                          }
                          value={col}>
                          {({ selectedCol, active }) => (
                            <>
                              <span
                                className={classNames(
                                  selectedCol ? "font-semibold" : "font-normal",
                                  "block truncate dark:text-white"
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
  );
};

export default FormStatus;
