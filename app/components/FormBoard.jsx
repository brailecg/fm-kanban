import React, { Fragment } from "react";

import { useForm } from "react-hook-form";

import { Dialog, Transition } from "@headlessui/react";

import { Button } from "./ui/Button";
import FormInput from "./FormInput";
import FormMultiInput from "./FormMultiInput";

import { actionBoard } from "../utils/supabase/db_actions";

const FormBoard = ({
  label,
  isViewOpen,
  setIsViewOpen,
  allColumns,
  boardIn,
}) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      columns: allColumns ? allColumns : [],
    },
  });
  const onSubmit = (data) => actionBoard({ boardIn, ...data });

  return (
    <Transition appear show={isViewOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20 max-h-screen"
        onClose={() => setIsViewOpen(false)}>
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
          <div className="flex justify-center w-screen px-3 sm:px-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className=" overflow-visible w-[480px] max-h-[600px] p-8 overflow-y-auto bg-[var(--menu-background-color)] bg-white dark:bg-main-dark-grey dark:text-white rounded-md">
                <div className="">
                  <p className=" font-semibold text-[18px]">{label}</p>

                  <form
                    className=" space-y-6"
                    onSubmit={handleSubmit(onSubmit)}>
                    <FormInput
                      label={"Name"}
                      name={"name"}
                      register={register}
                      control={control}
                      errors={errors}
                      value={boardIn ? boardIn?.boardName : ""}
                    />

                    <FormMultiInput
                      label={"Columns"}
                      name={"columns"}
                      register={register}
                      errors={errors}
                      control={control}
                      from={"board"}
                      setValue={setValue}
                    />

                    <input
                      className="bg-main-purple text-white w-full rounded-full hover:bg-main-purple-hover cursor-pointer h-10"
                      type="submit"
                      value={`${
                        boardIn ? "Save Changes" : "Create New Board"
                      } `}
                    />
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FormBoard;
