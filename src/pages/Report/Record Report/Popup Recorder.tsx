import React, { useState, useEffect } from 'react';
import { labels, buttons, times, monthNames } from '../../../Data/data';
import { PrimaryLabel, Button, SecondaryLabel, Toast } from '../../../components';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useNavigate, useLocation } from 'react-router-dom';
import SecondaryLabel2 from '../../../components/Secondary Label/Seondary Label2';
import { useAuth } from "../../../AuthContext";

const PopupRecorder: React.FC = () => {
  // State variables
  const [videoCount, setVideoCount] = useState('');
  const [placements, setPlacements] = useState('');
  const [selectedStart, setSelectedStart] = useState('Select');
  const [selectedStop, setSelectedStop] = useState('Select');
  const [selectedStartHour, setSelectedStartHour] = useState<number>(0);
  const [selectedStopHour, setSelectedStopHour] = useState<number>(0);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [day, setDay] = useState(0);
  const [month, setMonth] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();
  const [alerts, setAlerts] = useState<Array<{ id: number; message: string }>>([]);
  const [toast, showToast] = useState(false);

  // Function to display the toast
  const displayToast = () => {
    showToast(true);
  }

  // Function to add a new alert message
  const addAlert = (message: string) => {
    const newAlert = {
      id: Date.now(), // Unique identifier 
      message: message,
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  // Function to remove an alert by its ID
  const removeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  // useEffect to parse query parameters from the location object
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const dayParam = queryParams.get('day');
    const monthParam = queryParams.get('month');

    // Convert dayParam to a number
    if (dayParam) {
      const numericDay = parseInt(dayParam, 10);
      setDay(numericDay);
    } else {
      setDay(0);
    }

    // Convert numeric month value to corresponding month name
    if (monthParam) {
      const numericMonth = parseInt(monthParam, 10);
      if (numericMonth >= 0 && numericMonth < monthNames.length) {
        setMonth(monthNames[numericMonth]);
      } else {
        setMonth('');
      }
    } else {
      setMonth('');
    }
  }, [location.search]);

  // Function to convert time to 24-hour format
  const convertTimeToHours = (time: string): number => {
    const numericHour = parseInt(time, 10);
    const isPM = time.includes('pm');

    if (isPM && numericHour !== 12) {
      return numericHour + 12;
    } else if (!isPM && numericHour === 12) {
      return 0;
    } else {
      return numericHour;
    }
  };

  // Event handlers for start and stop time selection
  const handleStartSelection = (value: string) => {
    setSelectedStart(value);
    const startHour = convertTimeToHours(value);
    setSelectedStartHour(startHour);
  };

  const handleStopSelection = (value: string) => {
    setSelectedStop(value);
    const stopHour = convertTimeToHours(value);
    setSelectedStopHour(stopHour);
  };

  // Event handlers for video count, placements, and student selection
  const handleVideoCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoCount(event.target.value);
  };

  const handlePlacements = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlacements(event.target.value);
  };

  const handleStudentSelection = (selectedValues: string[]) => {
    setSelectedStudents(selectedValues);
  };

  // Event handler for submitting the report
  const handleRecordReport = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if the stop hour is selected
    if (selectedStartHour && (selectedStop === 'Select' || !selectedStop)) {
      displayToast();
      addAlert('Please select the stop hour!');
      return;
    }

    const hours = selectedStopHour - selectedStartHour;

    if (hours || videoCount || placements || selectedStudents.length > 0) {
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const reportDay = `${month} ${day} ${year}`;

      try {
        const newReportContent = {
          hours: hours,
          videos: parseInt(videoCount, 10),
          placements: parseInt(placements, 10),
          students: selectedStudents,
        };

        const newReport = {
          [reportDay]: newReportContent,
        };

        const newReportDocRef = doc(db, auth.currentUser?.uid, "Reports");
        const newReportDocSnapshot = await getDoc(newReportDocRef);

        if (!newReportDocSnapshot.exists()) {
          // Create the Reports document if it doesn't exist
          await setDoc(newReportDocRef, {});
        }

        const existingData = newReportDocSnapshot.data() || {};
        const currentMonthData = existingData[`${month} ${year}`];
        const updatedData = {
          ...existingData,
          [`${month} ${year}`]: {
            ...(currentMonthData || {}),
            ...newReport,
          },
        };

        await setDoc(newReportDocRef, updatedData);

        displayToast();
        addAlert('Report added successfully!');

        // Reset the input fields after successful addition
        setSelectedStart('Select');
        setSelectedStop('Select');
        setVideoCount('');
        setPlacements('');
        setSelectedStudents([]);

        // Navigate to the desired page
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } catch (error) {
        console.error('Error adding report:', error);
        displayToast();
        addAlert('Could Not Add The Report!');
      }
    }
  };

  return (
    <div className="whole-container">
      <div className="popup text-white rounded">
        <form onSubmit={handleRecordReport}>
          <h2>Record Report</h2>
          {/* Render SecondaryLabel for start time selection */}
          <SecondaryLabel
            text={labels.starth}
            array={times}
            onClick={handleStartSelection}
            value={selectedStart}
            disabled={selectedStart === 'Select'}
          />
          {selectedStart !== 'Select' && (
            // Render SecondaryLabel for stop time selection
            <SecondaryLabel
              text={labels.stoph}
              array={times.filter((time) => {
                const timeIn24HourFormat = convertTimeToHours(time);
                return timeIn24HourFormat > selectedStartHour;
              })}
              onClick={handleStopSelection}
              value={selectedStop}
            />
          )}
          {/* Render PrimaryLabel for video count input */}
          <PrimaryLabel
            text={labels.video}
            inputType="number"
            value={videoCount}
            onChange={handleVideoCount}
          />
          {/* Render PrimaryLabel for placements input */}
          <PrimaryLabel
            text={labels.placement}
            inputType="number"
            value={placements}
            onChange={handlePlacements}
          />
          {/* Render SecondaryLabel2 for student selection */}
          <SecondaryLabel2
            text={labels.selecteds}
            array={[]}
            onChange={handleStudentSelection}
            selectedValues={selectedStudents}
            onSelectMultiple={setSelectedStudents}
            value={selectedStudents.length > 0 ? selectedStudents.join(', ') : 'Open Students'}
          />
          {/* Render Button for submitting the report */}
          <Button text={buttons.save} />
        </form>
        {/* Render alert messages */}
        {alerts.map((alert) => (
          <Toast
            show={toast}
            key={alert.id}
            message={alert.message}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PopupRecorder;
