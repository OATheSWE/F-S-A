import React from 'react';

interface LabelProps {
  text: string;
  inputType?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  name?: string;
  autoComplete?: string;
}

const PrimaryLabel: React.FC<LabelProps> = ({ text, inputType, onChange, value, placeholder, readOnly, required, name, autoComplete }) => {
  return (
    <label>
      {text}
      {inputType && <input type={inputType} className="rounded" value={value}  onChange={onChange} placeholder={placeholder} readOnly={readOnly} required={required} name={name} autoComplete={autoComplete} />}
    </label>
  );
}; 





export default PrimaryLabel;
