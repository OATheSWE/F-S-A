import React, { useState, useRef, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';


interface LabelProps {
    text: string;
  inputType?: string;
  array: string[];
  onClick?: (value: string) => void;
  selectedValues?: string[];
  onSelectMultiple?: (selectedValues: string[]) => void;
  value: string;
  selectedValue?: string;
  onChange?:  (value: string[]) => void;
}

const SecondaryLabel: React.FC<LabelProps> = ({ text, array, onClick, value, onSelectMultiple }) => {

    

    const labelRef = useRef<HTMLLabelElement>(null);

    const [isMenuVisible, setMenuVisible] = useState(false);
    const [students, setStudents] = useState<string[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);


    useEffect(() => {
        const getStudents = async () => {
          const studentsCollectionRef = collection(db, 'Students');
          const snapshot = await getDocs(studentsCollectionRef);
          const studentNames = snapshot.docs.map((doc) => doc.data().name);
          setStudents(studentNames);
        };
    
        getStudents();
      }, []);

    useEffect(() => {

        const handler = (e: MouseEvent) => {
          if (labelRef.current?.contains(e.target as Node)) {
            setMenuVisible(false);
          }

    
        }
        document.addEventListener("mousedown", handler);
    
        return () => {
          document.removeEventListener("mousedown", handler);
        };
    }, []);

    const handleMenu = () => {
        setMenuVisible(!isMenuVisible);
    };

    const dropdownStyle: React.CSSProperties = {
        visibility: isMenuVisible ? 'visible' : 'hidden',
        transform: isMenuVisible ? 'translateY(0.7rem)' : 'translateY(2.5rem)',
        opacity: isMenuVisible ? '1' : '0',
    };

    const handleStudentSelection = (selectedStudent: string) => {
        const isSelected = selectedStudents.includes(selectedStudent);
        let updatedSelectedStudents: string[];
    
        if (isSelected) {
          updatedSelectedStudents = selectedStudents.filter((student) => student !== selectedStudent);
        } else {
          updatedSelectedStudents = [...selectedStudents, selectedStudent];
        }
    
        setSelectedStudents(updatedSelectedStudents);
        onSelectMultiple?.(updatedSelectedStudents);
    };

    


    return (
        <label ref={labelRef}>
            {text}
            <div className="select rounded">
                <div className="dropdown-toggle" onClick={handleMenu}>
                    {value}
                </div>
                <ul className="dropdown-menu" style={dropdownStyle}>
                {array &&
            array.map((time, index) => (
              <li
                className={`dropdown-item rounded ${
                  selectedStudents.includes(time) ? 'selected' : ''
                }`}
                key={index}
                onClick={() => {
                  onClick?.(time);
                }}
              >
                {time}
              </li>
            ))}
          {students &&
            students.map((student, index) => (
              <li
                className={`dropdown-item rounded ${
                  selectedStudents.includes(student) ? 'selected' : ''
                }`}
                key={index}
                onClick={() => handleStudentSelection(student)}
              >
                {student}
              </li>
            ))}
                </ul>
            </div>
        </label>
    );
};

export default SecondaryLabel;