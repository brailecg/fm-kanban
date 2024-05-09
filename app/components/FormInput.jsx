import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
const FormInput = ({ label, name, register, errors, value }) => {
  return (
    <div className="space-y-2">
      <Label name={label} />
      <Input
        value={value}
        placeholder="e.g. Take coffee break"
        {...register(name, {
          required: "Title is required",
        })}
        className={
          errors[name]
            ? "border-red-500 focus:border-red-500 focus:outline-none"
            : "focus:outline-main-purple"
        }
      />
      <ErrorMessage
        name={name}
        errors={errors}
        render={({ message }) => (
          <p className="text-red-500 text-xs">{message}</p>
        )}
      />
    </div>
  );
};

export default FormInput;
