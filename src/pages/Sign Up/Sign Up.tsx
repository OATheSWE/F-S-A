import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PrimaryLabel from '../../components/Primary Label/Primary Label';
import { buttons, labels } from '../../assets/data';
import RememberMe from '../../components/Remember Me/Remember Me';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';



const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [service, setService] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isValidNumber, setIsValidNumber] = useState(false);

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

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Store user data in local storage
    localStorage.setItem('Username', username);
    localStorage.setItem('PhoneNumber', phoneNumber);
    localStorage.setItem('Phone Number of Service Overseer', service);
    localStorage.setItem('Password', password);

    if (rememberMe) {
      localStorage.setItem('RememberMe', 'true');
    } else {
      localStorage.removeItem('RememberMe');
    }

    // Navigate to the main page
    navigate('/calender', { replace: true });
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    // Regular expression for validating phone number
    const phoneRegex = /^[0-9]+$/; // Allows any number of digits
    return phoneRegex.test(phoneNumber);
  };

  return (
    <div className="whole-container">
      <div className="popup text-white rounded signup">
        <form onSubmit={handleSubmit}>
          <h2>Sign Up</h2>
          <PrimaryLabel
            text={labels.username}
            inputType="text"
            value={username}
            onChange={handleUsernameChange}
          />
          <PrimaryLabel
            text={labels.phonenumber}
            inputType="number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          <PrimaryLabel
            text={labels.service}
            inputType="number"
            value={service}
            onChange={handleServiceChange}
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
          {isValidNumber ? (
            <Button
              text={buttons.signup}
              onClick={handleSubmit}
            />
          ) : null}
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
