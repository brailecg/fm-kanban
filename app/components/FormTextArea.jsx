import React from "react";
import { ErrorMessage } from "@hookform/error-message";
import { Textarea } from "./ui/Textarea";
import { Label } from "./ui/Label";

const FormTextArea = ({ label, name, register, errors, value }) => {
  return (
    <div className="space-y-2">
      <Label name={label} />
      <Textarea
        value={value}
        placeholder="e.g. It's always good to take a break. This 15 minute break will 
  recharge the batteries a little."
        {...register(name, {
          required: "Description is required",
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

export default FormTextArea;
