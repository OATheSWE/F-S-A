// Import necessary React components
import React, { useEffect } from 'react';

// Define the ToastProps interface to specify the props for the Toast component
interface ToastProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

// Define the Toast component as a functional component with React.FC (Functional Component) type
const Toast: React.FC<ToastProps> = ({ show, onClose, message }) => {
  // Use useEffect to handle the automatic closing of the toast after 5 seconds
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

  // Render the Toast component
  return (
    <div className="toast-container2">
      {/* Toast container with dynamic class for show/hide */}
      <div className={`toast d-flex justify-content-center align-items-center text-white  ${show ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true" style={{ background: '#0090e7' }}>
        <div className="d-flex">
          {/* Toast body displaying the message */}
          <div className="toast-body">
            {message}
          </div>
          {/* Button to manually close the toast */}
          <button type="button" className="btn-close btn-close-white me-2 m-auto" onClick={onClose}></button>
        </div>
      </div>
    </div>
  );
};

// Export the Toast component to make it available for use in other files
export default Toast;
