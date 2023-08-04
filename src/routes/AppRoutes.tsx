import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LandingPage, LogIn, NewStudents, PopupRecorder, Report, Settings, SignUp, Students, SubmitReport, UpdateStudents } from '../pages';



const AppRoutes: React.FC = () => {
  const [activeRoute, setActiveRoute] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  // const navigate = useNavigate();

  // Get the current location
  const location = useLocation();

  // // Flag to track if user is coming from the login page
  // const isComingFromLogin = location.state?.fromLogin || false;

  // Update the active route when navigating
  useEffect(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveRoute(location.pathname);
      setIsTransitioning(false);
    }, 300);
  }, [location]);

  // useEffect(() => {
  //   const RememberMe = localStorage.getItem('RememberMe');
  //   const storedUsername = localStorage.getItem('Username');
  //   const storedPhoneNumber = localStorage.getItem('PhoneNumber');
  //   const storedPassword = localStorage.getItem('Password');

  //   if (RememberMe === 'true') {
  //     if (storedUsername || (storedPhoneNumber && storedPassword)) {
  //       const lastVisitedPage = localStorage.getItem('LastVisitedPage');
  //       if (lastVisitedPage && lastVisitedPage !== '/' && lastVisitedPage !== '/signup') {
  //         navigate(lastVisitedPage);
  //       } else {
  //         // Navigate to a default page when lastVisitedPage is not available or is the root/signup page
  //         navigate('/calendar'); // Replace '/dashboard' with the desired default page
  //       }
  //     } else {
  //       // Required credentials are not stored, redirect to the login page
  //       if (location.pathname !== '/' && location.pathname !== '/signup') {
  //         navigate('/');
  //       }
  //     }
  //   } else if (RememberMe === 'false') {
  //     // "Remember Me" is not set, redirect to the login page
  //     if (!isComingFromLogin) {
  //       if (location.pathname !== '/') {
  //         navigate('/');
  //       }
  //     }
  //   }

  //   if (location.pathname !== '/' && location.pathname !== '/signup') {
  //     // Check if the required credentials are stored
  //     if (!storedUsername || (!storedPhoneNumber && !storedPassword)) {
  //       // Required credentials are not stored, redirect to the login page
  //       if (location.pathname !== '/') {
  //         navigate('/');
  //       }
  //     }
  //   }
  // }, [navigate, location, isComingFromLogin]);

  // useEffect(() => {
  //   // Disable history navigation when on the calendar page
  //   if (location.pathname === '/calendar') {
  //     window.history.pushState(null, '', window.location.href);
  //     window.onpopstate = () => {
  //       window.history.go(1);
  //     };
  //   }
  // }, [location]);

  // useEffect(() => {
  //   // Save the last visited page in local storage
  //   localStorage.setItem('LastVisitedPage', location.pathname);
  // }, [location]);

  return (
    <Routes>

      {/* MAIN PAGES ROUTES */}
      <Route path="/" element={<LandingPage />}>
        <Route index element={<Report />} />
        <Route
          path="record-report"
          element={<div className={`transition-fade ${activeRoute === '/record-report/' ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <PopupRecorder />
            </div>
          </div>}
        />
        <Route
          path="submit-report"
          element={<div className={`transition-fade ${activeRoute === '/submit-report' ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <SubmitReport />
            </div>
          </div>}
        />
        <Route
          path="students"
          element={<div className={`transition-fade ${activeRoute === '/students' ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <Students />
            </div>
          </div>}
        />
        <Route
          path="students/new-students"
          element={<div className={`transition-fade ${activeRoute === '/students/new-students' ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <NewStudents />
            </div>
          </div>}
        />
        <Route path="students/update-students/:id" element={<UpdateStudents />} />
        <Route
          path="settings"
          element={<div className={`transition-fade ${activeRoute === '/settings' ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <Settings />
            </div>
          </div>}
        />
      </Route>



      {/* LOGIN & SIGN UP PAGES */}
      <Route
        path="/login"
        element={
          <div className={`transition-fade ${activeRoute === '/login' ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <LogIn />
            </div>
          </div>

        }
      />
      <Route
        path="/signup"
        element={
          <div className={`transition-fade ${activeRoute === '/signup' ? 'active' : ''}`}>
            <div style={{ opacity: isTransitioning ? 0 : 1 }}>
              <SignUp />
            </div>
          </div>

        }
      />

      <Route path="*" element={<h1 style={{ color: 'white', display: 'flex', justifyContent: 'center', alignContent: 'center', transform: 'translateY(40vh)' }}>Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
