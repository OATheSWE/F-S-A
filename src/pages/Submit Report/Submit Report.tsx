import React, { useState } from 'react';
import { buttons, labels, monthNames } from '../../Data/data';
import { PrimaryLabel, Button } from '../../components';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useAuth } from "../../AuthContext";
import CurrentMonth from './Current Month';
import PreviousMonth from './Previous Month';

const SubmitReport: React.FC = () => {
  const [showCurrentMonth, setShowCurrentMonth] = useState(true);

  const toggleMonthView = () => {
    setShowCurrentMonth(!showCurrentMonth);
  };

  return (
    <div className="whole-container">
      <div className="submit-report">
        <div className="month-switch">
          <div
            className={`month-switch-item ${showCurrentMonth ? 'active' : ''}`}
            onClick={() => toggleMonthView()}
          >
            Current Month
          </div>
          <div
            className={`month-switch-item ${showCurrentMonth ? '' : 'active'}`}
            onClick={() => toggleMonthView()}
          >
            Previous Month
          </div>

        </div>
        <div className={`month-container ${showCurrentMonth ? 'current' : 'previous'}`}>
          {showCurrentMonth ? <CurrentMonth /> : <PreviousMonth />}
        </div>
      </div>


    </div>
  );
};

export default SubmitReport;
