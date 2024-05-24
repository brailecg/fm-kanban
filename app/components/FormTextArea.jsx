import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";

const FormTextArea = ({ label, name, register, errors, control, value }) => {
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
              <Textarea
                placeholder="e.g. It's always good to take a break. This 15 minute break will 
  recharge the batteries a little."
                {...register(name, {
                  required: "Description is required",
                })}
                className={`${
                  errors[name]
                    ? "border-red-500 focus:border-red-500 focus:outline-none"
                    : "focus:outline-main-purple"
                } dark:bg-main-dark-grey dark:text-white`}
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

export default FormTextArea;
