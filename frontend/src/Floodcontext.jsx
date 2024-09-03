import React, { createContext, useState, useEffect } from 'react';

const FloodSeverityContext = createContext();

const FloodSeverityProvider = ({ children }) => {
  const [floodSeverity, setFloodSeverity] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFloodSeverity = async() => {
      try {
        const response =  await fetch('http://127.0.0.1:5000/Newyork');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data =
         await response.json();
        setFloodSeverity(data.Flood_Severity);
        setError(null); // Clear error if fetch is successful
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch flood severity data. Please try again later.');
      }
    };

    fetchFloodSeverity(); 

    const intervalId = setInterval(fetchFloodSeverity, 60000); // Poll every 60 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  return (
    <FloodSeverityContext.Provider value={{ floodSeverity, error }}>
      {children}
    </FloodSeverityContext.Provider>
  );
};

export { FloodSeverityContext, FloodSeverityProvider };

