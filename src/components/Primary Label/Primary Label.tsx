import React from 'react';

interface LabelProps {
  text: string;
  inputType?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  readOnly?: boolean;
}

const PrimaryLabel: React.FC<LabelProps> = ({ text, inputType, onChange, value, placeholder, readOnly }) => {
  return (
    <label>
      {text}
      {inputType && <input type={inputType} className="rounded" value={value}  onChange={onChange} placeholder={placeholder} readOnly={readOnly} />}
    </label>
  );
}; 





export default PrimaryLabel;
