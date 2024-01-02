// Import necessary React components and hooks
import React, { useState } from 'react';
import { IconImports } from '../../../assets';
import AsideItem from '../Aside Item/Aside Item';
import { classNames, navs } from '../../../Data/data';
import { useAuth } from "../../../AuthContext";

// Define the DesktopAside component as a functional component with React.FC (Functional Component) type
const DesktopAside: React.FC = () => {
    // State to manage the sidebar expansion state
    const [isExpanded, setExpanded] = useState(false);
    
    // Custom hook to access the logout function from the AuthContext
    const { logout } = useAuth();

    // Function to toggle the sidebar expansion state
    const expandSidebar = () => {
        setExpanded(!isExpanded);
    };

    // Inline styles for controlling the width and padding of the sidebar
    const asideStyle2: React.CSSProperties = {
        width: isExpanded ? '250px' : '70px',
        paddingRight: isExpanded ? '20px' : '0px',
    };

    // Inline styles for controlling the opacity of the sidebar items
    const asideStyle3: React.CSSProperties = {
        opacity: isExpanded ? '1' : '0',
    };

    // Render the DesktopAside component
    return (
        /* Sidebar Button & DesktopSidebar */
        <div className="nav-sidebar">
            {/* Button to toggle sidebar expansion */}
            <button className="navbar-toggler" type="button" onClick={expandSidebar}>
                <IconImports.HiBars3BottomLeft className="icon-bars" id="bars1" />
            </button>
            {/* Main sidebar container */}
            <aside>
                <div className="desktop-aside" style={asideStyle2}>
                    {/* AsideItem components representing different navigation links */}
                    <AsideItem 
                        link="/" 
                        anchor={classNames.dAsideAnchor} 
                        div={classNames.dAsideAnchorDiv} 
                        icon={<IconImports.TbReport className={`classNames.dAsideAnchorDivIcon text-success`} />}
                        spanStyle={asideStyle3}
                        span={navs.report}
                    />
                    <AsideItem 
                        link="/students" 
                        anchor={classNames.dAsideAnchor} 
                        div={classNames.dAsideAnchorDiv} 
                        icon={<IconImports.SlPeople className={`classNames.dAsideAnchorDivIcon text-warning`} />}
                        spanStyle={asideStyle3}
                        span={navs.students}
                    />
                    <AsideItem 
                        link="/" 
                        anchor={classNames.dAsideAnchor} 
                        div={classNames.dAsideAnchorDiv} 
                        icon={<IconImports.ImExit className={`classNames.dAsideAnchorDivIcon text-danger`} />}
                        spanStyle={asideStyle3}
                        span={navs.logout}
                        onClick={logout}
                    />
                    <AsideItem 
                        link="/submit-report"
                        anchor={classNames.dAsideAnchor} 
                        div={classNames.dAsideAnchorDiv} 
                        icon={<IconImports.BsSend className={classNames.dAsideAnchorDivIcon} />}
                        spanStyle={asideStyle3}
                        span={navs.submit}
                    />
                </div>
            </aside>
        </div>
    );
};

// Export the DesktopAside component to make it available for use in other files
export default DesktopAside;
