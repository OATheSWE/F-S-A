import React, { useState } from 'react';

interface LabelProps {
    text: string;
    inputType?: string;
}

const SecondaryLabel: React.FC<LabelProps> = ({ text }) => {

    const [isMenuVisible, setMenuVisible] = useState(false);

    const handleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const dropdownStyle: React.CSSProperties = {
        visibility: isMenuVisible ? 'visible' : 'hidden',
        transform: isMenuVisible ? 'translateY(0.7rem)' : 'translateY(2.5rem)',
        opacity: isMenuVisible ? '1' : '0',
    };


    return (
        <label>
            Start Hour:
            <div className="select rounded">
                <div className="dropdown-toggle" onClick={handleMenu}>
                    Open
                </div>
                <ul className="dropdown-menu" style={dropdownStyle}>
                    <li className="dropdown-item rounded">Item 1</li>
                    <li className="dropdown-item rounded">Item 2</li>
                    <li className="dropdown-item rounded">Item 3</li>
                    <li className="dropdown-item rounded">Item 2</li>
                    <li className="dropdown-item rounded">Item 3</li>
                </ul>
            </div>
        </label>
    );
};

export default SecondaryLabel;