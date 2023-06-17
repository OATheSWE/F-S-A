import React from 'react';

const SignUp: React.FC = () => {
  
  return (
    <div className="popup text-white rounded signup">
      <form>
        <h2>Sign Up</h2>
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
        <div>
          Remember Me
          <input type="checkbox" className="rounded " />
        </div>
        <button type="submit" className="rounded">Sign Up</button>
      </form>
    </div >
  )
}

export default SignUp;



