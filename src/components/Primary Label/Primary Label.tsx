// Import necessary React components
import React from 'react';

// Define the LabelProps interface to specify the props for the PrimaryLabel component
interface LabelProps {
  text: string;
  inputType?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  autoComplete?: string;
}

// Define the PrimaryLabel component as a functional component with React.FC (Functional Component) type
const PrimaryLabel: React.FC<LabelProps> = ({ text, inputType, onChange, value, placeholder, readOnly, required, name, autoComplete }) => {
  // Render the PrimaryLabel component
  return (
    <label>
      {/* Display the label text */}
      {text}
      {/* Render an input element if inputType is provided */}
      {inputType && (
        <input
          type={inputType}
          className="rounded"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          readOnly={readOnly}
          required={required}
          name={name}
          autoComplete={autoComplete}
        />
      )}
    </label>
  );
};

// Export the PrimaryLabel component to make it available for use in other files
export default PrimaryLabel;
