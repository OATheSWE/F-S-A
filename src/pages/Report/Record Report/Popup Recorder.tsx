import React, { useState } from 'react';
import { labels, buttons, times, students } from '../../../assets/data';
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
  const navigate = useNavigate();

  const handleVideoCount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setVideoCount(event.target.value);
  };

  const handlePlacements = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlacements(event.target.value);
  };

  const handleRecordReport = async (event: React.FormEvent) => {
    event.preventDefault();

    
    if (videoCount && placements) {
      try {
        const newReport = {
          videos: videoCount,
          placements: placements,
          date: (new Date()).getTime()
        };
  
        // Add the new student document to the Firestore collection
        await addDoc(reportsCollectionRef, newReport);
  
        // Reset the input field after successful addition
        setVideoCount('');
        setPlacements('');
  
        // Optionally, show a success message to the user
        console.log('Student added successfully!');

        // Navigate to desired page
        navigate('/calendar');
      } catch (error) {
        // Handle error if the student addition fails
        console.error('Error adding student:', error);
      }
    }
  };



  return (
    <div className="whole-container">
      <Navbar />
      <div className="popup text-white rounded">
        <form onSubmit={handleRecordReport} >
          <h2>Activity Form</h2>
          <SecondaryLabel text={labels.starth} array={times} />
          <SecondaryLabel text={labels.stoph} array={times} />
          <PrimaryLabel text={labels.video} inputType='number' value={videoCount} onChange={handleVideoCount} />
          <PrimaryLabel text={labels.placement} inputType='number' value={placements} onChange={handlePlacements} />
          <SecondaryLabel text={labels.selecteds} array={students} />
          <Button text={buttons.save} />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PopupRecorder;


