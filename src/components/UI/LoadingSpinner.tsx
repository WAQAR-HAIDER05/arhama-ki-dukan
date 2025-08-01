import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Loading spinner component optimized for Pakistani users
 * Minimal data usage and fast rendering
 */
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${sizeClasses[size]} border-2 border-gray-300 border-t-black rounded-full animate-spin`}></div>
    </div>
  );
};

export default LoadingSpinner;