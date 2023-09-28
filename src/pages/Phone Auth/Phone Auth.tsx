import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { labels, buttons } from "../../Data/data";
import { PrimaryLabel, Button, Footer, Toast } from "../../components";
import { auth } from "../../firebase-config";
import { signInWithPhoneNumber, ConfirmationResult, RecaptchaVerifier } from "firebase/auth"; // Import Firebase Auth functions for phone authentication
import CryptoJS from 'crypto-js'


const PhoneAuth: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string>("");
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(120);
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null); // Store the ConfirmationResult
  const [recaptchaVerifier, setRecaptchaVerifier] = useState<RecaptchaVerifier | null>(null);
  const secretKey = import.meta.env.VITE_APP_SECRET_KEY;
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
    const signUpStatus = localStorage.getItem('Signed Up');
    if (!signUpStatus) {
      return navigate("/signup");
    }
  }, [])

  const handleOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value);
  };

  const handleRequestOtp = async (e: any) => {
    e.preventDefault();

    // Retrieve phone number from local storage
    const userPhoneNumber = localStorage.getItem('Phone Number');
    let phoneNumber;
    if (userPhoneNumber) {
      // Decrypt the phone number using the secret key
      const decryptedBytes = CryptoJS.AES.decrypt(userPhoneNumber, secretKey);
      phoneNumber = decryptedBytes.toString(CryptoJS.enc.Utf8);

      try {
        // Create and set up the reCAPTCHA verifier
        const recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          size: 'invisible', // or 'normal' for invisible reCAPTCHA
          callback: (response: any) => {
            // reCAPTCHA verification success callback
          },
          'expired-callback': () => {
            // reCAPTCHA verification expiration callback
          },
        }, auth);
        setRecaptchaVerifier(recaptchaVerifier);

        // Request OTP using the decrypted phone number
        const result: ConfirmationResult = await signInWithPhoneNumber(auth, `+234${phoneNumber}`, recaptchaVerifier);
        setConfirmationResult(result); // Store the ConfirmationResult

        // Disable the button and start the countdown timer
        setIsButtonDisabled(true);
        let timer = countdown;
        const intervalId = setInterval(() => {
          if (timer > 0) {
            setCountdown(timer--);
          } else {
            setIsButtonDisabled(false);
            clearInterval(intervalId);
          }
        }, 1000);
      } catch (error) {
        console.error("Error requesting OTP:", error);
        displayToast();
        addAlert("Error requesting OTP");
      }
    } else {
      console.error("Phone number not found in local storage");
    }
  };



  useEffect(() => {
    // Add OTP verification logic here when the `otp` state changes
    if (otp.length === 6 && confirmationResult) { // Check if confirmationResult is not null
      verifyOtp();
    }
  }, [otp, confirmationResult]);

  const verifyOtp = () => {
    // Add OTP verification logic here
    confirmationResult?.confirm(otp)
      .then(() => {
        // Remove Users Phone Number from local storage
        localStorage.removeItem('Phone Number');
        displayToast();
        addAlert("Verification Successfull!");
        // OTP verification successful, navigate to the login page
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        displayToast();
        // Alert the user that the OTP was incorrect
        addAlert("Incorrect OTP. Please try again.");
      });
  };








  return (
    <div className="whole-container">
      <div className="popup text-white rounded login">
        <form>
          <h2>Verify Phone Number</h2>
          <PrimaryLabel
            text={labels.otp}
            inputType="number"
            placeholder="Input Your OTP"
            value={otp}
            onChange={handleOtpChange}
          />
          <div id="recaptcha-container"></div>
          <div className={isButtonDisabled ? "disabled" : ""}>
            <Button
              text={isButtonDisabled ? `Retry in ${countdown} seconds` : buttons.request}
              onClick={isButtonDisabled ? undefined : handleRequestOtp}
              disabled={isButtonDisabled}
            />
          </div>

        </form>
        {/* Render alert messages */}
        {alerts.map((alert) => (
          <Toast
            show={true}
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

export default PhoneAuth;
