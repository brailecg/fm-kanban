import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
const FormInput = ({ label, name, register, errors, control, value }) => {
  return (
    <div className="space-y-2">
      <Label name={label} />
      <Controller
        name={name}
        control={control}
        defaultValue={value}
        render={() => {
          return (
            <React.Fragment>
              <Input
                placeholder="e.g. Take coffee break"
                {...register(name, {
                  required: "Title is required",
                })}
                className={`${
                  errors[name]
                    ? "border-red-500 focus:border-red-500 focus:outline-none"
                    : "focus:outline-main-purple"
                } dark:bg-main-dark-grey`}
              />
              <ErrorMessage
                name={name}
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
  );
};

export default FormInput;
