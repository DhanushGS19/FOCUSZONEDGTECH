import React, { createContext, useState, useEffect, useContext } from 'react';

export const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [xp, setXp] = useState(() => {
    return parseInt(localStorage.getItem('studyZoneXP')) || 0;
  });

  useEffect(() => {
    localStorage.setItem('studyZoneXP', xp.toString());
  }, [xp]);

  const addXp = (amount) => {
    setXp(prev => prev + amount);
  };

  const level = Math.floor(xp / 100) + 1;
  const xpForNextLevel = level * 100;
  const currentLevelXp = xp % 100;

  return (
    <UserContext.Provider value={{ xp, addXp, level, currentLevelXp, xpForNextLevel }}>
      {children}
    </UserContext.Provider>
  );
};
