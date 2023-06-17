import React, { useState } from 'react';
import { TbReport, SlPeople, BsSend, HiBars3BottomLeft, ImExit } from '../../../assets/IconImports';

const DesktopAside: React.FC = () => {

    const [isExpanded, setExpanded] = useState(false);

    const expandSidebar = () => {
        setExpanded(!isExpanded);
    };

    const asideStyle2: React.CSSProperties = {
        width: isExpanded ? '250px' : '70px',
        paddingRight: isExpanded ? '20px' : '0px',
    };

    const asideStyle3: React.CSSProperties = {
        opacity: isExpanded ? '1' : '0',
    };

    return (
        /* Sidebar Button & DesktopSidebar */
        <div className="nav-sidebar">
            <button className="navbar-toggler" type="button" onClick={expandSidebar}>
                <HiBars3BottomLeft className="icon-bars" id="bars1" />
            </button>
            <aside>
                <div className="desktop-aside" style={asideStyle2}>
                    <a href="#" className="d-flex">
                        <div className="preview-icon bg-dark rounded-circle">
                            <TbReport className="icon-profile text-success" />
                        </div>
                        <span style={asideStyle3}>Report</span>
                    </a>
                    <a href="#" className="d-flex">
                        <div className="preview-icon bg-dark rounded-circle">
                            <SlPeople className="icon-profile text-warning" />
                        </div>
                        <span style={asideStyle3}>Students</span>
                    </a>
                    <a href="#" className="d-flex">
                        <div className="preview-icon bg-dark rounded-circle">
                            <ImExit className="icon-profile text-danger" />
                        </div>
                        <span style={asideStyle3}>Log Out</span>
                    </a>
                    <a href="#" className="d-flex">
                        <div className="preview-icon bg-dark rounded-circle">
                            <BsSend className="icon-profile" />
                        </div>
                        <span style={asideStyle3}>Submit</span>
                    </a>
                </div>
            </aside>
        </div>
    );
};

export default DesktopAside;
