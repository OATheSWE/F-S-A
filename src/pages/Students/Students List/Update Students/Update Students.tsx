import React, { useState, useEffect } from 'react';
import { FaMapMarkerAlt } from '../../../../assets/IconImports';
import PrimaryLabel from '../../../../components/Primary Label/Primary Label';
import { buttons, labels } from '../../../../assets/data';
import Button from '../../../../components/Button/Button';
import Footer from '../../../../components/Footer/Footer';
import Navbar from '../../../../components/Navbar/Navbar';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../../../../firebase-config';
import { updateDoc, doc, collection, getDoc } from 'firebase/firestore';

type Student = {
  id: string;
  name: string;
  bookOfStudy: string;
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
  const [updatedLocation, setUpdatedLocation] = useState({ lat: 0, lng: 0 });


  // Fetch todos from Firestore on component mount
  useEffect(() => {
    const fetchTodo = async () => {
      const studentsCollection = collection(db, "Students");
      const studentRef = doc(studentsCollection, id);
      const studentSnapshot = await getDoc(studentRef);
      if (studentSnapshot.exists()) {
        const studentData = studentSnapshot.data() as Student;
        setUpdatedName(studentData.name);
        setUpdatedBook(studentData.bookOfStudy);
      } else {
        navigate("/students");
      }
    };

    fetchTodo();
  }, [db, id, navigate]);

  const handleUpdateLocation = () => {
    // Use the Geolocation API to retrieve the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const updatedLocation = { lat: latitude, lng: longitude };
        setUpdatedLocation(updatedLocation);
        alert('Location Updated Successfully!');
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    
    const studentsCollection = collection(db, "Students");
    const studentRef = doc(studentsCollection, id);

    try {
      const updatedStudent = {
        name: updatedName,
        bookOfStudy: updatedBook,
        pinnedLocation: updatedLocation,
        time: (new Date()).getTime()
      };
      await updateDoc(studentRef, updatedStudent);
      navigate("/students");
    } catch (error) {
      console.error("Error updating students: ", error);
    }
  };


  return (
    <div className="whole-container">
      <Navbar />
      <div className="popup text-white rounded new-students">
        <form onSubmit={handleUpdate}>
          <PrimaryLabel text={labels.name} inputType="text" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
          <PrimaryLabel
            text={labels.bofstudy} inputType="text" value={updatedBook} onChange={(e) => setUpdatedBook(e.target.value)} />
          <div onClick={handleUpdateLocation} style={{ width: '60%' }}>
            Update Location
            <FaMapMarkerAlt className="icon-locate" />
          </div>
          <Button text={buttons.update}/>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateStudents;
