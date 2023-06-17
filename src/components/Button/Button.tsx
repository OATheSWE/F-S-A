import React from 'react';

interface ButtonProps {
  text: string;
}

const Button: React.FC<ButtonProps> = ({ text }) => {
  return (
    <button type="submit" className="rounded">{ text }</button>
  );
};

export default Button;
