import React from 'react';
import { FaMapMarkerAlt } from '../../../assets/IconImports';
import PrimaryLabel from '../../../components/Primary Label/Primary Label';
import { buttons, labels } from '../../../assets/data';
import Button from '../../../components/Button/Button';
import Footer from '../../../components/Footer/Footer';
import Navbar from '../../../components/Navbar/Navbar';



const NewStudents: React.FC = () => {

    return (
        <div className="whole-container">
            <Navbar />
            <div className="popup text-white rounded new-students">
                <form>
                    <PrimaryLabel text={labels.name} inputType='text'/>
                    <PrimaryLabel text={labels.bofstudy} inputType='text'/>
                    <div>
                        Pin Location
                        <FaMapMarkerAlt className="icon-locate" />
                    </div>
                    <Button text={buttons.add}/>
                </form>
            </div >
            <Footer />
        </div>
    )
}

export default NewStudents;
