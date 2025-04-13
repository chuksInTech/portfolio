import React from 'react';
import Spinner from './Spinner';

const Button = ({ children, onClick, isLoading, className, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isLoading}
      className={`relative ${className} ${isLoading ? 'cursor-not-allowed opacity-80' : ''}`}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <Spinner size="sm" />
        </div>
      ) : null}
      <span className={isLoading ? 'opacity-0' : ''}>{children}</span>
    </button>
  );
};

export default Button;