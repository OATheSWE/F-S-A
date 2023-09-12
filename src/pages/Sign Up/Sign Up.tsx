import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { buttons, labels } from '../../Data/data';
import { PrimaryLabel, Button, Footer } from '../../components';
import { collection, setDoc, doc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase-config';
import { AuthProvider } from '../../AuthContext';
import CryptoJS from 'crypto-js'

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [email, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [service, setService] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(true);
  const secretKey = import.meta.env.VITE_APP_SECRET_KEY;

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    setIsValid(!email.includes(' '));
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = event.target.value;
    setPhoneNumber(inputPhoneNumber);
    // setIsValidNumber(isValidPhoneNumber(inputPhoneNumber));
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setService(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignupSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const userName = email;
    const userPhoneNumber = phoneNumber;
    const overseerPhoneNumber = service;
    const userPassword = password;

    // Regular expression for validating phone number
    const phoneRegex = /^0[789][01]\d{8}$/;

    if (!phoneRegex.test(userPhoneNumber) || !phoneRegex.test(overseerPhoneNumber)) {
      alert('Please enter a valid phone number. eg 09022345715');
      return;
    }

    // Regular expression for validating password (at least one letter and one number)
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)/;

    if (!passwordRegex.test(userPassword)) {
      alert('Password must contain at least one letter and one number.');
      return;
    }

    if (!isValid) {
      alert('Username cannot contain spaces.');
      return;
    }

    try {
      // Create a new user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, `${userName}@example.com`, password);

      const userCollectionRef = collection(db, userCredential.user?.uid);
      const userDocRef = doc(userCollectionRef, "UserInfo");
      

      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // Create the month-ye if it doesn't exist
        await setDoc(userDocRef, {
          userName,
          userPhoneNumber,
          overseerPhoneNumber,
          userPassword
        });
      }


      const encryptedData1 = CryptoJS.AES.encrypt(userPhoneNumber, secretKey).toString();
      const encryptedData2 = CryptoJS.AES.encrypt("Yes", secretKey).toString();
      localStorage.setItem('Phone Number', encryptedData1);
      localStorage.setItem('Signed Up', encryptedData2);

      alert('Signup successful! Please verify your phone number.');

      // Navigate to phone number verification page
      navigate("/verifynumber");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error('Error signing up:', error.message);
      alert('Error signing up. Please try again!.');
    }
  };


  return (
    <AuthProvider >
    <div className="whole-container">
      <div className="popup text-white rounded signup">
        <form onSubmit={handleSignupSubmit}>
          <h2>Sign Up</h2>
          <PrimaryLabel
            text={labels.username}
            inputType="text"
            value={email}
            onChange={handleUsernameChange}
            placeholder="Eg chioma12"
            required={true}
          />
          <PrimaryLabel
            text={labels.phonenumber}
            inputType="number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Eg 09022345715"
            required={true}
          />
          <PrimaryLabel
            text={labels.service}
            inputType="number"
            value={service}
            onChange={handleServiceChange}
            placeholder="Eg 09022345715"
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
          <Button text={buttons.signup} />
          <Link to="/">Already have an account?</Link>
        </form>
      </div>
      <Footer />
    </div>
    </AuthProvider>
  );
};

export default SignUp;
