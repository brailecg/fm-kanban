import * as React from "react";
import { cn } from "@/app/lib/utils";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn(
      "text-xs font-semibold text-main-medium-grey leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}>
    {props.name}
  </label>
));
Label.displayName = "Label";

export { Label };
