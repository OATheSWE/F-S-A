import React from 'react';
import PrimaryLabel from '../../components/Primary Label/Primary Label';
import { buttons, labels } from '../../assets/data';
import RememberMe from '../../components/Remember Me/Remember Me';
import Button from '../../components/Button/Button';
import Footer from '../../components/Footer/Footer';

const SignUp: React.FC = () => {

  return (
    <div className="whole-container">
      <div className="popup text-white rounded signup">
        <form>
          <h2>Sign Up</h2>
          <PrimaryLabel text={labels.username} inputType='text' />
          <PrimaryLabel text={labels.phonenumber} inputType='number' />
          <PrimaryLabel text={labels.service} inputType='number' />
          <PrimaryLabel text={labels.password} inputType='text' />
          <RememberMe />
          <Button text={buttons.signup}/>
        </form>
      </div >
      <Footer />
    </div>
  )
}

export default SignUp;



