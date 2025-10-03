import { format, isPast, isToday, isTomorrow } from "date-fns";
import ApperIcon from "@/components/ApperIcon";

const DueDateBadge = ({ dueDate }) => {
  if (!dueDate) return null;

  const date = new Date(dueDate);
  const isOverdue = isPast(date) && !isToday(date);
  const isDueToday = isToday(date);
  const isDueTomorrow = isTomorrow(date);

  let label = format(date, "MMM d");
  if (isDueToday) label = "Today";
  if (isDueTomorrow) label = "Tomorrow";

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
        isOverdue
          ? "bg-red-50 text-danger"
          : isDueToday
          ? "bg-amber-50 text-warning"
          : "bg-slate-100 text-slate-600"
      }`}
    >
      <ApperIcon
        name="Calendar"
        size={12}
        className={isOverdue ? "text-danger" : ""}
      />
      <span>{label}</span>
    </div>
  );
};

export default DueDateBadge;