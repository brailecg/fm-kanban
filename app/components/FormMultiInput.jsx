import React, { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Button } from "./ui/Button";
import { useFieldArray } from "react-hook-form";

const FormMultiInput = ({ label, name, register, errors, control, from }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const handleAddInput = () => {
    append(); // Append a new empty subtask
  };

  const handleRemoveInput = (index) => {
    remove(index); // Remove the subtask at given index
  };

  return (
    <div className="space-y-2">
      <Label name={label} />

      {fields.map((item, index) => {
        return (
          <div key={item.id} className="flex w-full items-center space-x-2">
            <div className="grow">
              <Controller
                name={`${name}[${index}].title`}
                control={control}
                defaultValue={
                  from === "board" ? item?.columnName : item?.subTaskDescription
                }
                render={({ field: { onChange } }) => {
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
      })}
      <Button
        className="text-main-purple w-full rounded-full dark:bg-white bg-[#635FC7] bg-opacity-10 hover:bg-opacity-25 cursor-pointer"
        type="button"
        onClick={handleAddInput}>
        + Add New Column
      </Button>
    </div>
  );
};

export default FormMultiInput;
