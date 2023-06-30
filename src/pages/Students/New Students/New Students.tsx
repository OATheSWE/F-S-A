import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from '../../../assets/IconImports';
import PrimaryLabel from '../../../components/Primary Label/Primary Label';
import { buttons, labels } from '../../../assets/data';
import Button from '../../../components/Button/Button';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';
import { db } from '../../../firebase-config'; // Make sure to import the Firebase configuration
import { collection, getDocs, query, orderBy, limit, updateDoc,  } from 'firebase/firestore'; // Import Firestore functionalities

import { useNavigate } from 'react-router-dom';


const NewStudents: React.FC = () => {
    const [latestName, setLatestName] = useState('');
    const [latestBook, setLatestBook] = useState('');
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

        if (latestName && latestBook && pinLocation) {
            try {
                const newStudent = {
                    name: latestName,
                    bookOfStudy: latestBook,
                    pinnedLocation: pinLocation,
                    time: (new Date()).getTime()
                };

                const studentsCollectionRef = collection(db, 'Students');
                const querySnapshot = query(studentsCollectionRef, orderBy('time', 'desc'), limit(1));
                const latestDoc = await getDocs(querySnapshot);
                const doc = latestDoc.docs[0];

                await updateDoc(doc.ref, newStudent);

                // Optionally, show a success message to the user
                console.log('Student updated successfully!');

                // Reset the input fields after successful update
                setLatestName('');
                setLatestBook('');


                // Navigate to desired page
                navigate('/students');
            } catch (error) {
                // Handle error if the student update fails
                console.error('Error updating student:', error);
            }
        }
    };




    return (
        <div className="whole-container">
            <Navbar />
            <div className="popup text-white rounded new-students">
                <form>
                    <PrimaryLabel text={labels.sName} inputType='text' value={latestName} onChange={(e) => setLatestName(e.target.value)} />
                    <PrimaryLabel text={labels.bofstudy} inputType='text' value={latestBook} onChange={(e) => setLatestBook(e.target.value)} />
                    <div onClick={handlePinLocation} >
                        Pin Location
                        <FaMapMarkerAlt className="icon-locate" />
                    </div>
                    <Button text={buttons.add} onClick={handleAddStudent}/>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default NewStudents;
