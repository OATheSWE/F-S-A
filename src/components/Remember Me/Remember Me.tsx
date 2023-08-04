import React from 'react';

interface RememeberMeProps {
    checked: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}


const RememberMe: React.FC<RememeberMeProps> = ({ checked, onChange }) => {
    return (
        <div className="d-flex flex-column">
            Remember Me
            <input type="checkbox" className="rounded " checked={checked} onChange={onChange} />
        </div>
    );
};

export default RememberMe;
