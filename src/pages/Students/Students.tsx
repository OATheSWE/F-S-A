import React, { useState } from 'react';
import { IconImports } from '../../assets';
import { useNavigate } from 'react-router-dom';
import StudentsList from './Students List/Students List';
import { db } from '../../firebase-config';
import { collection, addDoc } from 'firebase/firestore';



const Students: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();
  const studentsCollectionRef = collection(db, 'Students');

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

        // Add the new student document to the Firestore collection
        await addDoc(studentsCollectionRef, newStudent);

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
