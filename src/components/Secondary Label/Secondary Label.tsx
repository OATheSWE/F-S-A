import React, { useState } from 'react';


interface LabelProps {
    text: string;
    inputType?: string;
    array: string[];
}

const SecondaryLabel: React.FC<LabelProps> = ({ text, array }) => {

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
            {text}
            <div className="select rounded">
                <div className="dropdown-toggle" onClick={handleMenu}>
                    Open
                </div>
                <ul className="dropdown-menu" style={dropdownStyle}>
                    {array.map((time, index) => (
                        <li className="dropdown-item rounded" key={index}>
                            {time}
                        </li>
                    ))}
                </ul>
            </div>
        </label>
    );
};

export default SecondaryLabel;