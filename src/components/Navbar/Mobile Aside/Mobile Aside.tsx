import React, { useState } from 'react';
import { IconImports } from '../../../assets';
import AsideItem from '../Aside Item/Aside Item';
import { classNames, navs } from '../../../Data/data';

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
        <IconImports.HiBars3BottomRight className="icon-bars" id="bars2" />
      </button>
      <aside>
        <div className="mobile-aside" style={asideStyle}>
          <div className="d-flex justify-content-around">
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

export default MobileAside;
