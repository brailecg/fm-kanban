import React, { Fragment, useState } from "react";

import { useForm } from "react-hook-form";

import { Dialog, Transition, Menu } from "@headlessui/react";

import { Button } from "./ui/Button";
import FormInput from "./FormInput";
import FormTextArea from "./FormTextArea";
import FormMultiInput from "./FormMultiInput";
import FormStatus from "./FormStatus";

const FormTask = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  const [addTaskModal, setAddTaskModal] = useState(false);
  return (
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
              <Dialog.Panel className=" overflow-visible w-[480px] max-h-[600px] p-8 overflow-y-auto bg-[var(--menu-background-color)] bg-white dark:bg-main-dark-grey dark:text-white rounded-md">
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
                    <FormStatus
                      name="status"
                      label="Status"
                      columns={columns}
                      control={control}
                      selectedCol={selectedCol}
                    />

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
  );
};
const onSubmit = (data) => console.log(data);

const [addTaskModal, setAddTaskModal] = useState(false);
export default FormTask;
