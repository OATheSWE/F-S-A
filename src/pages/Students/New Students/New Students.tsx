import React, { useState, useEffect } from 'react';
import { IconImports } from '../../../assets';
import { buttons, labels } from '../../../Data/data';
import { PrimaryLabel, Button } from '../../../components';
import { db } from '../../../firebase-config'; // Make sure to import the Firebase configuration
import { collection, getDocs, query, orderBy, limit, updateDoc, } from 'firebase/firestore'; // Import Firestore functionalities

import { useNavigate } from 'react-router-dom';


const NewStudents: React.FC = () => {
    const [latestName, setLatestName] = useState('');
    const [latestBook, setLatestBook] = useState('');
    const [latestQuestion, setLatestQuestion] = useState('');
    const [pinLocation, setPinLocation] = useState({ lat: 0, lng: 0 });
    const navigate = useNavigate();

    useEffect(() => {
        const getLatestName = async () => {
            const studentsCollectionRef = collection(db, 'Students');
            const studentsQuery = query(studentsCollectionRef, orderBy('time', 'desc'), limit(1));
            const querySnapshot = await getDocs(studentsQuery);

            if (!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const latestName = doc.data().name;
                setLatestName(latestName);
            }
        };

        getLatestName();
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
                    time: (new Date()).getTime()
                };

                const studentsCollectionRef = collection(db, 'Students');
                const querySnapshot = query(studentsCollectionRef, orderBy('time', 'desc'), limit(1));
                const latestDoc = await getDocs(querySnapshot);
                const doc = latestDoc.docs[0];

                await updateDoc(doc.ref, newStudent);

                // Optionally, show a success message to the user
                alert('Student Added successfully!');

                // Reset the input fields after successful update
                setLatestName('');
                setLatestBook('');
                setLatestQuestion('')


                // Navigate to desired page
                navigate('/students');
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
                <form>
                    <PrimaryLabel text={labels.sName} inputType='text' value={latestName} onChange={(e) => setLatestName(e.target.value)} />
                    <PrimaryLabel text={labels.bofstudy} inputType='text' value={latestBook} onChange={(e) => setLatestBook(e.target.value)} />
                    <PrimaryLabel text={labels.question} inputType='text' value={latestQuestion} onChange={(e) => setLatestQuestion(e.target.value)} />
                    <div onClick={handlePinLocation} >
                        Pin Location
                        <IconImports.FaMapMarkerAlt className="icon-locate" />
                    </div>
                    <Button text={buttons.add} onClick={handleAddStudent} />
                </form>
            </div>
        </div>
    );
}

export default NewStudents;
