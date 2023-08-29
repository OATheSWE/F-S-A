import React, { CSSProperties, ReactElement } from 'react';
import { Link } from 'react-router-dom';

interface AsideItemProps {
  link?: string | any;
  anchor: string;
  div?: string;
  icon: ReactElement;
  spanStyle?: CSSProperties;
  span: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement> | undefined;
}

const AsideItem: React.FC<AsideItemProps> = ({ link, anchor, div, icon, spanStyle, span, onClick }) => {
  return (
    <Link to={link} className={anchor} onClick={onClick}>
      {div && <div className={div}>{icon}</div>}
      {!div && icon} {/* Display the icon directly if no div is provided */}
      <span style={spanStyle}>{span}</span>
    </Link>
  );
};






export default AsideItem;