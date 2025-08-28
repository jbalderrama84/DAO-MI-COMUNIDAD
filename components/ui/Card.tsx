
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-xl shadow-md p-6 ${className}`}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`border-b border-gray-200 pb-4 mb-4 ${className}`}>
            {children}
        </div>
    );
};


export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <h3 className={`text-lg font-bold text-text-primary ${className}`}>
            {children}
        </h3>
    );
};

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => {
    return (
        <div className={`text-sm text-text-secondary ${className}`}>
            {children}
        </div>
    );
};


export default Card;
