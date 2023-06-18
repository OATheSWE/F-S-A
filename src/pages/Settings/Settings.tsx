import React from 'react';
import Avatar from '../../assets/avatar.png'
import Footer from '../../components/Footer/Footer';
import PrimaryLabel from '../../components/Primary Label/Primary Label';
import { buttons, labels } from '../../assets/data';
import Button from '../../components/Button/Button';


const Settings: React.FC = () => {

  return (
    <div className="whole-container">
      <div className="popup text-white rounded settings">
        <form>
          <h2>Settings</h2>
          <label className="flex-row justify-content-between mb-4">
            Profile Picture
            <a className="navbar-brand" href="#">
              <img src={Avatar} alt="Avatar Logo" className="rounded-pill" />
            </a>
          </label>
          <PrimaryLabel text={labels.username} inputType='text' />
          <PrimaryLabel text={labels.phonenumber} inputType='number' />
          <PrimaryLabel text={labels.service} inputType='number' />
          <PrimaryLabel text={labels.password} inputType='text' />
          <Button text={buttons.save} />
        </form>
      </div >
      <Footer />
    </div>
  )
}

export default Settings;



