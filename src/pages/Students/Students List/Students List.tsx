import React from 'react';
import { FaMapMarkerAlt, MdDelete, MdModeEditOutline } from '../../../assets/IconImports';

const StudentsList: React.FC = () => {

    return (

        <div className="list-container">
            <div className="popup text-white rounded students-list">
                <form>
                    <h3>John Doe</h3>
                    <p>Enjoy life forever lesson 1, point 3</p>
                    <div>
                        Trace Location
                        <FaMapMarkerAlt className="icon-locate" />
                    </div>
                    <MdDelete className="icon-delete" />
                    <MdModeEditOutline className="icon-edit" />
                </form>
            </div>
            <div className="popup text-white rounded students-list">
                <form>
                    <h3>John Doe</h3>
                    <p>Enjoy life forever lesson 1, point 3</p>
                    <div>
                        Trace Location
                        <FaMapMarkerAlt className="icon-locate" />
                    </div>
                    <MdDelete className="icon-delete" />
                    <MdModeEditOutline className="icon-edit" />
                </form>
            </div>
            <div className="popup text-white rounded students-list">
                <form>
                    <h3>John Doe</h3>
                    <p>Enjoy life forever lesson 1, point 3</p>
                    <div>
                        Trace Location
                        <FaMapMarkerAlt className="icon-locate" />
                    </div>
                    <MdDelete className="icon-delete" />
                    <MdModeEditOutline className="icon-edit" />
                </form>
            </div>
        </div>
    )
}

export default StudentsList;
