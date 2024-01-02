// Import necessary React components and Firebase related functionalities
import React, { useState, useRef, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

// Define the LabelProps interface to specify the props for the SecondaryLabel component
interface LabelProps {
  text: string;
  inputType?: string;
  array?: string[];
  onClick?: (value: string) => void;
  value: string;
  disabled?: boolean;
}

// Define the SecondaryLabel component as a functional component with React.FC (Functional Component) type
const SecondaryLabel: React.FC<LabelProps> = ({ text, array, onClick, value }) => {
  // Reference to the label element
  const labelRef = useRef<HTMLLabelElement>(null);
  // State to manage the visibility of the dropdown menu
  const [isMenuVisible, setMenuVisible] = useState(false);

  // Effect to close the dropdown when clicking outside of it
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (labelRef.current?.contains(e.target as Node) || !labelRef.current?.contains(e.target as Node)) {
        setMenuVisible(false);
      }
    };

    // Add event listener for mousedown
    document.addEventListener("mousedown", handler);

    // Clean up the event listener when the component is unmounted
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  // Function to toggle the visibility of the dropdown menu
  const handleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  // Inline styles for controlling the visibility, transform, and opacity of the dropdown menu
  const dropdownStyle: React.CSSProperties = {
    visibility: isMenuVisible ? 'visible' : 'hidden',
    transform: isMenuVisible ? 'translateY(0.7rem)' : 'translateY(2.5rem)',
    opacity: isMenuVisible ? '1' : '0',
  };

  // Render the SecondaryLabel component
  return (
    <label ref={labelRef}>
      {/* Display the label text */}
      {text}
      {/* Dropdown menu with selected value */}
      <div className="select rounded">
        {/* Dropdown toggle with selected value */}
        <div className="dropdown-toggle" onClick={handleMenu}>
          {value}
        </div>
        {/* Dropdown menu items */}
        <ul className="dropdown-menu" style={dropdownStyle}>
          {array &&
            array.map((time, index) => (
              <li
                className={'dropdown-item rounded'}
                key={index}
                onClick={() => {
                  onClick?.(time);
                }}
              >
                {time}
              </li>
            ))}
        </ul>
      </div>
    </label>
  );
};

// Export the SecondaryLabel component to make it available for use in other files
export default SecondaryLabel;
