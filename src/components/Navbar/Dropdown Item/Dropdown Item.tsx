import React, { ReactElement } from 'react';

interface DropdownItemProps {
  liStyle: string;
  liDivStyle1: string;
  icon: ReactElement;
  renderDiv?: boolean;
  liDivStyle2?: string;
  h6?: string;
  h6Content?: string;
  p?: string;
  pContent?: string;
  liAStyle?: string;
  link?: string;
  linkText?: string;
}

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
}) => {
  return (
    <li className={liStyle}>
      <div className={liDivStyle1}>
        {icon}
      </div>
      {renderDiv && liDivStyle2 && (
        <div className={liDivStyle2}>
          {h6 && <h6 className={h6}>{h6Content}</h6>}
          {p && <p className={p}>{pContent}</p>}
        </div>
      )}
      {!renderDiv && liAStyle && link && linkText && (
        <a className={liAStyle} href={link}>
          {linkText}
        </a>
      )}
    </li>
  );
};

export default DropdownItem;
