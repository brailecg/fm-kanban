import React, { useEffect } from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Button } from "./ui/Button";
import { useFieldArray } from "react-hook-form";

const FormMultiInput = ({ label, name, register, errors, control }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });
  const handleAddSubtask = () => {
    append(); // Append a new empty subtask
  };

  const handleRemoveSubtask = (index) => {
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
                defaultValue={item ? item?.subTaskDescription : ""}
                render={() => {
                  return (
                    <React.Fragment>
                      <Input
                        className={`${
                          errors[name]
                            ? "border-red-500 focus:border-red-500 focus:outline-none"
                            : "focus:outline-main-purple"
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
              onClick={() => handleRemoveSubtask(index)}>
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
        className="text-main-purple w-full rounded-full bg-[#635FC7] bg-opacity-10 hover:bg-opacity-25 cursor-pointer"
        type="button"
        onClick={handleAddSubtask}>
        + Add New Subtask
      </Button>
    </div>
  );
};

export default FormMultiInput;
