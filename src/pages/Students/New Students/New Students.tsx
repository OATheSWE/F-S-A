import React from 'react';
import { FaMapMarkerAlt } from '../../../assets/IconImports';


const NewStudents: React.FC = () => {

    return (
        <div className="popup text-white rounded new-students">
            <form>
                <label>
                    Name:
                    <input type="text" className="rounded" />
                </label>
                <label>
                    Book Of Study:
                    <input type="text" className="rounded" />
                </label>
                <div>
                   Pin Location
                   <FaMapMarkerAlt className="icon-locate"/>
                </div>
                <button type="submit" className="rounded">Add</button>
            </form>
        </div >
    )
}

export default NewStudents;
