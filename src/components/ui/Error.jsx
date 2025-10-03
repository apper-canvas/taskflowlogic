import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ message, onRetry }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-full p-6 mb-6">
        <ApperIcon name="AlertCircle" size={48} className="text-danger" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        Oops! Something went wrong
      </h3>
      <p className="text-slate-600 text-center mb-8 max-w-md">
        {message || "We encountered an error while loading your tasks. Please try again."}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="primary">
          <ApperIcon name="RefreshCw" size={20} className="mr-2" />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;