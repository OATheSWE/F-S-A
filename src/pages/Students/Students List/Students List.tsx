import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase-config';
import { collection, query, orderBy, getDocs, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import { IconImports } from '../../../assets';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../AuthContext";

type Student = {
  studentId: string;
  id: string;
  name: string;
  question: string;
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
      window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
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
            console.error('Student not found');
            return;
          }

          const result = window.confirm(`Do you want to delete the student - ${studentToDelete.name}?`);

          if (result) {
            const updatedStudents = { ...studentsData };
            delete updatedStudents[studentId]; // Remove the student with the given studentId

            await setDoc(studentsDocRef, updatedStudents);

            setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
            alert('Student Deleted Successfully!');
          }
        }
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Student Could Not Be Deleted!');
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
            <h3>{student.name}</h3>
            <p>{student.bookOfStudy}</p>
            <p>{student.question}</p>
            {student.pinnedLocation && student.pinnedLocation.lat > 0 && student.pinnedLocation.lng > 0 ? (
              <div onClick={() => handleTraceLocation(student.pinnedLocation.lat, student.pinnedLocation.lng)}>
                Trace Location
                <IconImports.FaMapMarkerAlt className="icon-locate" />
              </div>
            ) : null}
            <IconImports.MdDelete className="icon-delete" onClick={() => deleteStudent(student.id)} />
            <IconImports.MdModeEditOutline className="icon-edit" onClick={() => editStudent(student.id)} />
          </form>
        </div>
      ))}
    </div>
  );
};

export default StudentsList;
