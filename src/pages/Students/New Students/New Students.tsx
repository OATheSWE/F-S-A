/* eslint-disable no-prototype-builtins */
import React, { useState, useEffect } from 'react';
import { IconImports } from '../../../assets';
import { buttons, labels } from '../../../Data/data';
import { PrimaryLabel, Button } from '../../../components';
import { db } from '../../../firebase-config'; // Make sure to import the Firebase configuration
import { collection, getDocs, query, orderBy, limit, updateDoc, doc, getDoc, onSnapshot, setDoc, } from 'firebase/firestore'; // Import Firestore functionalities
import { useAuth } from "../../../AuthContext";
import { useNavigate } from 'react-router-dom';


const NewStudents: React.FC = () => {
    const [latestName, setLatestName] = useState('');
    const [latestBook, setLatestBook] = useState('');
    const [latestQuestion, setLatestQuestion] = useState('');
    const [pinLocation, setPinLocation] = useState({ lat: 0, lng: 0 });
    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        const fetchLatestName = async () => {
            if (auth.currentUser) {
                const studentsDocRef = doc(db, auth.currentUser.uid, 'Students');
                const studentsDocSnapshot = await getDoc(studentsDocRef);

                if (studentsDocSnapshot.exists()) {
                    const studentData = studentsDocSnapshot.data();

                    let latestStudentKey = null;
                    let latestTime = 0; // Initialize to 0 or a very small value

                    for (const studentKey in studentData) {
                        if (studentData.hasOwnProperty(studentKey)) {
                            const student = studentData[studentKey];
                            if (student.time > latestTime) {
                                latestTime = student.time;
                                latestStudentKey = studentKey;
                            }

                        }
                    }

                    if (latestStudentKey) {
                        setLatestName(studentData[latestStudentKey].name)
                    }



                }
            }
        }

        fetchLatestName();
    }, []);



    const handlePinLocation = () => {
        // Use the Geolocation API to retrieve the user's current location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const pinLocation = { lat: latitude, lng: longitude };
                setPinLocation(pinLocation);
                alert('Location Pinned Successfully!');
            },
            (error) => {
                console.error('Error getting current location:', error);
            }
        );
    };



    const handleAddStudent = async (event: React.FormEvent) => {
        event.preventDefault();

        if (latestName || latestBook || pinLocation || latestQuestion) {
            try {
                const newStudent = {
                    name: latestName,
                    bookOfStudy: latestBook,
                    question: latestQuestion,
                    pinnedLocation: pinLocation,
                    time: new Date().getTime(),
                };

                const studentsDocRef = doc(db, auth.currentUser?.uid, 'Students');

                const studentsDocSnapshot = await getDoc(studentsDocRef);

                if (!studentsDocSnapshot.exists()) {
                    await setDoc(studentsDocRef, {});
                }

                const existingStudents = studentsDocSnapshot.data();

                let latestStudentKey = null;
                let latestTime = 0;

                // Find the latest object based on the time property
                for (const studentKey in existingStudents) {
                    if (existingStudents.hasOwnProperty(studentKey)) {
                        const student = existingStudents[studentKey];
                        if (student.time > latestTime) {
                            latestTime = student.time;
                            latestStudentKey = studentKey;
                        }
                    }
                }

                if (latestStudentKey) {

                    const updatedStudents = {
                        ...existingStudents,
                        [latestStudentKey]: newStudent,
                    };

                    await setDoc(studentsDocRef, updatedStudents);

                    // Optionally, show a success message to the user
                    alert('Student Added successfully!');

                    // Reset the input fields after successful update
                    setLatestName('');
                    setLatestBook('');
                    setLatestQuestion('');

                    // Navigate to desired page
                    navigate('/students');
                }
            } catch (error) {
                // Handle error if the student update fails
                console.error('Error updating student:', error);
                alert('Student Could Not Be Added!');
            }
        }
    };





    return (
        <div className="whole-container">
            <div className="popup text-white rounded new-students">
                <form onSubmit={handleAddStudent}>
                    <PrimaryLabel text={labels.sName} inputType='text' value={latestName} onChange={(e) => setLatestName(e.target.value)} />
                    <PrimaryLabel text={labels.bofstudy} inputType='text' value={latestBook} onChange={(e) => setLatestBook(e.target.value)} />
                    <PrimaryLabel text={labels.question} inputType='text' value={latestQuestion} onChange={(e) => setLatestQuestion(e.target.value)} />
                    <div onClick={handlePinLocation} >
                        Pin Location
                        <IconImports.FaMapMarkerAlt className="icon-locate" />
                    </div>
                    <Button text={buttons.add} />
                </form>
            </div>
        </div>
    );
}

export default NewStudents;
