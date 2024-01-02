import React, { useState } from 'react';
import { IconImports } from '../../assets';
import { useNavigate } from 'react-router-dom';
import StudentsList from './Students List/Students List'; // Import the StudentsList component
import { db } from '../../firebase-config';
import { collection, addDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { useAuth } from "../../AuthContext";

// Functional component for managing students
const Students: React.FC = () => {
  // State variables for managing student name, navigation, and authentication
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();
  const auth = useAuth();

  // Function to handle input change for student name
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentName(event.target.value);
  };

  // Function to handle adding a new student
  const handleAddStudent = async (event: React.FormEvent) => {
    event.preventDefault();

    if (studentName) {
      try {
        // Create a new student object with name and current time
        const newStudent = {
          name: studentName,
          time: (new Date()).getTime()
        };

        // Reference to the 'Students' collection in Firestore
        const studentsDocRef = doc(db, auth.currentUser?.uid, 'Students');

        // Get the current snapshot of the 'Students' document
        const newStudentsDocSnapshot = await getDoc(studentsDocRef);

        // If the document doesn't exist, create it with an empty object
        if (!newStudentsDocSnapshot.exists()) {
          await setDoc(studentsDocRef, {});
        }

        // Get the existing students data
        const existingStudents = newStudentsDocSnapshot.data();

        // Create a new object inside the main object with the new student
        const updatedStudents = {
          ...existingStudents,
          [studentName]: newStudent,
        };

        // Save the updated students data back to Firestore
        await setDoc(studentsDocRef, updatedStudents);

        // Reset the input field after successful addition
        setStudentName('');

        // Optionally, show a success message to the user
        console.log('Student added successfully!');

        // Navigate to the 'new-students' page
        navigate('/students/new-students');
      } catch (error) {
        // Handle error if the student addition fails
        console.error('Error adding student:', error);
      }
    }
  };

  // Render the Students component
  return (
    <div className="whole-container">
      <div className="popup text-white rounded students">
        {/* Form for adding a new student */}
        <form onSubmit={handleAddStudent}>
          <h2>Students</h2>
          <label>
            {/* Input field for entering student name */}
            <input
              type="text"
              className="rounded"
              placeholder='Student Name'
              value={studentName}
              onChange={handleInputChange}
            />
            {/* Button to submit the form and add a new student */}
            <button type="submit" className="rounded" disabled={!studentName}>
              <IconImports.AiOutlinePlus className="plus-icon" />
            </button>
          </label>
        </form>
      </div>
      {/* Render the StudentsList component */}
      <StudentsList />
    </div>
  );
};

export default Students;
