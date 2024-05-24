import React, { useEffect, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import Image from "next/image";
import { ErrorMessage } from "@hookform/error-message";
import { Input } from "./ui/input";

const SubtaskDraggable = ({
  item,
  index,
  register,
  errors,
  from,
  handleRemoveInput,
  name,
  setValue,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const setVal =
    from === "board"
      ? item?.title
        ? item?.title
        : item?.columnName
      : item?.title
      ? item?.title
      : item?.subTaskDescription;
  const handleInputChange = (e) => {
    item.title = e.target.value;
  };

  setValue(`${name}[${index}].title`, setVal);

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className=" active:bg-main-light-grey active:border rounded-md py-2 pl-2 flex w-full items-center space-x-2 touch-none">
        {from === "board" ? (
          <button {...listeners} {...attributes}>
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
          <React.Fragment>
            <Input
              className={`${
                errors[name]
                  ? errors[name][index]
                    ? "border-red-500 focus:border-red-500 focus:outline-none"
                    : "focus:outline-main-purple"
                  : ""
              } dark:bg-main-dark-grey`}
              placeholder="e.g. Make Cofee"
              {...register(`${name}[${index}].title`, {
                required: "This field is required",
                onChange: (e) => handleInputChange(e),
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
        </div>
        <button
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
        </button>
      </div>
    </>
  );
};

export default SubtaskDraggable;
