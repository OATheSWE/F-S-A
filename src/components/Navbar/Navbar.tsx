import React from 'react';
import MobileAside from './Mobile Aside/Mobile Aside';
import DesktopAside from './Desktop Aside/Desktop Aside';
import ProfileDropdown from './Profile Dropdown/Profile Dropdown';
import NotificationDropdown from './Notification Dropdown/Notification Dropdown';
import MobileSearch from './Mobile Search/Mobile Search';
import DesktopSearch from './Desktop Search/Desktop Search';






const Navbar: React.FC = () => {

  return (

    <nav className="navbar navbar-dark">
      <div className="container-fluid">
        <div className="d-flex flex-row">
          <DesktopAside />
          <a className="navbar-brand name" href="#">F-S-A</a>
        </div>
        <DesktopSearch />
        <div className="d-flex">
          <MobileSearch />
          <NotificationDropdown />
          <ProfileDropdown />
          <MobileAside />
        </div>
      </div>
    </nav>


  );
};

export default Navbar;













