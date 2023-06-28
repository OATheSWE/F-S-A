import React, { useState, useEffect } from 'react';
import { db } from '../../../firebase-config';
import { collection, query, orderBy, limit, getDocs, DocumentData } from 'firebase/firestore';
import { FaMapMarkerAlt, MdDelete, MdModeEditOutline } from '../../../assets/IconImports';

type Student = {
  name: string;
  bookOfStudy: string;
  pinnedLocation: {
    lat: number;
    lng: number;
  };
};

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const fetchStudents = async () => {
      const studentsCollectionRef = collection(db, 'Students');
      const studentsQuery = query(studentsCollectionRef, orderBy('time', 'desc'));
      const querySnapshot = await getDocs(studentsQuery);

      const studentData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
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
            <MdDelete className="icon-delete" />
            <MdModeEditOutline className="icon-edit" />
          </form>
        </div>
      ))}
    </div>
  );
};

export default StudentsList;
