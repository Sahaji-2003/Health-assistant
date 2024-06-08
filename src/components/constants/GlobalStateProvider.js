// import React, { useState, useContext } from 'react';

// // Create a context for your global state
// const GlobalStateContext = React.createContext();

// // Create a provider component to wrap your app
// export const GlobalStateProvider = ({ children }) => {
//   const [globalState, setGlobalState] = useState(null);

//   // Define functions to set and retrieve global state
//   const setGlobal = (data) => {
//     setGlobalState(data);
//   };

//   const getGlobal = () => {
//     return globalState;
//   };

//   return (
//     <GlobalStateContext.Provider value={{ setGlobal, getGlobal }}>
//       {children}
//     </GlobalStateContext.Provider>
//   );
// };

// // Custom hook to easily access the global state functions
// export const useGlobalState = () => {
//   const context = useContext(GlobalStateContext);
//   if (!context) {
//     throw new Error('useGlobalState must be used within a GlobalStateProvider');
//   }
//   return context;
// };

import React, { useState, useContext, useEffect } from 'react';

// Create a context for your global state
const GlobalStateContext = React.createContext();

// Create a provider component to wrap your app
export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState(() => {
    // Initialize the state from localStorage, if available
    const savedState = localStorage.getItem('globalState');
    return savedState ? JSON.parse(savedState) : null;
  });

  // Persist the state to localStorage whenever it changes
  useEffect(() => {
    if (globalState !== null) {
      localStorage.setItem('globalState', JSON.stringify(globalState));
    } else {
      localStorage.removeItem('globalState');
    }
  }, [globalState]);

  // Define functions to set and retrieve global state
  const setGlobal = (data) => {
    setGlobalState(data);
  };

  const getGlobal = () => {
    return globalState;
  };

  return (
    <GlobalStateContext.Provider value={{ setGlobal, getGlobal }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Custom hook to easily access the global state functions
export const useGlobalState = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};