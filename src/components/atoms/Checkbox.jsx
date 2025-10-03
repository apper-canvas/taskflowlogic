import { forwardRef } from "react";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Checkbox = forwardRef(
  ({ className, checked, onChange, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={onChange}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "flex items-center justify-center w-6 h-6 rounded-md border-2 transition-all duration-200 cursor-pointer",
          checked
            ? "bg-gradient-to-br from-accent to-green-600 border-accent"
            : "bg-white border-slate-300 hover:border-primary",
          className
        )}
        {...props}
      >
        {checked && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <ApperIcon name="Check" size={16} className="text-white" />
          </motion.div>
        )}
      </motion.button>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;