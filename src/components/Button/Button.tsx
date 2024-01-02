// Import the React library for creating React components
import React from 'react';

// Define the props interface for the Button component
interface ButtonProps {
  text: string; // Text content of the button
  onClick?: (event: React.FormEvent) => void; // Optional click event handler function
  type?: string; // Optional type attribute for the button
  disabled?: boolean; // Optional flag to disable the button
}

// Define the Button component as a functional component with React.FC (Functional Component) type
const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  // Render the button element with provided properties
  return (
    <button type="submit" className="rounded" onClick={onClick} disabled={disabled}>
      {text} {/* Display the text content inside the button */}
    </button>
  );
};

// Export the Button component to make it available for use in other files
export default Button;
