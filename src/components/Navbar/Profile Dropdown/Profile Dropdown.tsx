import React, { useState, useRef, useEffect } from 'react';
import { IconImports, ImageCollection } from '../../../assets';
import DropdownItem from '../Dropdown Item/Dropdown Item';
import { classNames, navs } from '../../../Data/data';
import { useAuth } from "../../../AuthContext"; 
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from "../../../firebase-config";

const ProfileDropdown: React.FC = () => {

    const dropDownMenuRef = useRef<HTMLDivElement>(null);
    const [isMenuVisible, setMenuVisible] = useState(false);
    const { logout } = useAuth();
    const auth  = useAuth();
    const [userName, setUserName] = useState("");
 

    useEffect(() => {
        // Fetch user info from the database here and populate the state variables
        const fetchName = async () => {
          try {
            const userCollectionRef = collection(db, auth.currentUser?.uid);
           
            const userDocRef = doc(userCollectionRef, "UserInfo");
    
            const userDocSnapshot = await getDoc(userDocRef);
    
            if (userDocSnapshot.exists()) {
              const userData = userDocSnapshot.data();
              setUserName(userData.userName);
            }
          } catch (error) {
            console.error("Error fetching name:", error);
          }
        };
    
        fetchName();
    
        
      }, []); // Empty dependency array means this effect runs once on component mount

    useEffect(() => {

        const handler = (e: MouseEvent) => {
            if (dropDownMenuRef.current?.contains(e.target as Node) || !dropDownMenuRef.current?.contains(e.target as Node)) {
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
                    <img src={ImageCollection.avatar} alt="Avatar Logo" className="rounded-pill" />
                </a>
                <div className='avatar-name'>{userName}</div>
            </button>
            <ul className="dropdown-menu" style={dropdownStyle} id="menu2">
                <li><h5 className="dropdown-header text-white">{`${userName}'s Profile`}</h5></li>
                <li className="dropdown-divider text-white"></li>
                <DropdownItem
                    liStyle={classNames.liDropdown}
                    liDivStyle1={classNames.liDivDropdown}
                    icon={<IconImports.BsFillGearFill className={`classNames.dAsideAnchorDivIcon text-success`} />}
                    renderDiv={false}
                    liAStyle={classNames.liADropdown}
                    link="/settings"
                    linkText={navs.settings}
                />
                <li className="dropdown-divider"></li>
                <DropdownItem
                    liStyle={classNames.liDropdown}
                    liDivStyle1={classNames.liDivDropdown}
                    icon={<IconImports.ImExit className={`classNames.dAsideAnchorDivIcon text-danger`} />}
                    renderDiv={false}
                    liAStyle={classNames.liADropdown}
                    link="/"
                    linkText={navs.logout}
                    onClick={logout}
                />
            </ul>
        </div>
    );
};

export default ProfileDropdown;
