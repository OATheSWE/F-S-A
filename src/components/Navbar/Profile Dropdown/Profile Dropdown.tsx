// Import necessary React components, hooks, and Firebase related functionalities
import React, { useState, useRef, useEffect } from 'react';
import { IconImports, ImageCollection } from '../../../assets';
import DropdownItem from '../Dropdown Item/Dropdown Item';
import { classNames, navs } from '../../../Data/data';
import { useAuth } from "../../../AuthContext";
import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from "../../../firebase-config";

// Define the ProfileDropdown component as a functional component with React.FC (Functional Component) type
const ProfileDropdown: React.FC = () => {
    // Reference to the profile dropdown menu container
    const dropDownMenuRef = useRef<HTMLDivElement>(null);
    // State to manage the visibility of the profile dropdown menu
    const [isMenuVisible, setMenuVisible] = useState(false);
    // Authentication context to access the logout function and user information
    const { logout } = useAuth();
    const auth = useAuth();
    // State to store the user's name
    const [userName, setUserName] = useState("User");

    // Effect to fetch user information from the database on component mount
    useEffect(() => {
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

    }, [auth.currentUser?.uid]); // Empty dependency array means this effect runs once on component mount

    // Effect to close the dropdown when clicking outside of it
    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if (dropDownMenuRef.current?.contains(e.target as Node) || !dropDownMenuRef.current?.contains(e.target as Node)) {
                setMenuVisible(false);
            }
        };

        // Add event listener for mousedown
        document.addEventListener("mousedown", handler);

        // Clean up the event listener when the component is unmounted
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    // Function to toggle the visibility of the profile dropdown menu
    const handleMenu = () => {
        setMenuVisible(prevMenuVisible => !prevMenuVisible);
    };

    // Inline styles for controlling the visibility, transform, and opacity of the profile dropdown menu
    const dropdownStyle: React.CSSProperties = {
        visibility: isMenuVisible ? 'visible' : 'hidden',
        transform: isMenuVisible ? 'translateY(0)' : 'translateY(2rem)',
        opacity: isMenuVisible ? '1' : '0',
    };

    // Render the ProfileDropdown component
    return (
        /* Profile Button & Dropdown */
        <div className="avatar" ref={dropDownMenuRef}>
            {/* Profile button with avatar image and user name */}
            <button type="button" className="btn btn-primary dropdown-toggle d-flex" data-bs-toggle="dropdown" onClick={handleMenu}>
                <a className="navbar-brand" href="#">
                    <img src={ImageCollection.avatar} alt="Avatar Logo" className="rounded-pill" />
                </a>
                <div className='avatar-name'>{userName}</div>
            </button>
            {/* Dropdown menu for profile with inline style */}
            <ul className="dropdown-menu" style={dropdownStyle} id="menu2">
                {/* Header for the user's profile */}
                <li><h5 className="dropdown-header text-white">{`${userName}'s Profile`}</h5></li>
                <li className="dropdown-divider text-white"></li>
                {/* DropdownItem component for settings */}
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
                {/* DropdownItem component for logout */}
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

// Export the ProfileDropdown component to make it available for use in other files
export default ProfileDropdown;
