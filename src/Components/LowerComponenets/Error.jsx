import { useContext } from 'react';
import { ErrorContext } from '../../contexts/ErrorContext';


export const Error = () => {
  const { error } = useContext(ErrorContext);

  return (
    <div className="error_container">
      <h2>Oops! Something went wrong:</h2>
      <h1>{error ? error.message : "An unexpected error occurred"}</h1>
    </div>
  );
};


