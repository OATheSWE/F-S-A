/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from 'react';
import { IconImports } from '../../../assets';
import { buttons, labels } from '../../../Data/data';
import { PrimaryLabel, Button, Toast } from '../../../components';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../firebase-config';
import { updateDoc, doc, collection, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from "../../../AuthContext";

type Student = {
  id: string;
  name: string;
  bookOfStudy: string;
  question: string;
  studentNumber: string;
  extraNotes: string;
  pinnedLocation: {
    lat: number;
    lng: number;
  };
};

const UpdateStudents: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [updatedName, setUpdatedName] = useState('');
  const [updatedBook, setUpdatedBook] = useState('');
  const [updatedQuestion, setUpdatedQuestion] = useState('');
  const [updatedLocation, setUpdatedLocation] = useState({ lat: 0, lng: 0 });
  const [studentNumber, setStudentNumber] = useState('');
  const [extraNotes, setExtraNotes] = useState('');
  const auth = useAuth();
  const [alerts, setAlerts] = useState<Array<{ id: number; message: string }>>([]);
  const [toast, showToast] = useState(false)


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




  useEffect(() => {
    const fetchStudent = async () => {
      try {
        if (auth.currentUser && id) {
          const studentsDocRef = doc(db, auth.currentUser.uid, 'Students');
          const studentsDocSnapshot = await getDoc(studentsDocRef);

          if (studentsDocSnapshot.exists()) {
            const studentsData: Record<string, Student> = studentsDocSnapshot.data();

            if (studentsData && studentsData.hasOwnProperty(id)) {
              const studentData = studentsData[id];
              setUpdatedName(studentData.name);
              setUpdatedBook(studentData.bookOfStudy);
              setUpdatedQuestion(studentData.question);
              setStudentNumber(studentData.studentNumber);
              setUpdatedQuestion(studentData.extraNotes);
            } else {
              navigate('/students');
            }
          } else {
            navigate('/students');
          }
        }
      } catch (error) {
        console.error('Error fetching student data:', error);
        displayToast();
        addAlert('Error fetching student data');
      }
    };

    fetchStudent();
  }, [db, id]);



  const handleUpdateLocation = () => {
    // Use the Geolocation API to retrieve the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const updatedLocation = { lat: latitude, lng: longitude };
        setUpdatedLocation(updatedLocation);
        displayToast();
        addAlert('Location Updated Successfully!');
      },
      (error) => {
        console.error('Error getting current location:', error);
        displayToast();
        addAlert('Error getting current location');
      }
    );
  };



  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      if (auth.currentUser && id) {
        const studentsDocRef = doc(db, auth.currentUser.uid, 'Students');
        const studentsDocSnapshot = await getDoc(studentsDocRef);

        if (studentsDocSnapshot.exists()) {
          const studentsData: Record<string, Student> = studentsDocSnapshot.data();

          if (studentsData && studentsData.hasOwnProperty(id)) {
            const updatedStudent = {
              ...studentsData[id], // Keep existing properties
              name: updatedName,
              bookOfStudy: updatedBook,
              question: updatedQuestion,
              pinnedLocation: updatedLocation,
              studentNumber: studentNumber,
              extraNotes: extraNotes,
              time: (new Date()).getTime()
            };

            // Update the specific student object inside the studentsData
            studentsData[id] = updatedStudent;

            // Save the updated studentsData back to Firestore
            await setDoc(studentsDocRef, studentsData);

            setTimeout(() => {
              navigate("/students");
            }, 3000)


            displayToast();
            addAlert('Student Updated Successfully!');
          } else {
            displayToast();
            addAlert('Student not found');
          }
        } else {
          displayToast();
          addAlert('No student data found');
        }
      }
    } catch (error) {
      console.error("Error updating students: ", error);
      displayToast();
      addAlert('Student Could Not Be Updated!');
    }
  };





  return (
    <div className="whole-container">
      <div className="popup text-white rounded new-students">
        <form onSubmit={handleUpdate}>
          <PrimaryLabel text={labels.name} inputType="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <PrimaryLabel
            text={labels.bofstudy} inputType="text" value={updatedBook} onChange={(e) => setUpdatedBook(e.target.value)} />
          <PrimaryLabel
            text={labels.question} inputType="text" value={updatedQuestion} onChange={(e) => setUpdatedQuestion(e.target.value)} />
          <PrimaryLabel text={labels.studentNumber} inputType='text' value={studentNumber} onChange={(e) => setStudentNumber(e.target.value)} />
          <PrimaryLabel text={labels.extraNotes} inputType='text' value={extraNotes} onChange={(e) => setExtraNotes(e.target.value)} />
          <div onClick={handleUpdateLocation} style={{ width: '60%' }}>
            Update Location
            <IconImports.FaMapMarkerAlt className="icon-locate" />
          </div>
          <Button text={buttons.update} />
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

export default UpdateStudents;
