import React from 'react';
import { labels, buttons } from '../../assets/data';
import  PrimaryLabel from '../../components/Primary Label/Primary Label';
import  Button from '../../components/Button/Button';
import RememberMe from '../../components/Remember Me/Remember Me';


const LogIn: React.FC = () => {
  
  return (
    <>
    <div className="popup text-white rounded login">
      <form>
        <h2>Log In</h2>
        <PrimaryLabel text={labels.userorphone} inputType='text'/>
        <PrimaryLabel text={labels.password} inputType='text'/>
        <RememberMe />
        <Button text={buttons.login}/>
      </form>
    </div>
    </>
  )
}

export default LogIn;



