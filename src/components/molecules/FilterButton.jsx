import { cn } from "@/utils/cn";

const FilterButton = ({ active, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200",
        active
          ? "bg-gradient-to-r from-primary to-secondary text-white shadow-md"
          : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
      )}
    >
      {children}
    </button>
  );
};

export default FilterButton;