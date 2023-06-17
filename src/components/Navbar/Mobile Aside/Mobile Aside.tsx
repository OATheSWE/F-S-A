import React, { useState } from 'react';
import { TbReport, SlPeople, BsSend, HiBars3BottomRight } from '../../../assets/IconImports';

const MobileAside: React.FC = () => {
  const [isAsideVisible, setAsideVisible] = useState(false);

  const handleAside = () => {
    setAsideVisible(!isAsideVisible);
  };

  const asideStyle: React.CSSProperties = {
    visibility: isAsideVisible ? 'hidden' : 'visible',
    transform: isAsideVisible ? 'translateY(60px)' : 'translateY(0px)',
    opacity: isAsideVisible ? '0' : '1',
  };

  return (
    /* Bottombar Button & MobileBottombar */
    <div className="nav-sidebar">
      <button className="navbar-toggler" type="button" onClick={handleAside}>
        <HiBars3BottomRight className="icon-bars" id="bars2" />
      </button>
      <aside>
        <div className="mobile-aside" style={asideStyle}>
          <div className="d-flex justify-content-around">
            <a href="#" className="d-flex flex-column align-items-center text-decoration-none link text-white">
              <TbReport className="icon" />
              <span>Report</span>
            </a>
            <a href="#" className="d-flex flex-column align-items-center text-decoration-none link text-white">
              <SlPeople className="icon" />
              <span>Students</span>
            </a>
            <a href="#" className="d-flex flex-column align-items-center text-decoration-none link">
              <BsSend className="icon" />
              <span>Submit</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MobileAside;
