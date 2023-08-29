import React, { useState, useRef, useEffect } from 'react';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';
import { useAuth } from "../../AuthContext";


interface LabelProps {
    text: string;
    inputType?: string;
    selectedValues?: string[];
    onSelectMultiple?: (selectedValues: string[]) => void;
    value: string;
    selectedValue?: string;
    onChange?: (value: string[]) => void;
    disabled?: boolean;
    array?: string[];
}

const SecondaryLabel2: React.FC<LabelProps> = ({ text, value, onSelectMultiple, }) => {



    const labelRef = useRef<HTMLLabelElement>(null);

    const [isMenuVisible, setMenuVisible] = useState(false);
    const [students, setStudents] = useState<string[]>([]);
    const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
    const auth = useAuth();


    useEffect(() => {
    const getStudentNames = async () => {
        if (auth.currentUser) {
            const studentsDocRef = doc(db, auth.currentUser.uid, 'Students');
            const studentDocSnapshot = await getDoc(studentsDocRef);

            if (studentDocSnapshot.exists()) {
                const studentData = studentDocSnapshot.data();
                const studentNames = Object.values(studentData).map((student) => student.name);
                setStudents(studentNames);
            }
        }
    };

    getStudentNames();
}, []);


    useEffect(() => {

        const handler = (e: MouseEvent) => {
            if (labelRef.current?.contains(e.target as Node) || !labelRef.current?.contains(e.target as Node)) {
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
        <label ref={labelRef} >
            {text}
            <div className="select rounded">
                <div className="dropdown-toggle" onClick={handleMenu}>
                    {value}
                </div>
                <ul className="dropdown-menu" style={dropdownStyle}>
                    {students &&
                        students.map((student, index) => (
                            <li
                                className={`dropdown-item rounded ${selectedStudents.includes(student) ? 'selected' : ''
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

export default SecondaryLabel2;