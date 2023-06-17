import React from 'react';

interface LabelProps {
  text: string;
  inputType?: string;
}

const PrimaryLabel: React.FC<LabelProps> = ({ text, inputType }) => {
  return (
    <label>
      {text}
      {inputType && <input type={inputType} className="rounded" />}
    </label>
  );
}; 





export default PrimaryLabel;
