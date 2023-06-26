import React, { useState } from 'react';
import { AiOutlinePlus } from '../../assets/IconImports';
import { useNavigate } from 'react-router-dom';
import StudentsList from './Students List/Students List';
import Footer from '../../components/Footer/Footer';
import Navbar from '../../components/Navbar/Navbar';

const Students: React.FC = () => {
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStudentName(event.target.value);
  };

  const handleAddStudent = (event: React.FormEvent) => {
    event.preventDefault();
    navigate('/students/new-students');
  };

  return (
    <div className="whole-container">
        <Navbar />
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
              <AiOutlinePlus className="plus-icon" />
            </button>
          </label>
        </form>
      </div>
      <StudentsList />
      <Footer />
    </div>
  );
};

export default Students;
