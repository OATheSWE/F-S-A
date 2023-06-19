import React, { useState, useRef, useEffect } from 'react';
import { FaBell, TbReport, BsFillGearFill, SlPeople } from '../../../assets/IconImports';
import DropdownItem from '../Dropdown Item/Dropdown Item';
import { classNames, navs, notifications } from '../../../assets/data';

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
          <DropdownItem
              liStyle={classNames.liDropdown}
              liDivStyle1={classNames.liDivDropdown}
              icon={<TbReport className={`classNames.dAsideAnchorDivIcon text-success`} />}
              renderDiv={true}
              liDivStyle2={classNames.liDiv2Dropdown}
              h6={classNames.liDiv2h6Dropdown}
              h6Content={navs.report}
              p={classNames.liDiv2PDropdown}
              pContent={notifications.report}
            />
          <li className="dropdown-divider"></li>
          <DropdownItem
              liStyle={classNames.liDropdown}
              liDivStyle1={classNames.liDivDropdown}
              icon={<BsFillGearFill className={`classNames.dAsideAnchorDivIcon text-danger`} />}
              renderDiv={true}
              liDivStyle2={classNames.liDiv2Dropdown}
              h6={classNames.liDiv2h6Dropdown}
              h6Content={navs.settings}
              p={classNames.liDiv2PDropdown}
              pContent={notifications.settings}
            />
          <li className="dropdown-divider"></li>
          <DropdownItem
              liStyle={classNames.liDropdown}
              liDivStyle1={classNames.liDivDropdown}
              icon={<SlPeople className={`classNames.dAsideAnchorDivIcon text-warning`} />}
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

export default NotificationDropdown;
