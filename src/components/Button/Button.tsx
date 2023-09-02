import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: (event: React.FormEvent) => void;
  type?: string;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ text, onClick, disabled }) => {
  return (
    <button type="submit" className="rounded" onClick={onClick} disabled={disabled}>{ text }</button>
  );
};

export default Button;
