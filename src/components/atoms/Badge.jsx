import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(
  ({ className, variant = "default", children, ...props }, ref) => {
    const variants = {
      default: "bg-slate-100 text-slate-700",
      high: "bg-gradient-to-r from-danger to-red-600 text-white",
      medium: "bg-gradient-to-r from-warning to-amber-600 text-white",
      low: "bg-gradient-to-r from-success to-green-600 text-white",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold",
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";

export default Badge;