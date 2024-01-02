// Import necessary React components and types
import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

// Define the props interface for the DropdownItem component
interface DropdownItemProps {
  liStyle: string; // CSS class for styling the list item
  liDivStyle1: string; // CSS class for styling the first div inside the list item
  icon: ReactElement; // ReactElement representing the icon to be displayed
  renderDiv?: boolean; // Flag to determine whether to render the second div
  liDivStyle2?: string; // Optional CSS class for styling the second div inside the list item
  h6?: string; // Optional CSS class for styling the h6 element
  h6Content?: string; // Optional content for the h6 element
  p?: string; // Optional CSS class for styling the p element
  pContent?: string; // Optional content for the p element
  liAStyle?: string; // Optional CSS class for styling the Link element
  link?: string; // Optional link for navigation using react-router-dom
  linkText?: string; // Optional text content for the Link element
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined; // Optional click event handler function
}

// Define the DropdownItem component as a functional component with React.FC (Functional Component) type
const DropdownItem: React.FC<DropdownItemProps> = ({
  liStyle,
  liDivStyle1,
  icon,
  renderDiv = true,
  liDivStyle2,
  h6,
  h6Content,
  p,
  pContent,
  liAStyle,
  link,
  linkText,
  onClick
}) => {
  // Render the list item with optional divs and/or Link element based on props
  return (
    <li className={liStyle}>
      <div className={liDivStyle1}>
        {icon}
      </div>
      {/* Conditionally render the second div if renderDiv is true and liDivStyle2 is provided */}
      {renderDiv && liDivStyle2 && (
        <div className={liDivStyle2}>
          {/* Render optional h6 element with specified content */}
          {h6 && <h6 className={h6}>{h6Content}</h6>}
          {/* Render optional p element with specified content */}
          {p && <p className={p}>{pContent}</p>}
        </div>
      )}
      {/* Conditionally render Link element if renderDiv is false and liAStyle, link, and linkText are provided */}
      {!renderDiv && liAStyle && link && linkText && (
        <Link className={liAStyle} to={link} onClick={onClick}>
          {linkText}
        </Link>
      )}
    </li>
  );
};

// Export the DropdownItem component to make it available for use in other files
export default DropdownItem;
