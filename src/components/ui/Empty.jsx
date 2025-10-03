import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";

const Empty = ({ title, message, icon = "Inbox", onAction, actionLabel }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center justify-center py-20 px-4"
    >
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-indigo-100 rounded-full p-8 mb-6">
        <ApperIcon name={icon} size={64} className="text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        {title || "No tasks yet"}
      </h3>
      <p className="text-slate-600 text-center mb-8 max-w-md">
        {message || "Create your first task to get started with organizing your work."}
      </p>
      {onAction && actionLabel && (
        <button
          onClick={onAction}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          <ApperIcon name="Plus" size={20} />
          {actionLabel}
        </button>
      )}
    </motion.div>
  );
};

export default Empty;