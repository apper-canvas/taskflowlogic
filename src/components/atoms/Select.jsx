import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Select = forwardRef(
  ({ className, children, error, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          "w-full px-4 py-2.5 bg-white text-slate-900 border rounded-lg transition-all duration-200 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
          error
            ? "border-danger focus:ring-danger"
            : "border-slate-300 hover:border-slate-400",
          className
        )}
        {...props}
      >
        {children}
      </select>
    );
  }
);

Select.displayName = "Select";

export default Select;