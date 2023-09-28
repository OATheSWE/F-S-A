import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { labels, buttons } from "../../Data/data";
import { PrimaryLabel, Button, Footer, Toast } from "../../components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDoc, doc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { useAuth } from "../../AuthContext";

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // Access the login function from the AuthContext
  const [alerts, setAlerts] = useState<Array<{ id: number; message: string }>>([]);
  const [toast, showToast] = useState(false)


  const displayToast = () => {
    showToast(true);
  }

  // Function to add a new alert message
  const addAlert = (message: string) => {
    const newAlert = {
      id: Date.now(), // Unique identifier (you can use a library for better uniqueness)
      message: message,
    };
    setAlerts((prevAlerts) => [...prevAlerts, newAlert]);
  };

  // Function to remove an alert by its ID
  const removeAlert = (id: number) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      // Log in the user using their email or phone number
      const userCredential = await signInWithEmailAndPassword(
        auth,
        `${userName}@example.com`,
        password
      );

      // Retrieve the user data from Firestore
      const userCollectionRef = collection(db, userCredential.user?.uid);
      const userDocRef = doc(userCollectionRef, "UserInfo");

      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        // Call the login function from the AuthContext
        login();
        // Check Phone Auth file for more info
        localStorage.removeItem('Signed Up');

        displayToast();

        addAlert('Login Successful');

        // User exists, redirect to the home page or any other protected page
        // navigate("/");
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        addAlert("User data not found. Please sign up first.");
      }
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      displayToast();
      addAlert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="whole-container">
      <div className="popup text-white rounded login">
        <form onSubmit={handleLoginSubmit}>
          <h2>Log In</h2>
          <PrimaryLabel
            text={labels.username}
            inputType="text"
            value={userName}
            onChange={handleUserNameChange}
            placeholder="Eg chioma12 or 09022345715"
            required={true}
          />
          <PrimaryLabel
            text={labels.password}
            inputType="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Eg 22224e"
            required={true}
          />
          <Button text={buttons.login} />
          <Link to="/signup">Don't have an account yet?</Link>
        </form>
        {/* Render alert messages */}
        {alerts.map((alert) => (
          <Toast
            show={toast}
            key={alert.id}
            message={alert.message}
            onClose={() => removeAlert(alert.id)}
          />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default LogIn;
