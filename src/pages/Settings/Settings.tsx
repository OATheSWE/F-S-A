import React from 'react';
import Avatar from '../../assets/avatar.png'

const Settings: React.FC = () => {

  return (
    <div className="popup text-white rounded settings">
      <form>
        <h2>Settings</h2>
        <label className="flex-row justify-content-between mb-4">
          Profile Picture
          <a className="navbar-brand" href="#">
            <img src={Avatar} alt="Avatar Logo" className="rounded-pill" />
          </a>
        </label>
        <label>
          Username:
          <input type="text" className="rounded" />
        </label>
        <label>
          Phone Number (Whatsapp):
          <input type="text" className="rounded" />
        </label>
        <label>
          Whatsapp Number of Service Overseer:
          <input type="text" className="rounded" />
        </label>
        <label>
          Password:
          <input type="text" className="rounded" />
        </label>
        <button type="submit" className="rounded">Save</button>
      </form>
    </div >
  )
}

export default Settings;



