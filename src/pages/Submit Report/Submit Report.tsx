import React from 'react';
import PrimaryLabel from '../../components/Primary Label/Primary Label';
import { buttons, labels } from '../../assets/data';
import Button from '../../components/Button/Button';

const SubmitReport: React.FC = () => {

  return (
    <div className="whole-container">
      <div className="popup text-white rounded submit-report">
        <form>
          <h2>Submit Report</h2>
          <PrimaryLabel text={labels.thours} inputType='number' />
          <PrimaryLabel text={labels.tvideos} inputType='number' />
          <PrimaryLabel text={labels.tplacements} inputType='number' />
          <PrimaryLabel text={labels.treturnv} inputType='number' />
          <PrimaryLabel text={labels.tbstudy} inputType='number' />
          <Button text={buttons.submit} />
        </form>
      </div >
    </div>
  )
}

export default SubmitReport;



