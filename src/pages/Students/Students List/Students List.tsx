import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase-config';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { IconImports } from '../../../assets';
import { useNavigate } from 'react-router-dom';

type Student = {
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

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollectionRef = collection(db, 'Students');
      const studentsQuery = query(studentsCollectionRef, orderBy('time', 'desc'));
      const querySnapshot = await getDocs(studentsQuery);

      const studentData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
          bookOfStudy: data.bookOfStudy,
          question: data.question,
          pinnedLocation: data.pinnedLocation,
        };
      });

      setStudents(studentData);
    };

    fetchStudents();
  }, []);

  const handleTraceLocation = (lat: number, lng: number) => {
    setTimeout(() => {
      window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank');
    }, 1500);

  };

  const deleteStudent = async (studentId: string) => {
    try {
      const studentRef = doc(db, 'Students', studentId);
      const result = confirm("Do you want to delete this student?");
  
      if (result) {
        await deleteDoc(studentRef);
        setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
        alert('Student Deleted Successfully!');
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
            <div onClick={() => handleTraceLocation(student.pinnedLocation.lat, student.pinnedLocation.lng)}>
              Trace Location
              <IconImports.FaMapMarkerAlt className="icon-locate" />
            </div>
            <IconImports.MdDelete className="icon-delete" onClick={() => deleteStudent(student.id)} />
            <IconImports.MdModeEditOutline className="icon-edit" onClick={() => editStudent(student.id)} />
          </form>
        </div>
      ))}
    </div>
  );
};

export default StudentsList;
