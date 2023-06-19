import React, { useState } from 'react';
import { TbReport, SlPeople, BsSend, HiBars3BottomLeft, ImExit } from '../../../assets/IconImports';
import AsideItem from '../Aside Item/Aside Item';
import { classNames, navs } from '../../../assets/data';

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
                    <AsideItem 
                    link="#" 
                    anchor={classNames.dAsideAnchor} 
                    div={classNames.dAsideAnchorDiv} 
                    icon={<TbReport className={`classNames.dAsideAnchorDivIcon text-success`} />}
                    spanStyle={asideStyle3}
                    span={navs.report}
                    />
                    <AsideItem 
                    link="#" 
                    anchor={classNames.dAsideAnchor} 
                    div={classNames.dAsideAnchorDiv} 
                    icon={<SlPeople className={`classNames.dAsideAnchorDivIcon text-warning`} />}
                    spanStyle={asideStyle3}
                    span={navs.students}
                    />
                    <AsideItem 
                    link="#" 
                    anchor={classNames.dAsideAnchor} 
                    div={classNames.dAsideAnchorDiv} 
                    icon={<ImExit className={`classNames.dAsideAnchorDivIcon text-danger`} />}
                    spanStyle={asideStyle3}
                    span={navs.logout}
                    />
                    <AsideItem 
                    link="#" 
                    anchor={classNames.dAsideAnchor} 
                    div={classNames.dAsideAnchorDiv} 
                    icon={<BsSend className={classNames.dAsideAnchorDivIcon} />}
                    spanStyle={asideStyle3}
                    span={navs.submit}
                    />
                </div>
            </aside>
        </div>
    );
};

export default DesktopAside;
