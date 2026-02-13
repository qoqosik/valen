import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'yes' | 'no';
  customScale?: number;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'yes', 
  customScale = 1,
  style,
  className = '',
  ...props 
}) => {
  const baseStyles = "px-8 py-3 rounded-full font-bold text-white shadow-md transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-opacity-50";
  
  const variantStyles = variant === 'yes'
    ? "bg-pastel-strongPink hover:bg-red-400 focus:ring-red-300"
    : "bg-gray-400 hover:bg-gray-500 focus:ring-gray-300";

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${className}`}
      style={{
        transform: `scale(${customScale})`,
        ...style
      }}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;