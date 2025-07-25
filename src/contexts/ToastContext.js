import { createContext, useState, useContext } from "react";
import SnackBar from "../components/SnackBar";

const ToastContext = createContext({});

// Declare a Component for toast
export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // Handle toast display
  function showHideToast(message) {
    setOpen(true);
    setMessage(message);
    setTimeout(() => {
      setOpen(false);
    }, 2500);
  }

  return (
    <ToastContext.Provider value={{ showHideToast }}>
      <SnackBar open={open} message={message} />
      {children}
    </ToastContext.Provider>
  );
};

// Define custom Hook to use Toast context
export const useToast = () => {
  return useContext(ToastContext);
};
