import React from 'react';

interface LabelProps {
  text: string;
  inputType?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const PrimaryLabel: React.FC<LabelProps> = ({ text, inputType, onChange, value }) => {
  return (
    <label>
      {text}
      {inputType && <input type={inputType} className="rounded" value={value} onChange={onChange} />}
    </label>
  );
}; 





export default PrimaryLabel;
