import React, { useState } from "react";

import { Label } from "./ui/Label";
import { Button } from "./ui/Button";
import { useFieldArray } from "react-hook-form";

import SubtaskDropArea from "./SubtaskDropArea";
import SubtaskDraggable from "./SubtaskDraggable";

const FormMultiInput = ({ label, name, register, errors, control, from }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const handleAddInput = () => {
    append(); // Append a new empty subtask
  };

  return (
    <div className="space-y-2">
      <Label name={label} />

      {fields.map((item, index) => {
        return (
          <React.Fragment key={item.id}>
            <SubtaskDraggable
              item={item}
              index={index}
              register={register}
              errors={errors}
              from={from}
              remove={remove}
              control={control}
              name={name}
            />
            <SubtaskDropArea />
          </React.Fragment>
        );
      })}

      <Button
        className="text-main-purple w-full rounded-full dark:bg-white bg-[#635FC7] bg-opacity-10 hover:bg-opacity-25 cursor-pointer"
        type="button"
        onClick={handleAddInput}>
        {`+ Add New ${label.includes("Task") ? "Task" : "Column"}`}
      </Button>
    </div>
  );
};

export default FormMultiInput;
