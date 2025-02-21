import { motion } from "framer-motion";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

const Toast = ({ message, type}) => {
  const icons = {
    success: <CheckCircle className="text-green-500 w-6 h-6" />,
    error: <XCircle className="text-red-500 w-6 h-6" />,
    info: <Info className="text-blue-500 w-6 h-6" />,
    warning: <AlertTriangle className="text-yellow-500 w-6 h-6" />,
  };

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`fixed top-5 right-5 px-6 py-3 flex items-center gap-3 rounded-lg shadow-lg text-white ${
        type === "success" ? "bg-green-600" :
        type === "error" ? "bg-red-600" :
        type === "warning" ? "bg-yellow-600" :
        "bg-blue-600"
      }`}
    >
      {icons[type]}
      <span>{message}</span>
    </motion.div>
  );
};

export default Toast;

