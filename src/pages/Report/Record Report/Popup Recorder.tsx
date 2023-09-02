import React, { useState, useEffect } from 'react';
import { labels, buttons, times, monthNames } from '../../../Data/data';
import { PrimaryLabel, Button, SecondaryLabel } from '../../../components';
import { collection, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useNavigate, useLocation } from 'react-router-dom';
import SecondaryLabel2 from '../../../components/Secondary Label/Seondary Label2';
import { useAuth } from "../../../AuthContext";


const PopupRecorder: React.FC = () => {
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


  useEffect(() => {
    // Parse the query parameters from the location object
    const queryParams = new URLSearchParams(location.search);
    const dayParam = queryParams.get('day');
    const monthParam = queryParams.get('month'); 

   

    // convert dayParam to a number
    if (dayParam) {
      const numericDay = parseInt(dayParam, 10);
      setDay(numericDay);
    } else {
      setDay(0); // If dayParam is null or undefined, set it to an empty string
    }
  
  
    // Convert numeric month value to corresponding month name
    if (monthParam) {
      const numericMonth = parseInt(monthParam, 10); // Turn the monthParam string to integer
      if (numericMonth >= 0 && numericMonth < monthNames.length) {
        setMonth(monthNames[numericMonth]);
      } else {
        setMonth(''); // Default value if monthParam is invalid
      }
    } else {
      setMonth(''); // If monthParam is null or undefined, set it to an empty string
    }

    
  }, [location.search]);
  




  const convertTimeToHours = (time: string): number => {
    const numericHour = parseInt(time, 10); // Convert the hour part of the time string to a number
    const isPM = time.includes('pm');

    if (isPM && numericHour !== 12) {
      // If it's in the afternoon (PM) and not 12pm, add 12 to convert to 24-hour format
      return numericHour + 12;
    } else if (!isPM && numericHour === 12) {
      // If it's 12am (midnight), set it to 0 in 24-hour format
      return 0;
    } else {
      // If it's in the morning (AM) or 12pm (noon), keep it as it is
      return numericHour;
    }
  };





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

  const handleVideoCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoCount(event.target.value);
  };

  const handlePlacements = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlacements(event.target.value);
  };

  const handleStudentSelection = (selectedValues: string[]) => {
    setSelectedStudents(selectedValues);
  };

  const handleRecordReport = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if the stop hour is selected
    if (selectedStartHour && (selectedStop === 'Select' || !selectedStop)) {
      // Alert user that stophour must be selected
      alert('Please select the stop hour before adding your report!.');
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

        // Get the existing report object inside the main object
        const existingData = newReportDocSnapshot.data()|| {};

        // Check if the report day already exists in the current month-year object
        const currentMonthData = existingData[`${month} ${year}`];
        const updatedData = {
          ...existingData,
          [`${month} ${year}`]: {
            ...(currentMonthData || {}), // Copy existing data if it exists
            ...newReport, // Add or update the new report day data
          },
        };

        // Update the month-year document with the updated reports object
        await setDoc(newReportDocRef, updatedData);

        // Reset the input fields after successful addition
        setSelectedStart('Select');
        setSelectedStop('Select');
        setVideoCount('');
        setPlacements('');
        setSelectedStudents([]);

        // Optionally, show a success message to the user
        alert('Report added successfully!');

        // Navigate to the desired page
        navigate('/');
      } catch (error) {
        // Handle error if the report addition fails
        console.error('Error adding report:', error);
        alert('Could Not Add The Report!');
      }
    }
  };


  return (
    <div className="whole-container">
      <div className="popup text-white rounded">
        <form onSubmit={handleRecordReport}>
          <h2>Record Report</h2>
          <SecondaryLabel
            text={labels.starth}
            array={times}
            onClick={handleStartSelection}
            value={selectedStart}
            disabled={selectedStart === 'Select'} // Disable the stop hour selection if the start hour is not selected
          />
          {selectedStart !== 'Select' && (
            <SecondaryLabel
              text={labels.stoph}
              array={times.filter((time) => {
                const timeIn24HourFormat = convertTimeToHours(time);
                return timeIn24HourFormat > selectedStartHour;
              })} // Filter out times that are below the selected start hour
              onClick={handleStopSelection}
              value={selectedStop}
            />
          )}
          <PrimaryLabel
            text={labels.video}
            inputType="number"
            value={videoCount}
            onChange={handleVideoCount}
          />
          <PrimaryLabel
            text={labels.placement}
            inputType="number"
            value={placements}
            onChange={handlePlacements}
          />
          <SecondaryLabel2
            text={labels.selecteds}
            array={[]}
            onChange={handleStudentSelection}
            selectedValues={selectedStudents}
            onSelectMultiple={setSelectedStudents}
            value={selectedStudents.length > 0 ? selectedStudents.join(', ') : 'Open Students'}
          />
          <Button text={buttons.save} />
        </form>
      </div>
    </div>
  );
};

export default PopupRecorder;
