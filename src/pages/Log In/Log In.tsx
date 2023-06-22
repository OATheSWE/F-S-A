import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { labels, buttons } from '../../assets/data';
import PrimaryLabel from '../../components/Primary Label/Primary Label';
import Button from '../../components/Button/Button';
import RememberMe from '../../components/Remember Me/Remember Me';
import Footer from '../../components/Footer/Footer';

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [userOrPhone, setUserOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleUserOrPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserOrPhone(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  
    // Set the rememberMe flag in localStorage
    localStorage.setItem('RememberMe', !rememberMe ? 'true' : 'false');
  };

 const handleLoginSubmit = (event: React.FormEvent) => {
  event.preventDefault();

  // Retrieve user data from local storage
  const storedUsername = localStorage.getItem('Username');
  const storedPhoneNumber = localStorage.getItem('PhoneNumber');
  const storedPassword = localStorage.getItem('Password');

  // Check if the entered userOrPhone and password match the stored data
  if (
    (userOrPhone === storedUsername || userOrPhone === storedPhoneNumber) &&
    password === storedPassword
  ) {

    // Login successful, Navigate to the calendar page
    setTimeout(() => {
      navigate('/calender', { replace: true });
    }, 1000);
  } else {
    // Login failed, show an error message
    setErrorMessage('Invalid login credentials');
  }
};


  return (
    <div className="whole-container">
      <div className="popup text-white rounded login">
        <form onSubmit={handleLoginSubmit}>
          <h2>Log In</h2>
          <PrimaryLabel
            text={labels.userorphone}
            inputType="text"
            value={userOrPhone}
            onChange={handleUserOrPhoneChange}
          />
          <PrimaryLabel
            text={labels.password}
            inputType="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <RememberMe
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <Button text={buttons.login} onClick={handleLoginSubmit} />
          <Link to="/signup">Don't have an account yet?</Link>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LogIn;
