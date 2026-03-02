import { useEffect } from "react";

interface ToastProps{
  message: string;
  type: "success" | "danger" | "warning";
  onClose: () => void;  
}

const Toast = ({message, type, onClose} : ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() =>{
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div
      className="position-fixed top-0 end-0 p-3"
      style={{ zIndex: 9999 }}
    >
      <div className={`toast show align-items-center text-white bg-${type} border-0`}>
        <div className="d-flex">
          <div className="toast-body">
            {type === "success" ? "✅" : "⚠️"} {message}
          </div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            onClick={onClose}
          />
        </div>
      </div>
    </div>
  )
}

export default Toast;