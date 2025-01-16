import React from 'react';

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export const CardContent: React.FC<CardContentProps> = ({ children, className }) => {
  return (
    <div className={`p-12 ${className}`}>
      {children}
    </div>
  );
};