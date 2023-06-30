import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Report from '../pages/Report/report';
import PopupRecorder from '../pages/Report/Record Report/Popup Recorder';
import SubmitReport from '../pages/Submit Report/Submit Report';
import LogIn from '../pages/Log In/Log In.tsx';
import Settings from '../pages/Settings/Settings.tsx';
import Students from '../pages/Students/Students.tsx';
import NewStudents from '../pages/Students/New Students/New Students.tsx';
import SignUp from '../pages/Sign Up/Sign Up.tsx';
import UpdateStudents from '../pages/Students/Students List/Update Students/Update Students.tsx';

const AppRoutes: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  // Get the current location
  const location = useLocation();

  // Flag to track if user is coming from the login page
  const isComingFromLogin = location.state?.fromLogin || false;

  // Update the active route when navigating
  useEffect(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveRoute(location.pathname);
      setIsTransitioning(false);
    }, 300);
  }, [location]);

  useEffect(() => {
    const RememberMe = localStorage.getItem('RememberMe');
    const storedUsername = localStorage.getItem('Username');
    const storedPhoneNumber = localStorage.getItem('PhoneNumber');
    const storedPassword = localStorage.getItem('Password');

    if (RememberMe === 'true') {
      if (storedUsername || (storedPhoneNumber && storedPassword)) {
        const lastVisitedPage = localStorage.getItem('LastVisitedPage');
        if (lastVisitedPage && lastVisitedPage !== '/' && lastVisitedPage !== '/signup') {
          navigate(lastVisitedPage);
        } else {
          // Navigate to a default page when lastVisitedPage is not available or is the root/signup page
          navigate('/calendar'); // Replace '/dashboard' with the desired default page
        }
      } else {
        // Required credentials are not stored, redirect to the login page
        if (location.pathname !== '/' && location.pathname !== '/signup') {
          navigate('/');
        }
      }
    } else if (RememberMe === 'false') {
      // "Remember Me" is not set, redirect to the login page
      if (!isComingFromLogin) {
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
    }

    if (location.pathname !== '/' && location.pathname !== '/signup') {
      // Check if the required credentials are stored
      if (!storedUsername || (!storedPhoneNumber && !storedPassword)) {
        // Required credentials are not stored, redirect to the login page
        if (location.pathname !== '/') {
          navigate('/');
        }
      }
    }
  }, [navigate, location, isComingFromLogin]);

  useEffect(() => {
    // Disable history navigation when on the calendar page
    if (location.pathname === '/calendar') {
      window.history.pushState(null, '', window.location.href);
      window.onpopstate = () => {
        window.history.go(1);
      };
    }
  }, [location]);

  useEffect(() => {
    // Save the last visited page in local storage
    localStorage.setItem('LastVisitedPage', location.pathname);
  }, [location]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className={`transition-fade ${activeRoute === '/' ? 'active' : ''}`}>
            <LogIn />
          </div>
        }
      />
      <Route
        path="/calendar"
        element={
          <div className={`transition-fade ${activeRoute.includes('/calendar') ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <Report />
            </div>
          </div>
        }
      />

      <Route
        path="/calendar/record-report"
        element={
          <div className={`transition-fade ${activeRoute.includes('/calendar/record-report') ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <PopupRecorder />
            </div>
          </div>
        }
      />
      <Route
        path="/submit-report"
        element={
          <div className={`transition-fade ${activeRoute.includes('/submit-report') ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <SubmitReport />
            </div>
          </div>
        }
      />
      <Route
        path="/students"
        element={
          <div className={`transition-fade ${activeRoute.includes('/students') ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <Students />
            </div>
          </div>
        }
      />
      <Route
        path="/students/new-students"
        element={
          <div className={`transition-fade ${activeRoute.includes('/students/new-students') ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <NewStudents />
            </div>
          </div>
        }
      />
      <Route path="/students/update-students/:id" element={<UpdateStudents />} />
      <Route
        path="/settings"
        element={
          <div className={`transition-fade ${activeRoute.includes('/settings') ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <Settings />
            </div>
          </div>
        }
      />
      <Route
        path="/signup"
        element={
          <div className={`transition-fade ${activeRoute.includes('/signup') ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <SignUp />
            </div>
          </div>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
