import React, { useState, useRef, useEffect } from 'react';
import { BsFillGearFill, ImExit } from '../../../assets/IconImports';
import Avatar from '../../../assets/avatar.png';
import DropdownItem from '../Dropdown Item/Dropdown Item';
import { classNames, navs } from '../../../assets/data';

const ProfileDropdown: React.FC = () => {

    const dropDownMenuRef = useRef<HTMLDivElement>(null);
    const [isMenuVisible, setMenuVisible] = useState(false);

    useEffect(() => {

        const handler = (e: MouseEvent) => {
            if (!dropDownMenuRef.current?.contains(e.target as Node)) {
                setMenuVisible(false);
            }

        }

        document.addEventListener("mousedown", handler);

        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    const handleMenu = () => {
        setMenuVisible(prevMenuVisible => !prevMenuVisible);
    };

    const dropdownStyle: React.CSSProperties = {
        visibility: isMenuVisible ? 'visible' : 'hidden',
        transform: isMenuVisible ? 'translateY(0)' : 'translateY(2rem)',
        opacity: isMenuVisible ? '1' : '0',
    };

    return (
        /* Profile Button & Dropdown */
        <div className="avatar" ref={dropDownMenuRef}>
            <button type="button" className="btn btn-primary dropdown-toggle d-flex" data-bs-toggle="dropdown" onClick={handleMenu}>
                <a className="navbar-brand" href="#">
                    <img src={Avatar} alt="Avatar Logo" className="rounded-pill" />
                </a>
                <div className='avatar-name'> John Doe </div>
            </button>
            <ul className="dropdown-menu" style={dropdownStyle} id="menu2">
                <li><h5 className="dropdown-header text-white">Profile</h5></li>
                <li className="dropdown-divider text-white"></li>
                <DropdownItem
                    liStyle={classNames.liDropdown}
                    liDivStyle1={classNames.liDivDropdown}
                    icon={<BsFillGearFill className={`classNames.dAsideAnchorDivIcon text-success`} />}
                    renderDiv={false}
                    liAStyle={classNames.liADropdown}
                    link="#"
                    linkText={navs.settings}
                />
                <li className="dropdown-divider"></li>
                <DropdownItem
                    liStyle={classNames.liDropdown}
                    liDivStyle1={classNames.liDivDropdown}
                    icon={<ImExit className={`classNames.dAsideAnchorDivIcon text-danger`} />}
                    renderDiv={false}
                    liAStyle={classNames.liADropdown}
                    link="#"
                    linkText={navs.logout}
                />
            </ul>
        </div>
    );
};

export default ProfileDropdown;
