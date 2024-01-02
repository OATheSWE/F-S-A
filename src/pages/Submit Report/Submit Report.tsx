import React, { useState } from 'react';
import { buttons, labels, monthNames } from '../../Data/data';
import { PrimaryLabel, Button, Toast } from '../../components';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useAuth } from "../../AuthContext";
import CurrentMonth from './Current Month';
import PreviousMonth from './Previous Month';

// Component for submitting field service reports for the current or previous month
const SubmitReport: React.FC = () => {
  // State variable to toggle between current and previous month views
  const [showCurrentMonth, setShowCurrentMonth] = useState(true);

  // Function to toggle between current and previous month views
  const toggleMonthView = () => {
    setShowCurrentMonth(!showCurrentMonth);
  };

  // Render the SubmitReport component
  return (
    <div className="whole-container">
      <div className="submit-report">
        {/* Month switch buttons */}
        <div className="month-switch">
          <div
            className={`month-switch-item ${showCurrentMonth ? 'active' : ''}`}
            onClick={() => toggleMonthView()}
          >
            This Month
          </div>
          <div
            className={`month-switch-item ${showCurrentMonth ? '' : 'active'}`}
            onClick={() => toggleMonthView()}
          >
            Last Month
          </div>
        </div>

        {/* Container to display either current or previous month component */}
        <div className={`month-container ${showCurrentMonth ? '' : 'hidden'}`}>
          {showCurrentMonth ? <CurrentMonth /> : <PreviousMonth />}
        </div>
      </div>
    </div>
  );
};

export default SubmitReport;
