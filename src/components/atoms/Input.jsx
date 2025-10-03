import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef(
  ({ className, type = "text", error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 bg-white text-slate-900 border rounded-lg transition-all duration-200",
          "placeholder:text-slate-400",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          error
            ? "border-danger focus:ring-danger"
            : "border-slate-300 hover:border-slate-400",
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;