import React, { useState, useRef, useEffect } from 'react';
import { FaBell, TbReport, BsFillGearFill, SlPeople } from '../../../assets/IconImports';

const NotificationDropdown: React.FC = () => {

    const notifyRef = useRef<HTMLDivElement>(null);
    const [isNotify, setNotify] = useState(false);

    useEffect(() => {

        const handler = (e: MouseEvent) => {
            if (!notifyRef.current?.contains(e.target as Node)) {
                setNotify(false);
              }

        }

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const handleNotify = () => {
        setNotify(!isNotify);
    };

    const notifyStyle: React.CSSProperties = {
        visibility: isNotify ? 'visible' : 'hidden',
        transform: isNotify ? 'translateY(0)' : 'translateY(2rem)',
        opacity: isNotify ? '1' : '0',
      };

    return (
        /* Notification Button & Dropdown */
        <div className="dropdown notify" ref={notifyRef}>
        <a href="#" className='bell-container dropdown-toggle' onClick={handleNotify}>
          <FaBell className="icon-bell" />
          <span className="bg-danger count"></span>
        </a>
        <ul className="dropdown-menu" style={notifyStyle} id="menu1">
          <li><h5 className="dropdown-header text-white">Recent Notifications</h5></li>
          <li className="dropdown-divider text-white"></li>
          <li className="d-flex position-relative">
            <div className="preview-icon bg-dark rounded-circle">
              <TbReport className="icon-profile text-success" />
            </div>
            <div className="preview-item-content">
              <h6 className="text-white mb-1">Report</h6>
              <p className="mb-0 small-text">Your feild service report</p>
            </div>
          </li>
          <li className="dropdown-divider"></li>
          <li className="d-flex position-relative">
            <div className="preview-icon bg-dark rounded-circle">
              <BsFillGearFill className="icon-profile text-danger" />
            </div>
            <div className="preview-item-content">
              <h6 className="text-white mb-1">Settings</h6>
              <p className="mb-0 small-text">Update mobile number</p>
            </div>
          </li>
          <li className="dropdown-divider"></li>
          <li className="d-flex position-relative">
            <div className="preview-icon bg-dark rounded-circle">
              <SlPeople className="icon-profile text-warning" />
            </div>
            <div className="preview-item-content">
              <h6 className="text-white mb-1">Students</h6>
              <p className="mb-0 small-text">You haven't studied with john in a while</p>
            </div>
          </li>
        </ul>
      </div>
    );
};

export default NotificationDropdown;
