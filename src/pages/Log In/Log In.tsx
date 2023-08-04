import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { labels, buttons } from '../../Data/data';
import { PrimaryLabel, Button, RememberMe, Footer } from '../../components';

const LogIn: React.FC = () => {
  const navigate = useNavigate();
  const [userOrPhone, setUserOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUserOrPhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserOrPhone(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  
    // Set the rememberMe flag in localStorage
    localStorage.setItem('Remember Me', !rememberMe ? 'true' : 'false');
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
      setError('');
      setSuccess('Login Successful');
      
      // Login successful, Navigate to the calendar page
      setTimeout(() => {
        navigate('/calendar', { replace: true });
      }, 1500);
    } else {
      // Login failed, show an error message
      setError('Invalid login credentials');
      setSuccess('');
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
            placeholder="Eg chioma12 or 09022345715"
          />
          <PrimaryLabel
            text={labels.password}
            inputType="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Eg 22224e"
          />
          <RememberMe
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message" >{error}</p>}
          <Button text={buttons.login} onClick={handleLoginSubmit} />
          <Link to="/signup">Don't have an account yet?</Link>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default LogIn;
