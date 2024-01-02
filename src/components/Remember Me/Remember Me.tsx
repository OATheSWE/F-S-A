// Import necessary React components
import React from 'react';

// Define the RememberMeProps interface to specify the props for the RememberMe component
interface RememeberMeProps {
    checked: boolean;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Define the RememberMe component as a functional component with React.FC (Functional Component) type
const RememberMe: React.FC<RememeberMeProps> = ({ checked, onChange }) => {
    // Render the RememberMe component
    return (
        <div className="d-flex flex-column">
            {/* Display the text "Remember Me" */}
            Remember Me
            {/* Render a checkbox input with provided props */}
            <input type="checkbox" className="rounded" checked={checked} onChange={onChange} />
        </div>
    );
};

// Export the RememberMe component to make it available for use in other files
export default RememberMe;
