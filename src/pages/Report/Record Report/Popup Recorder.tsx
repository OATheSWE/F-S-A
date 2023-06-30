import React, { useState } from 'react';
import { labels, buttons, times } from '../../../assets/data';
import PrimaryLabel from '../../../components/Primary Label/Primary Label';
import SecondaryLabel from '../../../components/Secondary Label/Secondary Label';
import Button from '../../../components/Button/Button';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../firebase-config';
import { useNavigate } from 'react-router-dom';

const PopupRecorder: React.FC = () => {
  const reportsCollectionRef = collection(db, 'Reports');
  const [videoCount, setVideoCount] = useState('');
  const [placements, setPlacements] = useState('');
  const [selectedStart, setSelectedStart] = useState('Open (6am - 7pm)');
  const [selectedStop, setSelectedStop] = useState('Open (6am - 7pm)');
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const navigate = useNavigate();

  const handleStartSelection = (value: string) => {
    setSelectedStart(value);
  };

  const handleStopSelection = (value: string) => {
    setSelectedStop(value);
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

    if (videoCount && placements && selectedStudents.length > 0) {
      try {
        const newReport = {
          videos: videoCount,
          placements: placements,
          students: selectedStudents,
        };

        // Add the new report document to the Firestore collection
        await addDoc(reportsCollectionRef, newReport);

        // Reset the input fields after successful addition
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
