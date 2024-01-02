// Import the React library for creating React components
import React from 'react';

// Define the props interface for the DialogBox component
interface ToastProps {
  show: boolean; // Flag to determine whether the toast is visible or hidden
  onConfirm: () => void; // Callback function triggered on confirm button click
  onClose: () => void; // Callback function triggered on close button click
  message: string; // Message content displayed in the toast
}

// Define the DialogBox component as a functional component with React.FC (Functional Component) type
const DialogBox: React.FC<ToastProps> = ({ show, onConfirm, onClose, message }) => {
  // Render the toast container and its content
  return (
    <div className="toast-container">
      <div className={`toast d-flex justify-content-center align-items-center text-black ${show ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-body">
          {message} {/* Display the message content inside the toast body */}
          <div className="mt-2 pt-2 border-top d-flex justify-content-around">
            {/* Confirm button triggering the onConfirm callback function */}
            <button type="button" className="btn btn-primary btn-sm px-3 text-xl" onClick={onConfirm}>
              Yes
            </button>
            {/* Close button triggering the onClose callback function */}
            <button type="button" className="btn btn-secondary btn-sm px-3" onClick={onClose}>
              No
            </button>
          </div>
        </div>
      </div>
      {/* Overlay div displayed when the toast is visible */}
      {show && (
        <div className="overlay" />
      )}
    </div>
  );
};

// Export the DialogBox component to make it available for use in other files
export default DialogBox;
