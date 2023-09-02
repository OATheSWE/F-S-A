/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import {
  LandingPage,
  LogIn,
  NewStudents,
  PhoneAuth,
  PopupRecorder,
  Report,
  Settings,
  SignUp,
  Students,
  SubmitReport,
  UpdateStudents,
} from "../pages";
import { useAuth } from "../AuthContext";

const AppRoutes = () => {
  const [activeRoute, setActiveRoute] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [cameFromSignup, setCameFromSignup] = useState(false); // Track if user came from signup route

  const location = useLocation();
  const navigate = useNavigate();

  // Update the active route when navigating
  useEffect(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveRoute(location.pathname);
      setIsTransitioning(false);
    }, 300);
  }, [location]);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  // Check if user came from signup route
  useEffect(() => {
    if (location.state && location.state.cameFromSignup) {
      setCameFromSignup(true);
    }
  }, [location.state]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Routes>
      {isAuthenticated ? (
        /* MAIN PAGES ROUTES */
        <Route path="/" element={<LandingPage />}>
          <Route
            index
            element={<Report />}
          />
          <Route
            path="record-report"
            element={
              <div
                className={`transition-fade ${activeRoute === "/record-report/" ? "active" : ""}`}
              >
                <div style={{ opacity: isTransitioning ? 0 : 1 }}>
                  <PopupRecorder />
                </div>
              </div>
            }
          />
          <Route
            path="submit-report"
            element={
              <div
                className={`transition-fade ${activeRoute === "/submit-report" ? "active" : ""}`}
              >
                <div style={{ opacity: isTransitioning ? 0 : 1 }}>
                  <SubmitReport />
                </div>
              </div>
            }
          />
          <Route
            path="students"
            element={
              <div
                className={`transition-fade ${activeRoute === "/students" ? "active" : ""}`}
              >
                <div style={{ opacity: isTransitioning ? 0 : 1 }}>
                  <Students />
                </div>
              </div>
            }
          />
          <Route
            path="students/new-students"
            element={
              <div
                className={`transition-fade ${activeRoute === "/students/new-students" ? "active" : ""}`}
              >
                <div style={{ opacity: isTransitioning ? 0 : 1 }}>
                  <NewStudents />
                </div>
              </div>
            }
          />
          <Route
            path="students/update-students/:id"
            element={<UpdateStudents />}
          />
          <Route
            path="settings"
            element={
              <div
                className={`transition-fade ${activeRoute === "/settings" ? "active" : ""}`}
              >
                <div style={{ opacity: isTransitioning ? 0 : 1 }}>
                  <Settings />
                </div>
              </div>
            }
          />
        </Route>
      ) : (
        /* AUTH PAGES */
        <Route path="/">
          <Route index element={<LogIn />} />
          <Route
            path="signup"
            element={
              <div
                className={`transition-fade ${activeRoute === "/signup" ? "active" : ""}`}
              >
                <div style={{ opacity: isTransitioning ? 0 : 1 }}>
                  <SignUp />
                </div>
              </div>
            }
          />
          <Route
            path="verifynumber"
            element={
              <div
                className={`transition-fade ${activeRoute === "/verifynumber" ? "active" : ""}`}
              >
                <div style={{ opacity: isTransitioning ? 0 : 1 }}>
                  <PhoneAuth />
                </div>
              </div>
            }
          />
          

        </Route>
      )}

      <Route
        path="*"
        element={
          <h1
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignContent: "center",
              transform: "translateY(40vh)",
            }}
          >
            Not Found
          </h1>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
