import React from 'react';

interface RememeberMeProps {
    checked: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const textStyles: React.CSSProperties = {
    color: 'rgba(255, 255, 255, 0.55)',
  };

const RememberMe: React.FC<RememeberMeProps> = ({ checked, onChange }) => {
    return (
        <div className="d-flex flex-column">
            Remember Me
            <input type="checkbox" className="rounded " checked={checked} onChange={onChange} />
            <div style={textStyles}>
                (Please check box!!)
            </div>
        </div>
    );
};

export default RememberMe;
