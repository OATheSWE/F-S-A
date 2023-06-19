import React, { CSSProperties, ReactElement } from 'react';

interface AsideItemProps {
  link: string;
  anchor: string;
  div?: string;
  icon: ReactElement;
  spanStyle?: CSSProperties;
  span: string;
}

const AsideItem: React.FC<AsideItemProps> = ({ link, anchor, div, icon, spanStyle, span }) => {
  return (
    <a href={link} className={anchor}>
      {div && <div className={div}>{icon}</div>}
      {!div && icon} {/* Display the icon directly if no div is provided */}
      <span style={spanStyle}>{span}</span>
    </a>
  );
};






export default AsideItem;