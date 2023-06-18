import React from 'react';
import { AiOutlinePlus } from '../../assets/IconImports';
import StudentsList from './Students List/Students List';
import Footer from '../../components/Footer/Footer';


const Students: React.FC = () => {

    return (
        <div className="whole-container">
            <div className="popup text-white rounded students">
                <form>
                    <h2>Students</h2>
                    <label>
                        <input type="text" className="rounded" placeholder='Student Name' />
                        <button type="submit" className="rounded"><AiOutlinePlus className="plus-icon" /></button>
                    </label>
                </form>
            </div >
            <StudentsList />
            <Footer />
        </div>
    )
}

export default Students;
