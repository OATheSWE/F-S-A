import React from 'react';

const SubmitReport: React.FC = () => {
  
  return (
    <div className="popup text-white rounded submit-report">
      <form>
        <h2>Submit Report</h2>
        <label>
          Total Hours:
          <input type="text" className="rounded" />
        </label>
        <label>
          Total Videos:
          <input type="text" className="rounded" />
        </label>
        <label>
          Total Placements:
          <input type="text" className="rounded" />
        </label>
        <label>
          Total Return Visits:
          <input type="text" className="rounded" />
        </label>
        <label>
          Total Bible Studies Conducted:
          <input type="text" className="rounded" />
        </label>
        <button type="submit" className="rounded">Submit</button>
      </form>
    </div >
  )
}

export default SubmitReport;



