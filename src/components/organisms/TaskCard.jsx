import { motion } from "framer-motion";
import { format } from "date-fns";
import Checkbox from "@/components/atoms/Checkbox";
import Button from "@/components/atoms/Button";
import PriorityBadge from "@/components/molecules/PriorityBadge";
import DueDateBadge from "@/components/molecules/DueDateBadge";
import ApperIcon from "@/components/ApperIcon";

const TaskCard = ({ task, onToggleComplete, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      whileHover={{ y: -2, boxShadow: "0 4px 12px rgba(0,0,0,0.08)" }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-xl p-6 shadow-sm border border-slate-100 ${
        task.completed ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <div className="pt-1">
          <Checkbox
            checked={task.completed}
            onChange={() => onToggleComplete(task.Id)}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3
            className={`text-lg font-semibold mb-2 ${
              task.completed
                ? "line-through text-slate-500"
                : "text-slate-900"
            }`}
          >
            {task.title}
          </h3>

          {task.description && (
            <p className="text-slate-600 text-sm mb-3 leading-relaxed">
              {task.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-2 mb-3">
            <PriorityBadge priority={task.priority} />
            {task.dueDate && <DueDateBadge dueDate={task.dueDate} />}
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <ApperIcon name="Clock" size={14} />
              <span>Created {format(new Date(task.createdAt), "MMM d")}</span>
            </div>
            {task.completed && task.completedAt && (
              <div className="flex items-center gap-1">
                <ApperIcon name="CheckCircle2" size={14} />
                <span>
                  Completed {format(new Date(task.completedAt), "MMM d")}
                </span>
              </div>
            )}
          </div>
        </div>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(task.Id)}
          className="text-slate-400 hover:text-danger"
        >
          <ApperIcon name="Trash2" size={18} />
        </Button>
      </div>
    </motion.div>
  );
};

export default TaskCard;