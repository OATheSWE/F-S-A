import React from 'react';

interface ToastProps {
  show: boolean;
  onConfirm: () => void;
  onClose: () => void;
  message: string;
}

const DialogBox: React.FC<ToastProps> = ({ show, onConfirm, onClose, message }) => {
  return (
    <div className="toast-container">
      <div className={`toast d-flex justify-content-center align-items-center text-black ${show ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
        <div className="toast-body">
          {message}
          <div className="mt-2 pt-2 border-top d-flex justify-content-around">
            <button type="button" className="btn btn-primary btn-sm px-3 text-xl" onClick={onConfirm}>
              Yes
            </button>
            <button type="button" className="btn btn-secondary btn-sm px-3" onClick={onClose}>
              No
            </button>
          </div>
        </div>
      </div>
      {show && (
        <div className="overlay" />
      )}
    </div>


  );
};

export default DialogBox;
