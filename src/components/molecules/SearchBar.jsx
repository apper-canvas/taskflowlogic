import { forwardRef } from "react";
import Input from "@/components/atoms/Input";
import ApperIcon from "@/components/ApperIcon";

const SearchBar = forwardRef(({ value, onChange, placeholder, ...props }, ref) => {
  return (
    <div className="relative">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <ApperIcon name="Search" size={20} className="text-slate-400" />
      </div>
      <Input
        ref={ref}
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder || "Search tasks..."}
        className="pl-11"
        {...props}
      />
    </div>
  );
});

SearchBar.displayName = "SearchBar";

export default SearchBar;