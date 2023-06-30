import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase-config';
import { collection, query, orderBy, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { FaMapMarkerAlt, MdDelete, MdModeEditOutline } from '../../../assets/IconImports';
import { useNavigate } from 'react-router-dom';

type Student = {
  id: string;
  name: string;
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
          pinnedLocation: data.pinnedLocation,
        };
      });

      setStudents(studentData);
    };

    fetchStudents();
  }, []);

  const handleTraceLocation = (lat: number, lng: number) => {
    setTimeout(() => {
      window.open(`https://www.google.com/maps/dir//${lat},${lng}`, '_blank');
    }, 1500); 

  };

  const deleteStudent = async (studentId: string) => {
    try {
      const studentRef = doc(db, 'Students', studentId);
      await deleteDoc(studentRef);
      setStudents((prevStudents) => prevStudents.filter((student) => student.id !== studentId));
    } catch (error) {
      console.error('Error deleting student:', error);
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
            <div onClick={() => handleTraceLocation(student.pinnedLocation.lat, student.pinnedLocation.lng)}>
              Trace Location
              <FaMapMarkerAlt className="icon-locate" />
            </div>
            <MdDelete className="icon-delete" onClick={() => deleteStudent(student.id)} />
            <MdModeEditOutline className="icon-edit" onClick={() => editStudent(student.id)}/>
          </form>
        </div>
      ))}
    </div>
  );
};

export default StudentsList;
