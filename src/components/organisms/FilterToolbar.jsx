import { useState } from "react";
import SearchBar from "@/components/molecules/SearchBar";
import FilterButton from "@/components/molecules/FilterButton";
import Select from "@/components/atoms/Select";
import ApperIcon from "@/components/ApperIcon";

const FilterToolbar = ({ 
  searchQuery, 
  onSearchChange, 
  filter, 
  onFilterChange,
  sortBy,
  onSortChange
}) => {
  return (
    <div className="space-y-4 mb-6">
      <SearchBar
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
      />

      <div className="flex flex-col sm:flex-row gap-4 justify-between">
        <div className="flex gap-2 flex-wrap">
          <FilterButton
            active={filter === "all"}
            onClick={() => onFilterChange("all")}
          >
            All
          </FilterButton>
          <FilterButton
            active={filter === "active"}
            onClick={() => onFilterChange("active")}
          >
            Active
          </FilterButton>
          <FilterButton
            active={filter === "completed"}
            onClick={() => onFilterChange("completed")}
          >
            Completed
          </FilterButton>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <ApperIcon name="ArrowUpDown" size={16} />
            <span className="font-medium">Sort by:</span>
          </div>
          <Select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-auto min-w-[140px]"
          >
            <option value="createdAt">Created Date</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default FilterToolbar;