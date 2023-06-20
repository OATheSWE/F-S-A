import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: (event: React.FormEvent) => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
  return (
    <button type="submit" className="rounded" onClick={onClick}>{ text }</button>
  );
};

export default Button;
