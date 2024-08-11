import { toast } from "react-hot-toast";
import { Check, X, Info, AlertTriangle } from "lucide-react";

const toastStyles = {
  base: "flex items-center justify-between w-full max-w-xs p-4 space-x-4 text-gray-500 rounded-lg shadow dark:text-gray-400 dark:bg-gray-800",
  success: "bg-blue-500 text-white",
  error: "bg-red-500 text-white",
  info: "bg-[#2AAA94] text-white",
  warning: "bg-yellow-300 text-white",
};

const iconStyles = {
  base: "w-5 h-5",
  success: "bg-white text-blue-700 rounded-full p-0.5",
  error: "bg-white text-red-700 rounded-full p-0.5",
  info: "bg-white text-[#2AAA94] rounded-full p-0.5",
  warning: "bg-white text-yellow-700 rounded-full p-0.5",
};

const CustomToast = ({ message, type, onClick }) => {
  let toastClass = `${toastStyles.base} ${toastStyles[type]}`;
  let iconClass = `${iconStyles.base} ${iconStyles[type]}`;
  let IconComponent;

  switch (type) {
    case "success":
      IconComponent = Check;
      break;
    case "error":
      IconComponent = X;
      break;
    case "info":
      IconComponent = Info;
      break;
    case "warning":
      IconComponent = AlertTriangle;
      break;
    default:
      IconComponent = Info;
      break;
  }

  return (
    <div className={toastClass}>
      <div className="flex items-center space-x-2">
        <button onClick={onClick}>
          <IconComponent className={iconClass} />
        </button>
        <span>{message}</span>
      </div>
    </div>
  );
};

export const showToast = (message, type = "info") => {
  toast.custom((t) => <CustomToast message={message} type={type}
    onClick={() => toast.dismiss(t.id)}
  />);
};

