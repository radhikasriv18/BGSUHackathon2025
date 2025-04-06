import { createContext, useContext, useState, ReactNode } from 'react';

const UserContext = createContext({
  user: { name: '' },
  setUser: (user: { name: string }) => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState({ name: '' });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
