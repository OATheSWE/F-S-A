import React, { useState, useEffect } from 'react';
import { labels, buttons, times, monthNames } from '../../../Data/data';
import { PrimaryLabel, Button, SecondaryLabel } from '../../../components';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useNavigate, useLocation } from 'react-router-dom';


const PopupRecorder: React.FC = () => {
  const [videoCount, setVideoCount] = useState('');
  const [placements, setPlacements] = useState('');
  const [selectedStart, setSelectedStart] = useState('Open (6am - 7pm)');
  const [selectedStop, setSelectedStop] = useState('Open (6am - 7pm)');
  const [selectedStartHour, setSelectedStartHour] = useState<number>(0);
  const [selectedStopHour, setSelectedStopHour] = useState<number>(0);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [day, setDay] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Parse the query parameters from the location object
    const queryParams = new URLSearchParams(location.search);
    const dayParam = queryParams.get('day');

    // Update the "day" state with the query parameter value
    setDay(dayParam || ''); // If dayParam is null or undefined, set it to an empty string
  }, [location.search]);



  const convertTimeToHours = (time: string): number => {
    const [hour, minute] = time.split(':').map(Number);
    return hour + minute / 60;
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

    const hours = selectedStopHour - selectedStartHour;

    if (hours || videoCount || placements || selectedStudents.length > 0) {

      const currentDate = new Date();
      const month = currentDate.getMonth();
      const year = currentDate.getFullYear();
      const currentMonth = monthNames[month];

      try {
        const newReport = {
          hours: hours,
          videos: parseInt(videoCount, 10),
          placements:parseInt(placements, 10),
          students: selectedStudents,
        };

        const reportsCollectionRef = collection(db, 'Reports');
        const newReportDocRef = doc(reportsCollectionRef, `${currentMonth} ${year}`);
        const reportDay = `${currentMonth} ${day} ${year}`;

        const newReportDocSnapshot = await getDoc(newReportDocRef);

        if (!newReportDocSnapshot.exists()) {
          // Create the month-year document if it doesn't exist
          await setDoc(newReportDocRef, {});
        }

        // Get the existing report object inside the main object
        const existingReports = newReportDocSnapshot.data();

        // Create a new object inside the main object with the report for the current day
        const updatedReports = {
          ...existingReports,
          [reportDay]: newReport,
        };

        // Update the month-year document with the updated reports object
        await setDoc(newReportDocRef, updatedReports);

        // Reset the input fields after successful addition
        setSelectedStart('Open (6am - 7pm)');
        setSelectedStop('Open (6am - 7pm)');
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
          <h2>Activity Form</h2>
          <SecondaryLabel
            text={labels.starth}
            array={times}
            onClick={handleStartSelection}
            value={selectedStart}
          />
          <SecondaryLabel
            text={labels.stoph}
            array={times}
            onClick={handleStopSelection}
            value={selectedStop}
          />
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
          <SecondaryLabel
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
