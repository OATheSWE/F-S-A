import React from 'react';
import { labels, buttons, times, students } from '../../../assets/data';
import PrimaryLabel from '../../../components/Primary Label/Primary Label';
import SecondaryLabel from '../../../components/Secondary Label/Secondary Label';
import Button from '../../../components/Button/Button';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';


const PopupRecorder: React.FC = () => {


  return (
    <div className="whole-container">
      <Navbar />
      <div className="popup text-white rounded">
        <form>
          <h2>Activity Form</h2>
          <SecondaryLabel text={labels.starth} array={times} />
          <SecondaryLabel text={labels.stoph} array={times} />
          <PrimaryLabel text={labels.video} inputType='number' />
          <PrimaryLabel text={labels.placement} inputType='number' />
          <SecondaryLabel text={labels.selecteds} array={students} />
          <Button text={buttons.save} />
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default PopupRecorder;


