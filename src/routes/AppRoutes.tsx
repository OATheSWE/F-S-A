// routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Report from '../pages/Report/report';
import PopupRecorder from '../pages/Report/Record Report/Popup Recorder';
import SubmitReport from '../pages/Submit Report/Submit Report';
import LogIn from "../pages/Log In/Log In.tsx";
import Settings from "../pages/Settings/Settings.tsx";
import Students from "../pages/Students/Students.tsx";
import NewStudents from "../pages/Students/New Students/New Students.tsx";
import SignUp from "../pages/Sign Up/Sign Up.tsx";


const AppRoutes: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/calender" element={<Report />} />
                <Route path="/calender/record report" element={<PopupRecorder />} />
                <Route path="/submit report" element={<SubmitReport />} />
                <Route path="/students" element={<Students />} />
                <Route path="/students/new student" element={<NewStudents />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
