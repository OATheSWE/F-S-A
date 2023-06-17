import React, { useState } from 'react';
import { labels, buttons } from '../../../assets/data';
import  PrimaryLabel from '../../../components/Primary Label/Primary Label';
import  Button from '../../../components/Button/Button';


const PopupRecorder: React.FC = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [isMenuVisible2, setMenuVisible2] = useState(false);
  const [isMenuVisible3, setMenuVisible3] = useState(false);
  

  const handleMenu = () => {
    setMenuVisible(!isMenuVisible);
  };

  const handleMenu2 = () => {
    setMenuVisible2(!isMenuVisible2);
  };

  const handleMenu3 = () => {
    setMenuVisible3(!isMenuVisible3);
  };

  const dropdownStyle: React.CSSProperties = {
    visibility: isMenuVisible ? 'visible' : 'hidden',
    transform: isMenuVisible ? 'translateY(0.7rem)' : 'translateY(2.5rem)',
    opacity: isMenuVisible ? '1' : '0',
  };

  const dropdownStyle2: React.CSSProperties = {
    visibility: isMenuVisible2 ? 'visible' : 'hidden',
    transform: isMenuVisible2 ? 'translateY(0.7rem)' : 'translateY(2.5rem)',
    opacity: isMenuVisible2 ? '1' : '0',
  };

  const dropdownStyle3: React.CSSProperties = {
    visibility: isMenuVisible3 ? 'visible' : 'hidden',
    transform: isMenuVisible3 ? 'translateY(0.7rem)' : 'translateY(2.5rem)',
    opacity: isMenuVisible3 ? '1' : '0',
  };

  return (
    <div className="popup text-white rounded">
      <form>
        <h2>Activity Form</h2>
        <label>
          Start Hour:
          <div className="select rounded">
            <div className="dropdown-toggle" onClick={handleMenu}>
              Open
            </div>
            <ul className="dropdown-menu" style={dropdownStyle}>
              <li className="dropdown-item rounded">Item 1</li>
              <li className="dropdown-item rounded">Item 2</li>
              <li className="dropdown-item rounded">Item 3</li>
              <li className="dropdown-item rounded">Item 2</li>
              <li className="dropdown-item rounded">Item 3</li>
            </ul>
          </div>
        </label>
        <label>
          Stop Hour:
          <div className="select rounded">
            <div className="dropdown-toggle" onClick={handleMenu2}>
              Open
            </div>
            <ul className="dropdown-menu" style={dropdownStyle2}>
              <li className="dropdown-item rounded">Item 1</li>
              <li className="dropdown-item rounded">Item 2</li>
              <li className="dropdown-item rounded">Item 3</li>
              <li className="dropdown-item rounded">Item 2</li>
              <li className="dropdown-item rounded">Item 3</li>
            </ul>
          </div>
        </label>
        <PrimaryLabel text={labels.video} inputType='number'/>
        <PrimaryLabel text={labels.placement} inputType='number'/>
        <label>
          Select Students:
          <div className="select rounded">
            <div className="dropdown-toggle" onClick={handleMenu3}>
              Open
            </div>
            <ul className="dropdown-menu" style={dropdownStyle3}>
              <li className="dropdown-item rounded">Item 1</li>
              <li className="dropdown-item rounded">Item 2</li>
              <li className="dropdown-item rounded">Item 3</li>
              <li className="dropdown-item rounded">Item 2</li>
              <li className="dropdown-item rounded">Item 3</li>
            </ul>
          </div>
        </label>
        <Button text={buttons.save}/>
      </form>
    </div >
  );
};

export default PopupRecorder;


