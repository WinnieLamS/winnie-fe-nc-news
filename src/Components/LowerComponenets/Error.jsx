import React from 'react';

export const Error = ({ error }) => {
  return (
    <div className="error_container">
      <p>Oops! Something went wrong:</p>
      <p>{error.message}</p>
    </div>
  );
};


