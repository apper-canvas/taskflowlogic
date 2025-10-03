import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((item) => (
        <motion.div
          key={item}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-start gap-4">
            <div className="w-6 h-6 bg-gradient-to-br from-slate-200 to-slate-300 rounded animate-pulse" />
            <div className="flex-1 space-y-3">
              <div className="h-5 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-3/4 animate-pulse" />
              <div className="h-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded w-1/2 animate-pulse" />
              <div className="flex gap-2">
                <div className="h-6 w-16 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full animate-pulse" />
                <div className="h-6 w-24 bg-gradient-to-r from-slate-200 to-slate-300 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Loading;