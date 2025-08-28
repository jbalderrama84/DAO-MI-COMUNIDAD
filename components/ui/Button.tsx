
import React from 'react';
import Icon from '../icons';

type IconName = React.ComponentProps<typeof Icon>['name'];

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  leftIcon?: IconName;
  rightIcon?: IconName;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  leftIcon, 
  rightIcon, 
  className = '', 
  ...props 
}) => {
  const baseClasses = "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-green-500 focus:ring-secondary',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ghost: 'bg-transparent text-text-secondary hover:bg-gray-100 focus:ring-gray-400'
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {leftIcon && <Icon name={leftIcon} className="mr-2 h-4 w-4" />}
      {children}
      {rightIcon && <Icon name={rightIcon} className="ml-2 h-4 w-4" />}
    </button>
  );
};

export default Button;
