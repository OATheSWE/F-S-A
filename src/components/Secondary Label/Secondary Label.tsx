import React, { useState, useRef, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';


interface LabelProps {
  text: string;
  inputType?: string;
  array?: string[];
  onClick?: (value: string) => void;
  value: string;
  disabled?: boolean;
}

const SecondaryLabel: React.FC<LabelProps> = ({ text, array, onClick, value }) => {



  const labelRef = useRef<HTMLLabelElement>(null);

  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {

    const handler = (e: MouseEvent) => {
      if (labelRef.current?.contains(e.target as Node) || !labelRef.current?.contains(e.target as Node)) {
        setMenuVisible(false);
      }


    }
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);

  const handleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const dropdownStyle: React.CSSProperties = {
    visibility: isMenuVisible ? 'visible' : 'hidden',
    transform: isMenuVisible ? 'translateY(0.7rem)' : 'translateY(2.5rem)',
    opacity: isMenuVisible ? '1' : '0',
  };



  return (
    <label ref={labelRef} >
      {text}
      <div className="select rounded">
        <div className="dropdown-toggle" onClick={handleMenu}>
          {value}
        </div>
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

export default SecondaryLabel;