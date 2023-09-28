import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase-config';
import { collection, query, orderBy, getDocs, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { IconImports } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../AuthContext";
import { DialogBox, Toast } from '../../../components';

type Student = {
  studentId: string;
  id: string;
  name: string;
  question: string;
  studentNumber: string;
  extraNotes: string;
  bookOfStudy: string;
  pinnedLocation: {
    lat: number;
    lng: number;
  };
};

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const navigate = useNavigate();
  const auth = useAuth();
  const [showConfirmationToast, setShowConfirmationToast] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [alerts, setAlerts] = useState<Array<{ id: number; message: string }>>([]);
  const [toast, showToast] = useState(false)


  const displayToast = () => {
    showToast(true);
  }

  // Function to add a new alert message
  const addAlert = (message: string) => {
    const newAlert = {
      id: Date.now(), // Unique identifier (you can use a library for better uniqueness)
      message: message,
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  // Function to remove an alert by its ID
  const removeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };


  const hideDeleteConfirmation = () => {
    setShowConfirmationToast(false);
  };

  const showDeleteConfirmation = (student: Student) => {
    setStudentToDelete(student);
    setShowConfirmationToast(true);
  };

  const callStudent = (phoneNumber: string) => {
    const telephoneUrl = `tel:+234${phoneNumber}`;
    setTimeout(() => {
      window.open(telephoneUrl, '_blank');
    }, 400);
  }




  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const studentsDocRef = doc(db, auth.currentUser.uid, 'Students');
        const studentsDocSnapshot = await getDoc(studentsDocRef);

        if (studentsDocSnapshot.exists()) {
          const studentsData = studentsDocSnapshot.data();
          const studentsArray: Student[] = [];

          for (const key in studentsData) {
            const studentData = studentsData[key];
            studentsArray.push({
              id: key,
              ...studentData,
            });
          }

          setStudents(studentsArray);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, [auth.currentUser]);

  const handleTraceLocation = (lat: number, lng: number) => {
    setTimeout(() => {
      window.open(`https://google.com/maps/place/?q=${lat},${lng}`, '_blank');
    }, 1500);

  };

  const deleteStudent = async (studentId: string) => {
    try {
      const studentsDocRef = doc(db, auth.currentUser.uid, 'Students');
      const studentsDocSnapshot = await getDoc(studentsDocRef);

      if (studentsDocSnapshot.exists()) {
        const studentsData = studentsDocSnapshot.data();

        if (studentsData) {
          const studentToDelete = studentsData[studentId];

          if (!studentToDelete) {
            displayToast();
            addAlert('Student not found');
            console.error('Student not found');
            return;
          }

          const updatedStudents = { ...studentsData };
          delete updatedStudents[studentId]; // Remove the student with the given studentId

          await setDoc(studentsDocRef, updatedStudents);

          setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
        }
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      displayToast();
      addAlert('Student Could Not Be Deleted!');
    }
  };


  const editStudent = (id: string) => {
    navigate(`/students/update-students/${id}`);
  };


  return (
    <div className="list-container">
      {students.map((student, index) => (
        <div className="popup text-white rounded students-list" key={index}>
          <form>
            <div className="main">
              <h3>{student.name}</h3>
              <p>{student.bookOfStudy}</p>
              <p>{student.question}</p>
              {student.pinnedLocation && student.pinnedLocation.lat > 0 && student.pinnedLocation.lng > 0 ? (
                <div className="trace" onClick={() => handleTraceLocation(student.pinnedLocation.lat, student.pinnedLocation.lng)}>
                  Trace Location
                  <IconImports.FaMapMarkerAlt className="icon-locate" />
                </div>
              ) : null}
            </div>
            <div className="icons">
              {student.studentNumber && (
                <IconImports.AiTwotonePhone className="icon" onClick={() => callStudent(student.studentNumber)} />
              )}
              <IconImports.MdDelete className="icon" onClick={() => showDeleteConfirmation(student)} />
              <IconImports.MdModeEditOutline className="icon" onClick={() => editStudent(student.id)} />
            </div>

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
      ))}
      {/* Render the ConfirmationToast component */}
      {showConfirmationToast && (
        <DialogBox
          show={showConfirmationToast}
          onConfirm={async () => {
            if (studentToDelete) {
              await deleteStudent(studentToDelete.id);
              hideDeleteConfirmation();
              displayToast();
              addAlert('Student deleted successfully!');
            }
          }}
          onClose={hideDeleteConfirmation}
          message={`Are you sure you want to delete this student?`}
        />
      )}


    </div>
  );
};

export default StudentsList;
