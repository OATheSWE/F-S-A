// Import necessary React components
import React from 'react';
import MobileAside from './Mobile Aside/Mobile Aside';
import DesktopAside from './Desktop Aside/Desktop Aside';
import ProfileDropdown from './Profile Dropdown/Profile Dropdown';
import NotificationDropdown from './Notification Dropdown/Notification Dropdown';

// Define the Navbar component as a functional component with React.FC (Functional Component) type
const Navbar: React.FC = () => {
  // Render the Navbar component
  return (
    <nav className="navbar navbar-dark">
      <div className="container-fluid">
        <div className="d-flex flex-row">
          {/* Render the DesktopAside component */}
          <DesktopAside />
          {/* Navbar brand/logo */}
          <a className="navbar-brand name" href="#">F-S-A</a>
        </div>
        <div className="d-flex">
          {/* Render the NotificationDropdown and ProfileDropdown components */}
          <NotificationDropdown />
          <ProfileDropdown />
          {/* Render the MobileAside component */}
          <MobileAside />
        </div>
      </div>
    </nav>
  );
};

// Export the Navbar component to make it available for use in other files
export default Navbar;
