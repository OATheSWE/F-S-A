import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PrimaryLabel from '../../components/Primary Label/Primary Label';
import { buttons, labels } from '../../assets/data';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [service, setService] = useState('');
  const [password, setPassword] = useState('');
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePhoneNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputPhoneNumber = event.target.value;
    setPhoneNumber(inputPhoneNumber);
    setIsValidNumber(isValidPhoneNumber(inputPhoneNumber));
  };

  const handleServiceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setService(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSignupSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Check if any of the fields are empty
    if (!username || !phoneNumber || !service || !password) {
      setSuccess('');
      setError('Please fill in all the fields');
      return;
    }

    // Store user data in local storage
    localStorage.setItem('Username', username);
    localStorage.setItem('PhoneNumber', phoneNumber);
    localStorage.setItem('Phone Number of Service Overseer', service);
    localStorage.setItem('Password', password);

    
    // Alert User & Navigate to the Login Page
    if (username || phoneNumber || service || password) {
      setError('');
      setSuccess('Signup Successful');
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 2500);
      return;
    }

    // Navigate to the main page
    setTimeout(() => {
      navigate('/calendar', { replace: true });
    }, 1000);
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    // Regular expression for validating phone number
    const phoneRegex = /^[0-9]+$/; // Allows any number of digits
    return phoneRegex.test(phoneNumber);
  };

  return (
    <div className="whole-container">
      <div className="popup text-white rounded signup">
        <form onSubmit={handleSignupSubmit}>
          <h2>Sign Up</h2>
          <PrimaryLabel
            text={labels.username}
            inputType="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="Eg chioma12"
          />
          <PrimaryLabel
            text={labels.phonenumber}
            inputType="number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            placeholder="Eg 09022345715"
          />
          <PrimaryLabel
            text={labels.service}
            inputType="number"
            value={service}
            onChange={handleServiceChange}
            placeholder="Eg 09022345715"
          />
          <PrimaryLabel
            text={labels.password}
            inputType="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Eg 22224e"
          />
          {success && <p className="success-message">{success}</p>}
          {error && <p className="error-message" >{error}</p>}
          {isValidNumber ? (
            <Button text={buttons.signup} onClick={handleSignupSubmit} />
          ) : null}
          <Link to="/">Already have an account?</Link>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
