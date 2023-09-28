import React, { useState, useEffect, useContext } from "react";
import { PrimaryLabel, Button, Toast } from "../../components";
import { buttons, labels } from "../../Data/data";
import { db, auth } from "../../firebase-config";
import { updateDoc, doc, collection, getDoc } from "firebase/firestore";
import { useAuth } from "../../AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import { User as FirebaseAuthUser, updateEmail, updatePassword } from "firebase/auth";





const Settings = () => {
  const [userName, setUsername] = useState("");
  const [userPhoneNumber, setPhoneNumber] = useState("");
  const [overseerPhoneNumber, setOverseerNumber] = useState("");
  const [userPassword, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const authenticate = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
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

  

  useEffect(() => {
    // Fetch user info from the database here and populate the state variables
    const fetchUserInfo = async () => {
      try {
        const userCollectionRef = collection(db, authenticate.currentUser?.uid);
       
        const userDocRef = doc(userCollectionRef, "UserInfo");

        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          setUsername(userData.userName);
          setPhoneNumber(userData.userPhoneNumber);
          setOverseerNumber(userData.overseerPhoneNumber);
          setPassword(userData.userPassword);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();

    setHasChanges(false);
  }, []); // Empty dependency array means this effect runs once on component mount


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
  
    if (name === "userName") setUsername(value);
    if (name === "userPhoneNumber") setPhoneNumber(value);
    if (name === "overseerPhoneNumber") setOverseerNumber(value);
    if (name === "userPassword") setPassword(value);
  
    setHasChanges(true);
  };
  



  const handleSave = async (e: any) => {
    e.preventDefault();

    // Regular expression for validating phone number
    const phoneRegex = /^\d{11}$/; // Matches 11 digits

    if (!phoneRegex.test(userPhoneNumber) || !phoneRegex.test(overseerPhoneNumber)) {
      displayToast();
      addAlert('Please enter valid phone number (11 digits).');
      return;
    }

    // Regular expression for validating password (at least one letter and one number)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

    if (!passwordRegex.test(userPassword)) {
      displayToast();
      addAlert('Password must contain at least one letter and one number.');
      return;
    }

    try {
      // Update user info in the database
      const userDocRef = doc(db, authenticate.currentUser?.uid, "UserInfo");

      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        // Compare the fetched values with the entered values
        const emailChanged = userName !== userData.userName;
        const passwordChanged = userPassword !== userData.userPassword;

        // Update user info in the database
        await updateDoc(userDocRef, {
          userName,
          userPhoneNumber,
          overseerPhoneNumber,
          userPassword,
        });

        // Execute email update function if email was changed
        if (emailChanged) {
          await handleEmailUpdate();
        }

        // Execute password update function if password was changed
        if (passwordChanged) {
          await handlePasswordUpdate();
        }

        setHasChanges(false);
        setIsEditing(false);

        displayToast();

        addAlert("User info updated successfully!");
      }
    } catch (error) {
      console.error("Error updating user info:", error);
      displayToast();
      addAlert("An error occurred while updating user info.");
    }
  };

  const handleEmailUpdate = async () => {
    const user = authenticate.currentUser;
    if (!user) {
      console.error('No user found.');
      return;
    }

    try {
      const newEmail = `${userName}@example.com`
      await updateEmail(user as FirebaseAuthUser, newEmail);
      console.log(user);
      // Email updated successfully
    } catch (error) {
      console.error('Error updating email:', error);
    }
  };

  const handlePasswordUpdate = async () => {
    const user = authenticate.currentUser;
    if (!user) {
      console.error('No user found.');
      return;
    }

    try {
      const newPassword = userPassword;
      await updatePassword(user as FirebaseAuthUser, newPassword);
      // Password updated successfully
    } catch (error) {
      console.error('Error updating password:', error);
    }
  };

  return (
    <div className="whole-container">
      <div className="popup text-white rounded settings">
        <form onSubmit={handleSave}>
          <h2>Settings</h2>
          <PrimaryLabel
            text={labels.username}
            inputType="text"
            name="userName"
            value={userName}
            onChange={handleInputChange}
          />
          <PrimaryLabel
            text={labels.phonenumber}
            inputType="number"
            name="userPhoneNumber"
            value={userPhoneNumber}
            onChange={handleInputChange}
          />
          <PrimaryLabel
            text={labels.service}
            inputType="number"
            name="overseerPhoneNumber"
            value={overseerPhoneNumber}
            onChange={handleInputChange}
          />
          <PrimaryLabel
            text={labels.password}
            inputType="text"
            name="userPassword"
            value={userPassword}
            onChange={handleInputChange}
          />
          {hasChanges === true && <Button type="submit" text={buttons.save} />}
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
    </div>
  );

};

export default Settings;
