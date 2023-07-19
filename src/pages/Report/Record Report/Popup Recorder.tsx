import React, { useState } from 'react';
import { labels, buttons, times, monthNames } from '../../../assets/data';
import PrimaryLabel from '../../../components/Primary Label/Primary Label';
import SecondaryLabel from '../../../components/Secondary Label/Secondary Label';
import Button from '../../../components/Button/Button';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { collection, addDoc, doc, setDoc, arrayUnion, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';


const PopupRecorder: React.FC = () => {
  const [videoCount, setVideoCount] = useState('');
  const [placements, setPlacements] = useState('');
  const [selectedStart, setSelectedStart] = useState('Open (6am - 7pm)');
  const [selectedStop, setSelectedStop] = useState('Open (6am - 7pm)');
  const [selectedStartHour, setSelectedStartHour] = useState<number>(0);
  const [selectedStopHour, setSelectedStopHour] = useState<number>(0);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const navigate = useNavigate();

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
  
    if (hours || videoCount || placements || selectedStudents.length > 0 ) {
      try {
        const newReport = {
          hours: hours,
          videos: videoCount,
          placements: placements,
          students: selectedStudents,
        };
  
        const currentDate = new Date();
        const month = currentDate.getMonth(); 
        const year = currentDate.getFullYear();
        const currentMonth = monthNames[month];
        const currentDay = currentDate.getDate();
        
        const reportsCollectionRef = collection(db, 'Reports');
        const newReportDocRef = doc(reportsCollectionRef, `${currentMonth} ${year}`);
        const reportDay = `${currentMonth} ${currentDay}`;
  
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
        console.log('Report added successfully!');
  
        // Navigate to the desired page
        navigate('/calendar');
      } catch (error) {
        // Handle error if the report addition fails
        console.error('Error adding report:', error);
      }
    }
  };



  return (
    <div className="whole-container">
      <Navbar />
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
      <Footer />
    </div>
  );
};

export default PopupRecorder;
