// Import necessary React components and hooks
import React, { useState } from 'react';
import { IconImports } from '../../../assets';
import AsideItem from '../Aside Item/Aside Item';
import { classNames, navs } from '../../../Data/data';

// Define the MobileAside component as a functional component with React.FC (Functional Component) type
const MobileAside: React.FC = () => {
  // State to manage the visibility of the mobile aside
  const [isAsideVisible, setAsideVisible] = useState(false);

  // Function to toggle the visibility of the mobile aside
  const handleAside = () => {
    setAsideVisible(!isAsideVisible);
  };

  // Inline styles for controlling the visibility, transform, and opacity of the mobile aside
  const asideStyle: React.CSSProperties = {
    visibility: isAsideVisible ? 'hidden' : 'visible',
    transform: isAsideVisible ? 'translateY(60px)' : 'translateY(0px)',
    opacity: isAsideVisible ? '0' : '1',
  };

  // Render the MobileAside component
  return (
    /* Bottombar Button & MobileBottombar */
    <div className="nav-sidebar">
      {/* Button to toggle mobile aside visibility */}
      <button className="navbar-toggler" type="button" onClick={handleAside}>
        <IconImports.HiBars3BottomRight className="icon-bars" id="bars2" />
      </button>
      {/* Main aside container */}
      <aside>
        <div className="mobile-aside" style={asideStyle}>
          {/* Container for mobile aside items */}
          <div className="d-flex justify-content-around">
            {/* AsideItem components representing different navigation links */}
            <AsideItem
              link="/"
              anchor={classNames.mAsideAnchor}
              icon={<IconImports.TbReport className={classNames.mAsideAnchorIcon} />}
              span={navs.report}
            />
            <AsideItem
              link="/students"
              anchor={classNames.mAsideAnchor}
              icon={<IconImports.SlPeople className={classNames.mAsideAnchorIcon} />}
              span={navs.students}
            />
            <AsideItem
              link="/submit-report"
              anchor={classNames.mAsideAnchor}
              icon={<IconImports.BsSend className={classNames.mAsideAnchorIcon} />}
              span={navs.submit}
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

// Export the MobileAside component to make it available for use in other files
export default MobileAside;
