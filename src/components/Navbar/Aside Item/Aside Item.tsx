// Import necessary components and types from the React and react-router-dom libraries
import React, { CSSProperties, ReactElement } from 'react';
import { Link } from 'react-router-dom';

// Define the props interface for the AsideItem component
interface AsideItemProps {
  link?: string | any; // Optional link for navigation using react-router-dom
  anchor: string; // CSS class for styling the anchor element
  div?: string; // Optional div class for styling and placing the icon inside a div
  icon: ReactElement; // ReactElement representing the icon to be displayed
  spanStyle?: CSSProperties; // Optional inline styles for the span element
  span: string; // Text content of the span element
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined; // Optional click event handler function
}

// Define the AsideItem component as a functional component with React.FC (Functional Component) type
const AsideItem: React.FC<AsideItemProps> = ({ link, anchor, div, icon, spanStyle, span, onClick }) => {
  // Render the Link component for navigation with provided properties
  return (
    <Link to={link} className={anchor} onClick={onClick}>
      {/* Conditionally render a div with the provided icon inside, if div class is provided */}
      {div && <div className={div}>{icon}</div>}
      {/* Display the icon directly if no div class is provided */}
      {!div && icon}
      {/* Render a span element with optional inline styles and the provided text content */}
      <span style={spanStyle}>{span}</span>
    </Link>
  );
};

// Export the AsideItem component to make it available for use in other files
export default AsideItem;
