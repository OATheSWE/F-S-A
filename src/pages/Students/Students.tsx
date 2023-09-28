import React, { useState } from 'react';
import { IconImports } from '../../assets';
import { useNavigate } from 'react-router-dom';
import StudentsList from './Students List/Students List';
import { db } from '../../firebase-config';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from "../../AuthContext";




const Students: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentName(event.target.value);
  };

  const handleAddStudent = async (event: React.FormEvent) => {
    event.preventDefault();

    if (studentName) {
      try {
        const newStudent = {
          name: studentName,
          time: (new Date()).getTime()
        };

        const studentsDocRef = doc(db, auth.currentUser?.uid, 'Students');

        const newStudentsDocSnapshot = await getDoc(studentsDocRef);

        if (!newStudentsDocSnapshot.exists()) {
          await setDoc(studentsDocRef, {});
        }

       
        const existingStudents = newStudentsDocSnapshot.data();

        // Create a new object inside the main object with the report for the current day
        const updatedStudents = {
          ...existingStudents,
          [studentName]: newStudent,
        };

        await setDoc(studentsDocRef, updatedStudents);


        // Reset the input field after successful addition
        setStudentName('');

        // Optionally, show a success message to the user
        console.log('Student added successfully!');

        // Navigate to desired page
        navigate('/students/new-students');
      } catch (error) {
        // Handle error if the student addition fails
        console.error('Error adding student:', error);
      }
    }
  };



  return (
    <div className="whole-container">
      <div className="popup text-white rounded students">
        <form onSubmit={handleAddStudent}>
          <h2>Students</h2>
          <label>
            <input
              type="text"
              className="rounded"
              placeholder='Student Name'
              value={studentName}
              onChange={handleInputChange}
            />
            <button type="submit" className="rounded" disabled={!studentName}>
              <IconImports.AiOutlinePlus className="plus-icon" />
            </button>
          </label>
        </form>
      </div>
      <StudentsList />
    </div>
  );
};

export default Students;
