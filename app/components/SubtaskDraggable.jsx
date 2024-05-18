import React from "react";
import { useDraggable } from "@dnd-kit/core";
import Image from "next/image";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
const SubtaskDraggable = ({
  item,
  index,
  register,
  errors,
  from,
  remove,
  control,
  name,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const handleRemoveInput = (index) => {
    remove(index); // Remove the subtask at given index
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className=" active:bg-main-light-grey active:border rounded-md py-2 pl-2 flex w-full items-center space-x-2 touch-none">
      {from === "board" ? (
        <button>
          <Image
            src="/assets/icon-vertical-ellipsis.svg"
            alt="avatar"
            width={5}
            height={20}
          />
        </button>
      ) : (
        ""
      )}
      <div className="grow">
        <Controller
          name={`${name}[${index}].title`}
          control={control}
          defaultValue={
            from === "board" ? item?.columnName : item?.subTaskDescription
          }
          render={() => {
            return (
              <React.Fragment>
                <Input
                  className={`${
                    errors[name]
                      ? errors[name][index] // TODO: all inputs get the border red even when only one has error. errors[name][index] does not work for empty
                        ? "border-red-500 focus:border-red-500 focus:outline-none"
                        : "focus:outline-main-purple"
                      : ""
                  } dark:bg-main-dark-grey`}
                  placeholder="e.g. Make Cofee"
                  {...register(`${name}[${index}].title`, {
                    required: "This field is required",
                  })}
                />
                <ErrorMessage
                  name={`${name}[${index}].title`}
                  errors={errors}
                  render={({ message }) => (
                    <p className="text-red-500 text-xs">{message}</p>
                  )}
                />
              </React.Fragment>
            );
          }}
        />
      </div>
      <Button
        className="flex items-center"
        onClick={() => handleRemoveInput(index)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </Button>
    </div>
  );
};

export default SubtaskDraggable;
