import React, { useEffect } from 'react';

interface ToastProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

const Toast: React.FC<ToastProps> = ({ show, onClose, message }) => {

  useEffect(() => {
    if (show) {
      // Set a timeout to automatically close the toast after 5 seconds (5000 milliseconds)
      const timeoutId = setTimeout(() => {
        onClose();
      }, 5000);

      // Clear the timeout if the toast is closed manually before the timeout expires
      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [show, onClose]);

  return (
    <div className="toast-container2">
      <div className={`toast d-flex justify-content-center align-items-center text-white  ${show ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true" style={{ background: '#0090e7' }}>
        <div className="d-flex">
          <div className="toast-body">
            {message}
          </div>
          <button type="button" className="btn-close btn-close-white me-2 m-auto"  onClick={onClose}></button>
        </div>
      </div>
    </div>

  );
};

export default Toast;
