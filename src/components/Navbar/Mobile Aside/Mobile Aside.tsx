import React, { useState } from 'react';
import { TbReport, SlPeople, BsSend, HiBars3BottomRight } from '../../../assets/IconImports';
import AsideItem from '../Aside Item/Aside Item';
import { classNames, navs } from '../../../assets/data';
import { Link } from 'react-router-dom';

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
            <AsideItem
              link="#"
              anchor={classNames.mAsideAnchor}
              icon={<TbReport className={classNames.mAsideAnchorIcon} />}
              span={navs.report}
            />
            <AsideItem
              link="/students"
              anchor={classNames.mAsideAnchor}
              icon={<SlPeople className={classNames.mAsideAnchorIcon} />}
              span={navs.students}
            />
            <AsideItem
              link="#"
              anchor={`d-flex flex-column align-items-center text-decoration-none link`}
              icon={<BsSend className={classNames.mAsideAnchorIcon} />}
              span={navs.submit}
            />
          </div>
        </div>
      </aside>
    </div>
  );
};

export default MobileAside;
