// Import necessary React components, hooks, and data
import React, { useState, useRef, useEffect } from 'react';
import { IconImports } from '../../../assets';
import DropdownItem from '../Dropdown Item/Dropdown Item';
import { classNames, navs, notifications } from '../../../Data/data';

// Define the NotificationDropdown component as a functional component with React.FC (Functional Component) type
const NotificationDropdown: React.FC = () => {
  // Reference to the notification dropdown container
  const notifyRef = useRef<HTMLDivElement>(null);
  // State to manage the visibility of the notification dropdown
  const [isNotify, setNotify] = useState(false);

  // Effect to close the dropdown when clicking outside of it
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!notifyRef.current?.contains(e.target as Node)) {
        setNotify(false);
      }
    };

    // Add event listener for mousedown
    document.addEventListener("mousedown", handler);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // Function to toggle the visibility of the notification dropdown
  const handleNotify = () => {
    setNotify(!isNotify);
  };

  // Inline styles for controlling the visibility, transform, and opacity of the notification dropdown
  const notifyStyle: React.CSSProperties = {
    visibility: isNotify ? 'visible' : 'hidden',
    transform: isNotify ? 'translateY(0)' : 'translateY(2rem)',
    opacity: isNotify ? '1' : '0',
  };

  // Render the NotificationDropdown component
  return (
    /* Notification Button & Dropdown */
    <div className="dropdown notify" ref={notifyRef}>
      {/* Notification button with icon and count */}
      <a href="#" className='bell-container dropdown-toggle' onClick={handleNotify}>
        <IconImports.FaBell className="icon-bell" />
        <span className="bg-danger count"></span>
      </a>
      {/* Dropdown menu for notifications with inline style */}
      <ul className="dropdown-menu" style={notifyStyle} id="menu1">
        {/* Header for recent notifications */}
        <li><h5 className="dropdown-header text-white">Recent Notifications</h5></li>
        <li className="dropdown-divider text-white"></li>
        {/* DropdownItem component for report notification */}
        <DropdownItem
          liStyle={classNames.liDropdown}
          liDivStyle1={classNames.liDivDropdown}
          icon={<IconImports.TbReport className={`classNames.dAsideAnchorDivIcon text-success`} />}
          renderDiv={true}
          liDivStyle2={classNames.liDiv2Dropdown}
          h6={classNames.liDiv2h6Dropdown}
          h6Content={navs.report}
          p={classNames.liDiv2PDropdown}
          pContent={notifications.report}
        />
        <li className="dropdown-divider"></li>
        {/* DropdownItem component for settings notification */}
        <DropdownItem
          liStyle={classNames.liDropdown}
          liDivStyle1={classNames.liDivDropdown}
          icon={<IconImports.BsFillGearFill className={`classNames.dAsideAnchorDivIcon text-danger`} />}
          renderDiv={true}
          liDivStyle2={classNames.liDiv2Dropdown}
          h6={classNames.liDiv2h6Dropdown}
          h6Content={navs.settings}
          p={classNames.liDiv2PDropdown}
          pContent={notifications.settings}
        />
        <li className="dropdown-divider"></li>
        {/* DropdownItem component for students notification */}
        <DropdownItem
          liStyle={classNames.liDropdown}
          liDivStyle1={classNames.liDivDropdown}
          icon={<IconImports.SlPeople className={`classNames.dAsideAnchorDivIcon text-warning`} />}
          renderDiv={true}
          liDivStyle2={classNames.liDiv2Dropdown}
          h6={classNames.liDiv2h6Dropdown}
          h6Content={navs.students}
          p={classNames.liDiv2PDropdown}
          pContent={notifications.students}
        />
      </ul>
    </div>
  );
};

// Export the NotificationDropdown component to make it available for use in other files
export default NotificationDropdown;
